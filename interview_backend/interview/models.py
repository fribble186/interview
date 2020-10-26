from django.db import models


class User(models.Model):
    """
    普通用户表
    """
    dy_nickName = models.CharField(max_length=50, null=True, blank=True)
    dy_openid = models.CharField(max_length=50, null=True, blank=True)
    dy_avatarUrl = models.CharField(max_length=200, null=True, blank=True)
    dy_gender = models.IntegerField(null=True, blank=True)
    dy_country = models.CharField(max_length=30, null=True, blank=True)
    dy_province = models.CharField(max_length=50, null=True, blank=True)
    dy_city = models.CharField(max_length=30, null=True, blank=True)

    wx_nickName = models.CharField(max_length=50, null=True, blank=True)
    wx_openid = models.CharField(max_length=50, null=True, blank=True)
    wx_avatarUrl = models.CharField(max_length=200, null=True, blank=True)
    wx_gender = models.IntegerField(null=True, blank=True)
    wx_country = models.CharField(max_length=30, null=True, blank=True)
    wx_province = models.CharField(max_length=50, null=True, blank=True)
    wx_city = models.CharField(max_length=30, null=True, blank=True)

    average_point = models.FloatField(null=True, blank=True)
    gender = models.IntegerField(null=True, blank=True)
    major = models.CharField(max_length=50, null=True, blank=True)
    name = models.CharField(max_length=50, null=True, blank=True)
    study_code = models.CharField(max_length=50, null=True, blank=True)
    password = models.CharField(max_length=50, null=True, blank=True)

    phone = models.CharField(max_length=30, null=True, blank=True)
    sign = models.CharField(max_length=100, null=True, blank=True)
    desc = models.CharField(max_length=200, null=True, blank=True)

    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.id


class EnterpriseManager(models.Model):
    """
    企业用户表
    """
    name = models.CharField(max_length=50, null=True, blank=True)  # 企业名称
    phone = models.CharField(max_length=20, null=True, blank=True)  # 企业联系电话
    province = models.CharField(max_length=10, null=True, blank=True)  # 企业所在省份
    city = models.CharField(max_length=10, null=True, blank=True)  # 企业所在城市
    address = models.CharField(max_length=200, null=True, blank=True)  # 企业所在地址
    avatarUrl = models.CharField(max_length=200, null=True, blank=True)  # 企业的头像
    scale = models.CharField(max_length=50, null=True, blank=True)  # 企业的规模
    desc = models.CharField(max_length=200, null=True, blank=True)  # 企业自己的描述
    email = models.CharField(max_length=50, null=True, blank=True)  # 企业的邮箱
    password = models.CharField(max_length=50, null=True, blank=True)  # 企业的登录密码
    active = models.BooleanField(null=True, blank=True)  # 企业是否通过验证

    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class CollegeManager(models.Model):
    """
    学校用户表
    """
    name = models.CharField(max_length=50, null=True, blank=True)  # 学校名称
    phone = models.CharField(max_length=20, null=True, blank=True)  # 学校联系电话
    province = models.CharField(max_length=10, null=True, blank=True)  # 学校所在省份
    city = models.CharField(max_length=10, null=True, blank=True)  # 学校所在城市
    address = models.CharField(max_length=200, null=True, blank=True)  # 学校所在地址
    avatarUrl = models.CharField(max_length=200, null=True, blank=True)  # 学校的头像
    desc = models.CharField(max_length=200, null=True, blank=True)  # 学校自己的描述
    email = models.CharField(max_length=50, null=True, blank=True)  # 学校的邮箱
    password = models.CharField(max_length=50, null=True, blank=True)  # 学校的登录密码
    active = models.BooleanField(null=True, blank=True)  # 学校是否通过验证

    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Token(models.Model):
    """
    学生用户登录凭证token
    """
    user = models.OneToOneField(to=User, related_name='user_token', on_delete=models.CASCADE)
    token = models.CharField(max_length=64)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.token


class EnterpriseToken(models.Model):
    """
    企业用户登录凭证token
    """
    user = models.OneToOneField(to=EnterpriseManager, related_name='enterprise_token', on_delete=models.CASCADE)
    token = models.CharField(max_length=64)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.token


class CollegeToken(models.Model):
    """
    高校用户登录凭证token
    """
    user = models.OneToOneField(to=CollegeManager, related_name='college_token', on_delete=models.CASCADE)
    token = models.CharField(max_length=64)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.token


class Tests(models.Model):
    """
    测试表，一个测试可以含多个问题
    """
    enterprise = models.ForeignKey(
        EnterpriseManager,
        related_name='tests_enterprise',
        on_delete=models.CASCADE
    )  # 发布测试的企业
    name = models.CharField(max_length=50, null=True, blank=True)  # 测试的名字
    jobDescribe = models.CharField(max_length=50, null=True, blank=True)  # 测试所针对的岗位
    desc = models.CharField(max_length=200, null=True, blank=True)  # 测试的描述
    bonus = models.CharField(max_length=200, null=True, blank=True)  # 测试过了的奖励信息
    active = models.BooleanField(null=True, blank=True)  # 软删除

    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)


