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

    return HttpResponse(200)

def delete_post(request, id):
    post = Post.objects.get(id=id)
    post.delete()

    return HttpResponse(200)

@csrf_exempt
def edit_post(request):
    if request.method == "POST":
        data = json.loads(request.body)

        post_id = data.get("id")
        
        # Update the post
        post = Post.objects.get(id=post_id)

        topic = Topic.objects.get(name=data.get("topic_id"))

        post.Subject=data.get("subject")
        post.Content=data.get("content")
        post.Topic_id=topic

        post.save()

    return HttpResponse(200)


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

    return HttpResponse(200)

def delete_answer(request, id):
    answer = Answer.objects.get(id=id)
    answer.delete()

    return HttpResponse(200)

def edit_answer(request, new_answer):
    answer = Answer.objects.get(id=answer.id)
    answer.field_name = new_answer.data
    answer.field_name = new_answer.data
    answer.field_name  = new_answer.data

    answer.save()

    return HttpResponse(200)


# Topics
from django.http import JsonResponse


def get_topics(request):
    topics = list(Topic.objects.all().values("id", "name"))
    return JsonResponse(topics, safe=False)


def get_specific_topic(request, topic_id):
    topic = Topic.objects.filter(id=topic_id).first()
    return JsonResponse({'name': topic.name})

@csrf_exempt
def add_topic(request):
    if request.method == "POST":
        data = json.loads(request.body)
        name = data.get("name")
        description = data.get("description")

    topic = Topic.objects.create(
        name=name,
        description=description,
    )

    return HttpResponse(200)

def delete_topic(request, id):
    topic = Topic.objects.get(id=id)
    topic.delete()

    return HttpResponse(200)


# Users
def add_user(name, password):
    user = User.objects.create_user(
        username=name,
        password=password,
    )

    return HttpResponse(200)

def current_user(request):
    return request.user

def delete_user(request, id):
    pass
