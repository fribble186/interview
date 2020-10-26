import datetime

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import exceptions, status
from rest_framework.authentication import BaseAuthentication
from django.db.models import Q
from interview import models, serializers, WXBizDataCrypt
import time
import hashlib
import requests
import json
import re


class MyAuthentication(BaseAuthentication):
    def authenticate(self, request):
        user_type = request.META.get("HTTP_USERTYPE")
        token = request.META.get("HTTP_AUTH")
        print('TYPE IS {}, TOKEN IS {}'.format(user_type, token))
        token = token[6:]

        if user_type == 'enterprise':
            token_obj = models.EnterpriseToken.objects.filter(token=token).first()
        elif user_type == 'college':
            token_obj = models.CollegeToken.objects.filter(token=token).first()
        else:
            token_obj = models.Token.objects.filter(token=token).first()
        if not token_obj:
            raise exceptions.AuthenticationFailed('用户认证失败')
        return token_obj.user, token_obj


def make_token(user):
    current_time = str(time.time())
    hash_code = hashlib.md5(user.encode("utf-8"))
    hash_code.update(current_time.encode("utf-8"))
    return hash_code.hexdigest()


class MiddleRegister(APIView):
    """
    企业用户注册
    学校用户注册
    """
    @staticmethod
    def post(request):
        print(request, request.POST)
        manager_type = request.data.get('manager_type')
        name = request.data.get('name')
        phone = request.data.get('phone')
        province = request.data.get('province')
        city = request.data.get('city')
        address = request.data.get('address')
        scale = request.data.get('scale') or ''
        avatarUrl = request.data.get('avatarUrl') or ''
        desc = request.data.get('desc')
        email = request.data.get('email')
        password = request.data.get('password')
        if manager_type == 'enterprise':
            user_obj = models.EnterpriseManager.objects.filter(email=email).first()
            if not user_obj:
                user_obj = models.EnterpriseManager(
                    name=name,
                    phone=phone,
                    province=province,
                    city=city,
                    address=address,
                    avatarUrl=avatarUrl,
                    scale=scale,
                    desc=desc,
                    email=email,
                    password=password
                )
                user_obj.save()
                response = {"result": "success",}
                print("enterprise register name {}, email {}".format(name, email))
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response({'result': 'wrong email'}, status=status.HTTP_403_FORBIDDEN)
        elif manager_type == 'college':
            user_obj = models.CollegeManager.objects.filter(email=email).first()
            if not user_obj:
                user_obj = models.CollegeManager(
                    name=name,
                    phone=phone,
                    province=province,
                    city=city,
                    address=address,
                    avatarUrl=avatarUrl,
                    desc=desc,
                    email=email,
                    password=password
                )
                user_obj.save()
                response = {"result": "success", }
                print("college register name {}, email {}".format(name, email))
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response({'result': 'wrong email'}, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({'result': 'wrong type'}, status=status.HTTP_403_FORBIDDEN)


def login(user_id, login_origin, password):
    print(user_id, login_origin, password)
    if login_origin == 'wx':
        user_obj = models.User.objects.filter(wx_openid=user_id).first()
    elif login_origin == 'dy':
        user_obj = models.User.objects.filter(dy_openid=user_id).first()
    elif login_origin == 'school':
        user_obj = models.User.objects.filter(study_code=user_id, password=password).first()
    return user_obj


def register(app_id, session_key, encryptedData, iv, login_origin):
    if login_origin == 'wx':
        pc = WXBizDataCrypt.WXBizDataCrypt(app_id, session_key)
        user_info = pc.decrypt(encryptedData, iv)
        print(user_info)
        user_obj = models.User(wx_nickName='未知' if user_info['nickName'] == '' else user_info['nickName'],
                               wx_openid=user_info['openId'],
                               wx_avatarUrl='未知' if user_info['avatarUrl'] == '' else user_info['avatarUrl'],
                               wx_gender='未知' if user_info['gender'] == '' else user_info['gender'],
                               wx_country='未知' if user_info['country'] == '' else user_info['country'],
                               wx_province='未知' if user_info['province'] == '' else user_info['province'],
                               wx_city='未知' if user_info['city'] == '' else user_info['city'],
                               )
        user_obj.save()
        user_obj = models.User.objects.filter(wx_openid=user_info['openId']).first()
    elif login_origin == 'dy':
        pc = WXBizDataCrypt.TTBizDataCrypt(session_key)
        user_info = pc.decrypt(encryptedData, iv)
        print(user_info)
        user_obj = models.User(dy_nickName='未知' if user_info['nickName'] == '' else user_info['nickName'],
                               dy_openid=user_info['openId'],
                               dy_avatarUrl='未知' if user_info['avatarUrl'] == '' else user_info['avatarUrl'],
                               dy_gender='未知' if user_info['gender'] == '' else user_info['gender'],
                               dy_country='未知' if user_info['country'] == '' else user_info['country'],
                               dy_province='未知' if user_info['province'] == '' else user_info['province'],
                               dy_city='未知' if user_info['city'] == '' else user_info['city'],
                               )
        user_obj.save()
        user_obj = models.User.objects.filter(dy_openid=user_info['openId']).first()
    return user_obj


class AuthView(APIView):
    @staticmethod
    def post(request):
        # 获取数据
        auth_code = request.data.get('auth_code') or False
        encryptedData = request.data.get('encryptedData') or False
        iv = request.data.get('iv') or False

        study_code = request.data.get('study_code') or False
        password = request.data.get('password') or False

        login_origin = request.data.get('login_origin')
        if login_origin == "wx":
            app_id = "wx1d2becb19278a570"
            secret = ""
            # 通过code2session接口获取code
            code2session_url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + app_id + "&secret=" + secret +"&js_code="+ auth_code + "&grant_type=authorization_code"
            code2session_request = requests.get(code2session_url)
            session_key = code2session_request.json()['session_key']
            openid = code2session_request.json()['openid']

            # 登录或注册逻辑
            user_obj = login(openid, login_origin, False)
            if not user_obj:
                user_obj = register(app_id, session_key, encryptedData, iv, login_origin)
            if user_obj:
                token = make_token(openid)
                models.Token.objects.update_or_create(user=user_obj, defaults={"token": token})
                response = {
                    "token": token,
                    "openId": openid,
                    "name": user_obj.wx_nickName,
                    "avatar": user_obj.wx_avatarUrl,
                    "type": "wx",
                    "isBinding": True if user_obj.study_code else False
                }
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)

        elif login_origin == "dy":
            app_id = "ttda09acb445330e00"
            secret = ""
            # 通过code2session接口获取code
            code2session_url = "https://developer.toutiao.com/api/apps/jscode2session?appid=" + app_id + "&secret=" + secret +"&code="+ auth_code
            code2session_request = requests.get(code2session_url)
            session_key = code2session_request.json()['session_key']
            openid = code2session_request.json()['openid']

            # 登录或注册逻辑
            user_obj = login(openid, login_origin, False)
            if not user_obj:
                user_obj = register(app_id, session_key, encryptedData, iv, login_origin)
            if user_obj:
                token = make_token(openid)
                models.Token.objects.update_or_create(user=user_obj, defaults={"token": token})
                response = {
                    "token": token,
                    "openId": openid,
                    "name": user_obj.dy_nickName,
                    "avatar": user_obj.dy_avatarUrl,
                    "type": "dy",
                    "isBinding": True if user_obj.study_code else False
                }
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)

        elif login_origin == "school":
            user_obj = login(study_code, login_origin, password)
            if user_obj:
                token = make_token(study_code)
                models.Token.objects.update_or_create(user=user_obj, defaults={"token": token})
                response = {
                    "token": token,
                    "study_code": user_obj.study_code,
                    "name": user_obj.name,
                    "type": "school",
                    "isBinding": True if user_obj.wx_openid else False
                }
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)


