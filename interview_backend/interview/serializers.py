from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import serializers
from interview import models


class EnterpriseSerializer(ModelSerializer):
    class Meta:
        model = models.EnterpriseManager
        fields = '__all__'


class CollegeSerializer(ModelSerializer):
    class Meta:
        model = models.CollegeManager
        fields = '__all__'


class SelectionSerializer(ModelSerializer):
    class Meta:
        model = models.Selection
        fields = '__all__'


class ProblemSerializer(ModelSerializer):
    selection_problem = SerializerMethodField(source='get_selection_problem', read_only=True)

    class Meta:
        model = models.Problem
        fields = (
            'id',
            'contents',
            'problemType',
            'score',
            'selection_problem',
            'create_time',
        )

    @staticmethod
    def get_selection_problem(obj):
        return SelectionSerializer(obj.selection_problem, many=True).data


class TestsSerializer(ModelSerializer):
    tests_enterprise = SerializerMethodField(source='get_tests_enterprise', read_only=True)
    test_count = serializers.SerializerMethodField()
    tests_question = SerializerMethodField(source='get_tests_question', read_only=True)
    is_tested = SerializerMethodField(source='get_is_tested', read_only=True)

    class Meta:
        model = models.Tests
        fields = (
            'id',
            'name',
            'jobDescribe',
            'desc',
            'bonus',
            'active',
            'create_time',
            'test_count',
            'tests_enterprise',
            'tests_question',
            'is_tested'
        )

    @staticmethod
    def get_tests_enterprise(obj):
        return EnterpriseSerializer(obj.enterprise, many=False).data

    @staticmethod
    def get_test_count(obj):
        return obj.test_box_tests.all().count()

    @staticmethod
    def get_tests_question(obj):
        return ProblemSerializer(obj.problem_tests, many=True).data

    @staticmethod
    def get_is_tested(obj):
        return obj.isTested if hasattr(obj, 'isTested') else None


class SimpleTestsSerializer(ModelSerializer):
    tests_enterprise = SerializerMethodField(source='get_tests_enterprise')

    class Meta:
        model = models.Tests
        fields = (
            'id',
            'name',
            'jobDescribe',
            'desc',
            'bonus',
            'active',
            'create_time',
            'tests_enterprise',
        )

    @staticmethod
    def get_tests_enterprise(obj):
        return EnterpriseSerializer(obj.enterprise, many=False).data


class ProblemBoxSerializer(ModelSerializer):
    problem_box_problem = SerializerMethodField(source='get_problem_box_problem')

    class Meta:
        model = models.ProblemBox
        fields = (
            'id',
            'answer',
            'problem_box_problem',
            'selectionAnswer',
            'score'
        )

    @staticmethod
    def get_problem_box_problem(obj):
        return ProblemSerializer(obj.problem, many=False).data


class TestsBoxSerializer(ModelSerializer):
    tests_simple = SerializerMethodField(source='get_tests_simple')

    class Meta:
        model = models.TestBox
        fields = (
            'id',
            'selectionScore',
            'score',
            'desc',
            'showBonus',
            'tests_simple',
            'create_time',
            'isCorrect',
        )

    @staticmethod
    def get_tests_simple(obj):
        return SimpleTestsSerializer(obj.test, many=False).data


class JobFairsSerializer(ModelSerializer):
    enterprise_count = serializers.SerializerMethodField()
    college_detail = SerializerMethodField(source='get_college_detail')
    is_attend = SerializerMethodField(source='get_is_attend')

    class Meta:
        model = models.JobFairs
        fields = (
            'id',
            'name',
            'desc',
            'desc',
            'postImgUrl',
            'start_date',
            'end_date',
            'college_detail',
            'enterprise_count',
            'is_attend'
        )

    @staticmethod
    def get_enterprise_count(obj):
        return obj.eij_job_fairs.all().count()

    @staticmethod
    def get_college_detail(obj):
        return CollegeSerializer(obj.college, many=False).data

    @staticmethod
    def get_is_attend(obj):
        return obj.isAttend if hasattr(obj, 'isAttend') else None


class TestBoxSerializer(ModelSerializer):
    class Meta:
        model = models.TestBox
        fields = '__all__'