class Problem(models.Model):
    """
    问题表
    """
    tests = models.ForeignKey(
        Tests,
        related_name='problem_tests',
        on_delete=models.CASCADE
    )  # 问题所在的测试集
    contents = models.CharField(max_length=200, null=True, blank=True)  # 问题的主干
    problemType = models.CharField(max_length=20, null=True, blank=True)  # 问题的类型
    score = models.IntegerField(null=True, blank=True)  # 问题的分数

    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)


class Selection(models.Model):
    """
    选项表
    """
    problem = models.ForeignKey(
        Problem,
        related_name='selection_problem',
        on_delete=models.CASCADE
    )  # 选项所在的问题
    contents = models.CharField(max_length=200, null=True, blank=True)  # 选项的主干
    sequence = models.IntegerField(null=True, blank=True)  # 选项的顺序
    score = models.IntegerField(null=True, blank=True)  # 选项的分数

    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)


class JobFairs(models.Model):
    """
    招聘市场表，大学可以发布招聘市场
    """
    college = models.ForeignKey(
        CollegeManager,
        related_name='job_fairs_college',
        on_delete=models.CASCADE
    )  # 哪个大学的招聘会
    name = models.CharField(max_length=100, null=True, blank=True)  # 招聘会的名字
    desc = models.CharField(max_length=200, null=True, blank=True)  # 招聘会的描述
    postImgUrl = models.CharField(max_length=200, null=True, blank=True)  # 招聘会的海报图片
    start_date = models.DateTimeField()  # 招聘会的开始日期
    end_date = models.DateTimeField()  # 招聘会的结束日期
    active = models.BooleanField(null=True, blank=True)  # 软删除

    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)


class EnterpriseInJobFairs(models.Model):
    """
    招聘市场中的企业
    """
    job_fairs = models.ForeignKey(
        JobFairs,
        related_name='eij_job_fairs',
        on_delete=models.CASCADE
    )  # 哪一个招聘市场
    enterprise = models.ForeignKey(
        EnterpriseManager,
        related_name='eij_enterprise',
        on_delete=models.CASCADE
    )  # 哪一个企业
    desc = models.CharField(max_length=200, null=True, blank=True)  # 企业的招聘备注

    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)


class Contact(models.Model):
    """
    学校通讯录表，大学可供企业进行联系
    """
    college = models.ForeignKey(
        CollegeManager,
        related_name='contact_college',
        on_delete=models.CASCADE
    )  # 哪一个学校
    department = models.CharField(max_length=20, null=True, blank=True)  # 通讯录显示的部门
    leader = models.CharField(max_length=20, null=True, blank=True)  # 通讯录显示的负责人
    phone = models.CharField(max_length=20, null=True, blank=True)  # 通讯录显示的电话
    desc = models.CharField(max_length=200, null=True, blank=True)  # 通讯录中的备注

    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)


class TestBox(models.Model):
    """
    测试箱表，普通用户做完的测试
    """
    test = models.ForeignKey(
        Tests,
        related_name='test_box_tests',
        on_delete=models.CASCADE
    )  # 做的哪一套试卷
    user = models.ForeignKey(
        User,
        related_name='test_box_user',
        on_delete=models.CASCADE
    )  # 哪个用户做的
    selectionScore = models.IntegerField(null=True, blank=True)  # 选择题分数
    score = models.IntegerField(null=True, blank=True)  # 分数
    desc = models.CharField(max_length=200, null=True, blank=True)  # 评语
    showBonus = models.BooleanField(null=True, blank=True)  # 是否显示奖励提示
    isCorrect = models.BooleanField(null=True, blank=True)  # 试卷是否被批改
    duration = models.IntegerField(null=True, blank=True)  # 做题时长
    quit_time = models.IntegerField(null=True, blank=True)  # 切出页面次数

    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)


class ProblemBox(models.Model):
    """
    答案箱，普通用户做完的题目
    """
    user = models.ForeignKey(
        User,
        related_name='problem_box_user',
        on_delete=models.CASCADE
    )  # 哪一个用户的答案
    problem = models.ForeignKey(
        Problem,
        related_name='problem_box_problem',
        on_delete=models.CASCADE
    )  # 解的哪个问题
    selectionAnswer = models.ForeignKey(
        Selection,
        related_name='problem_box_selection',
        on_delete=models.SET_NULL,
        null=True, blank=True
    )  # 如果是选择题，选择题的答案
    testBox = models.ForeignKey(
        TestBox,
        related_name='problem_box_test_box',
        on_delete=models.SET_NULL,
        null = True, blank = True
    )
    answer = models.CharField(max_length=200, null=True, blank=True)  # 如果是简答题，简答题的答案
    score = models.IntegerField(null=True, blank=True)  # 问题的分数

    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)