class MiddleLogin(APIView):
    """
    企业用户登录
    学校用户登录
    """
    @staticmethod
    def post(request):
        manager_type = request.data.get('manager_type')
        email = request.data.get('email')
        password = request.data.get('password')
        if manager_type == "enterprise":
            user_obj = models.EnterpriseManager.objects.filter(email=email, password=password).first()
            if user_obj:
                token = make_token(email)
                models.EnterpriseToken.objects.update_or_create(user=user_obj, defaults={"token": token})
            else:
                return Response({'result': 'wrong login'}, status=status.HTTP_403_FORBIDDEN)
        elif manager_type == "college":
            user_obj = models.CollegeManager.objects.filter(email=email, password=password).first()
            if user_obj:
                token = make_token(email)
                models.CollegeToken.objects.update_or_create(user=user_obj, defaults={"token": token})
            else:
                return Response({'result': 'wrong login'}, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({'result': 'wrong type'}, status=status.HTTP_403_FORBIDDEN)
        print(token)
        response = {
            "type": manager_type,
            "token": token,
            "email": email,
        }
        print("{} login email {},token: {}".format(manager_type, email, token))
        return Response(response, status=status.HTTP_200_OK)


class Tests(APIView):
    authentication_classes = [MyAuthentication, ]

    @staticmethod
    def post(request):
        """
        企业发布试题
        """
        name = request.data.get('name')
        jobDescribe = request.data.get('jobDescribe')
        desc = request.data.get('desc')
        bonus = request.data.get('bonus')
        problems = request.data.get('problems')
        test_obj = models.Tests.objects.filter(enterprise=request.user, name=name)
        if test_obj:
            return Response({'result': 'wrong name'}, status.HTTP_403_FORBIDDEN)
        else:
            test_obj = models.Tests(
                name=name,
                enterprise=request.user,
                jobDescribe=jobDescribe,
                desc=desc,
                bonus=bonus,
                active=True
            )
            test_obj.save()
            print(test_obj)
            for problem in problems:
                problem_obj = models.Problem(
                    tests=test_obj,
                    contents=problem['contents'],
                    problemType=problem['type'],
                    score=problem['score']
                )
                problem_obj.save()
                if problem['type'] == "selection":
                    for selection in problem['selection']:
                        selection_obj = models.Selection(
                            problem=problem_obj,
                            sequence=selection['sequence'],
                            score=selection['score'],
                            contents=selection['contents']
                        )
                        selection_obj.save()
            return Response({'result': 'success'}, status.HTTP_200_OK)

    @staticmethod
    def get(request):
        """
        企业所有的试题
        平台所有的试题
        """
        email = request.GET['email'] if 'email' in request.GET else False
        t_id = request.GET['t_id'] if 't_id' in request.GET else False
        if t_id:
            tests_qs = models.Tests.objects.filter(id=t_id).first()
            tests_data = serializers.TestsSerializer(tests_qs, many=False).data
            response = {"data": tests_data}
        elif email:
            enterprise_obj = models.EnterpriseManager.objects.filter(email=email).first()
            tests_qs = models.Tests.objects.filter(enterprise=enterprise_obj).all()
            tests_data = serializers.TestsSerializer(tests_qs, many=True).data
            response = {"data": tests_data}
        else:
            tests_qs = models.Tests.objects.filter().all()
            for test in tests_qs:
                tb_obj = models.TestBox.objects.filter(test=test, user=request.user).first()
                test.isTested = True if tb_obj else False
            tests_data = serializers.TestsSerializer(tests_qs, many=True).data
            response = {"data": tests_data}
        return Response(response, status=status.HTTP_200_OK)


class TestsNoAuth(APIView):
    @staticmethod
    def get(request):
        """
        企业所有的试题
        平台所有的试题
        """
        email = request.GET['email'] if 'email' in request.GET else False
        t_id = request.GET['t_id'] if 't_id' in request.GET else False
        if t_id:
            tests_qs = models.Tests.objects.filter(id=t_id).first()
            tests_data = serializers.TestsSerializer(tests_qs, many=False).data
            response = {"data": tests_data}
        elif email:
            enterprise_obj = models.EnterpriseManager.objects.filter(email=email).first()
            tests_qs = models.Tests.objects.filter(enterprise=enterprise_obj).all()
            tests_data = serializers.TestsSerializer(tests_qs, many=True).data
            response = {"data": tests_data}
        else:
            tests_qs = models.Tests.objects.filter().all()
            tests_data = serializers.TestsSerializer(tests_qs, many=True).data
            response = {"data": tests_data}
        return Response(response, status=status.HTTP_200_OK)


class ProblemBox(APIView):
    authentication_classes = [MyAuthentication, ]

    @staticmethod
    def post(request):
        """
        用户做试题
        企业批改试题
        """
        t_id = request.data.get('t_id') or False
        answers = request.data.get('answers') or False
        duration = request.data.get('duration') or False
        quit_time = request.data.get('quit_time') or False
        scores = request.data.get('scores') or False
        if answers:
            tests_obj = models.Tests.objects.filter(id=t_id).first()
            test_box_obj = models.TestBox(
                test=tests_obj,
                user=request.user,
                duration=duration,
                quit_time=quit_time,
            )
            test_box_obj.save()
            overall_score = 0
            for answer in answers:
                print(answer)
                problem_obj = models.Problem.objects.filter(id=answer['problem_id']).first()
                if answer['type'] == "selection":
                    selection_obj = models.Selection.objects.filter(id=answer['answer_id']).first()
                    problem_box_obj = models.ProblemBox(
                        user=request.user,
                        problem=problem_obj,
                        selectionAnswer=selection_obj,
                        score=selection_obj.score,
                        testBox=test_box_obj,
                    )
                    overall_score += selection_obj.score
                    problem_box_obj.save()
                else:
                    problem_box_obj = models.ProblemBox(
                        user=request.user,
                        problem=problem_obj,
                        answer=answer['answer'],
                        testBox=test_box_obj
                    )
                    problem_box_obj.save()
            test_box_obj.score = overall_score
            test_box_obj.selectionScore = overall_score
            test_box_obj.save()
            return Response({'result': 'success'}, status.HTTP_200_OK)
        else:
            for score in scores:
                problem_box_obj = models.ProblemBox.filter(id=score.id)
                problem_box_obj.score = score.score
                problem_box_obj.save()
            return Response({'result': 'success'}, status.HTTP_200_OK)

    @staticmethod
    def get(request):
        """
        用户做过的所有卷子
        企业具体某张试题的所有卷子
        """
        tests_id = request.GET['tests_id'] if 'tests_id' in request.GET else False
        if 'tests_id' not in request.GET:
            tests_qs = models.TestBox.objects.filter(user=request.user).all()
            tests_data = serializers.TestsBoxSerializer(tests_qs, many=True).data
        else:
            tests_obj = models.Tests.objects.filter(id=tests_id).first()
            tests_qs = models.TestBox.objects.filter(test=tests_obj, isCorrect=None).all()
            test_box_data = serializers.TestsBoxSerializer(tests_qs, many=True).data
            basic_data = serializers.TestsSerializer(tests_obj, many=False).data
            tests_data = {'basic': basic_data, 'test_box_list': test_box_data}

        response = {"data": tests_data}
        return Response(response, status=status.HTTP_200_OK)


class JobFairs(APIView):
    authentication_classes = [MyAuthentication, ]

    @staticmethod
    def post(request):
        """
        学校发布招聘会
        """
        name = request.data.get('name')
        desc = request.data.get('desc')
        postImgUrl =  request.data.get('postImgUrl') or False
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        job_fairs_obj = models.JobFairs(
            college=request.user,
            desc=desc,
            name=name,
            start_date=start_date,
            end_date=end_date,
        )
        job_fairs_obj.save()
        return Response({'result': 'success'}, status.HTTP_200_OK)

    @staticmethod
    def get(request):
        """
        学校所有的招聘会列表
        平台所有的招聘会列表
        """
        email = request.GET['email'] if 'email' in request.GET else False
        user_type = request.META.get("HTTP_USERTYPE")
        print(user_type)
        if email:
            college_obj = models.CollegeManager.objects.filter(email=email).first()
            job_fairs_qs = models.JobFairs.objects.filter(college=college_obj).all()
        else:
            if user_type == 'enterprise':
                job_fairs_qs = models.JobFairs.objects.filter().all()
                for job_fair in job_fairs_qs:
                    eij_obj = models.EnterpriseInJobFairs.objects.filter(job_fairs=job_fair, enterprise=request.user).first()
                    job_fair.isAttend = True if eij_obj else False
            else:
                job_fairs_qs = models.JobFairs.objects.filter().all()
        job_fairs_data = serializers.JobFairsSerializer(job_fairs_qs, many=True).data
        response = {"data": job_fairs_data}
        return Response(response, status=status.HTTP_200_OK)


class TestBox(APIView):
    authentication_classes = [MyAuthentication, ]

    @staticmethod
    def post(request):
        """
        企业批改试卷
        """
        tb_id = request.data.get('tb_id')
        bonus = request.data.get('bonus')
        desc = request.data.get('desc')
        scores = request.data.get('scores')
        tb_obj = models.TestBox.objects.filter(id=tb_id).first()
        tb_obj.desc = desc
        tb_obj.showBonus = bonus
        all_score = tb_obj.selectionScore
        for score in scores:
            all_score += int(score['score'])
            pb_obj = models.ProblemBox.objects.filter(id=score['id']).first()
            pb_obj.score = int(score['score'])
            pb_obj.save()
        tb_obj.score = all_score
        tb_obj.isCorrect = True
        tb_obj.save()
        return Response({'result': 'success'}, status.HTTP_200_OK)

    @staticmethod
    def get(request):
        """
        学生获取试卷
        企业获取试卷
        """
        tb_id = request.GET['tb_id']
        tb_obj = models.TestBox.objects.filter(id=tb_id).first()
        pb_qs = models.ProblemBox.objects.filter(testBox=tb_obj).all()
        tb_data = serializers.TestBoxSerializer(tb_obj, many=False).data
        pb_data = serializers.ProblemBoxSerializer(pb_qs, many=True).data
        response = {"data": {"tb_data": tb_data, "pb_data": pb_data}}
        return Response(response, status=status.HTTP_200_OK)


class AttendJobFairs(APIView):
    authentication_classes = [MyAuthentication, ]

    @staticmethod
    def post(request):
        """
        企业报名参加
        """
        jf_id = request.data.get('jf_id')
        desc = request.data.get('desc') or None
        job_fairs_obj = models.JobFairs.objects.filter(id=jf_id).first()
        eij_obj = models.EnterpriseInJobFairs(
            job_fairs=job_fairs_obj,
            enterprise=request.user,
            desc=desc
        )
        eij_obj.save()
        return Response({'result': 'success'}, status.HTTP_200_OK)


class BatUploadStudent(APIView):
    authentication_classes = [MyAuthentication, ]

    @staticmethod
    def post(request):
        """
        批量上传学生用户
        """
        student_list = request.data.get('student_list')
        for student in student_list:
            student_obj = models.User.objects.filter(study_code=student['study_code'])
            if not student_obj:
                student_obj = models.User(
                    average_point=student['average_point'],
                    gender=1 if student['gender'] == '男' else 0,
                    major=student['major'],
                    name=student['name'],
                    study_code=student['study_code'],
                    password=student['study_code'],
                )
                student_obj.save()
        return Response({'result': 'success'}, status.HTTP_200_OK)


class Binding(APIView):
    authentication_classes = [MyAuthentication, ]

    @staticmethod
    def post(request):
        """
        绑定学生账号和微信账号
        """
        binding = request.data.get('binding')

        app_id = "wx1d2becb19278a570"
        secret = ""
        auth_code = request.data.get('auth_code') or False

        study_code = request.data.get('study_code') or False
        password = request.data.get('password') or False

        user_request_obj = request.user
        if binding == 'wx':
            # 通过code2session接口获取code
            code2session_url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + app_id + "&secret=" + secret + "&js_code=" + auth_code + "&grant_type=authorization_code"
            code2session_request = requests.get(code2session_url)
            openid = code2session_request.json()['openid']
            # 登录或注册逻辑
            user_obj = login(openid, 'wx', False)
            if user_obj:
                user_request_obj.wx_nickName = user_obj.wx_nickName
                user_request_obj.wx_openid = user_obj.wx_openid
                user_request_obj.wx_avatarUrl = user_obj.wx_avatarUrl
                user_request_obj.wx_gender = user_obj.wx_gender
                user_request_obj.wx_country = user_obj.wx_country
                user_request_obj.wx_province = user_obj.wx_province
                user_request_obj.wx_city = user_obj.wx_city
                user_request_obj.save()
                user_obj.delete()
                return Response({'result': 'success'}, status.HTTP_200_OK)
            else:
                response = {"error": "no account"}
                return Response(response, status=status.HTTP_200_OK)
        elif binding == 'school':
            user_obj = login(study_code, 'school', password)
            if user_obj:
                user_request_obj.average_point = user_obj.average_point
                user_request_obj.gender = user_obj.gender
                user_request_obj.major = user_obj.major
                user_request_obj.name = user_obj.name
                user_request_obj.study_code = user_obj.study_code
                user_request_obj.password = user_obj.password
                user_request_obj.save()
                user_obj.delete()
                return Response({'result': 'success'}, status.HTTP_200_OK)
            else:
                response = {"error": "no account"}
                return Response(response, status=status.HTTP_200_OK)
