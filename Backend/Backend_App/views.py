import json
from django.forms import model_to_dict
from django.http import HttpResponse
from .models import Post, Answer, Topic
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt


# Posts
def get_posts(request):
    posts = list(Post.objects.all().values("id", "Subject", "Content", "Topic_id"))
    return JsonResponse(posts, safe=False)

# def get_specific_Post(request, post_id):
#     post = Post.objects.filter(id=post_id).first()
#     return JsonResponse({'post': post})

def get_specific_Post(request, post_id):
    post = Post.objects.filter(id=post_id).first()
    if post:
        post_dict = model_to_dict(post)
        return JsonResponse({'post': post_dict})

@csrf_exempt
def add_post(request):
    if request.method == "POST":
        data = json.loads(request.body)
        subject = data.get("subject")
        content = data.get("content")
        topic_name = data.get("topic_name")

        topic = get_object_or_404(Topic, name=topic_name)

    post = Post.objects.create(
        Subject=subject,
        Content=content,
        # User_id=current_user(request),
        Topic_id=topic,
    )


# Answers
def get_answers(request):
    topics = list(Answer.objects.all().values("id", "Content", "Post_id"))
    return JsonResponse(topics, safe=False)

@csrf_exempt
def add_answer(request):
    if request.method == "POST":
        data = json.loads(request.body)
        content = data.get("content")
        post_id = data.get("post_id")

        post = get_object_or_404(Post, id=post_id)


    answer = Answer.objects.create(
        Content=content,
        # User_id=current_user(request),
        Post_id=post,
    )


# Topics
from django.http import JsonResponse


def get_topics(request):
    topics = list(Topic.objects.all().values("id", "name"))
    return JsonResponse(topics, safe=False)


def get_specific_topic(request, topic_id):
    topic = Topic.objects.filter(id=topic_id).first()
    return JsonResponse({'name': topic.name})

def add_topic(name, descripiton):
    topic = Topic.objects.create(
        name=name,
        description=descripiton,
    )


# Users
def add_user(name, password):
    user = User.objects.create_user(
        username=name,
        password=password,
    )

def current_user(request):
    return request.user
