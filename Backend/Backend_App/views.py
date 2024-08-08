import json
from django.http import HttpResponse
from .models import Post, Answer, Topic
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt

# Posts
def get_posts(request):
    posts = list(Post.objects.all().values('id', 'Subject', 'Content', 'Topic_id'))
    return JsonResponse(posts, safe=False)

@csrf_exempt
def add_post(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        subject = data.get('subject')
        content = data.get('content')
        topic_name = data.get('topic_name')

        topic = get_object_or_404(Topic, name=topic_name)

    post = Post.objects.create(
        Subject=subject,
        Content=content,
        # User_id=current_user(request),
        Topic_id=topic
    )

#Answers
def get_answers(request):
    answers = Answer.objects.all()
    return HttpResponse(answers)

def add_answer(Content, User_id, Post_id):
    answer = Answer.objects.create(
        Content=Content,
        # User_id=User_id,
        Post_id=Post_id
        )

# Topics
from django.http import JsonResponse

def get_topics(request):
    topics = list(Topic.objects.all().values('id', 'name'))
    return JsonResponse(topics, safe=False)

def get_specific_topic(id):
    return Topic.objects.filter(id=id)

def add_topic(name, descripiton):
    topic = Topic.objects.create(
        name=name,
        description=descripiton
        )

#Users
def add_user(name, password):
    user = User.objects.create_user(username=name, password=password)

def current_user(request):
    return request.user
