import json
from django.http import HttpResponse
from .models import Post, Answer, Topic
from django.contrib.auth.models import User

# Posts
def get_posts(request):
    posts = Post.objects.all()
    return HttpResponse(posts)

def add_post(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        post = Post.objects.create(
            Subject=data['Subject'],
            Content=data['Content'],
            User_id=data['User_id'],
            Topic_id=data['Topic_id']
        )
        post.save()

#Answers
def get_answers(request):
    answers = Answer.objects.all()
    return HttpResponse(answers)

def add_answer(Content, User_id, Post_id):
    answer = Answer.objects.create(
        Content=Content,
        User_id=User_id,
        Post_id=Post_id
        )
    answer.save()

# Topics
def get_topics(request):
    topics = Topic.objects.all()
    return HttpResponse(topics)

def add_topic(name, descripiton):
    topic = Topic.objects.create(
        name=name,
        descripiton=descripiton
        )
    topic.save()

#Users
def add_user(name, password):
    user = User.objects.create_user(username=name, password=password)
    user.save()

def current_user(request):
    return request.user
