import json
from pyexpat.errors import messages
from django.forms import model_to_dict
from django.http import HttpResponse

from Backend.Backend_App.forms import RegisterForm
from .models import Post, Answer, Topic
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout


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

        topic = Topic.objects.get(name=data.get("topic_name"))

        post.Subject=data.get("subject")
        post.Content=data.get("content")
        post.Topic_id=topic

        post.save()

    return HttpResponse(200)


# Answers
def get_answers(request):
    topics = list(Answer.objects.all().values("id", "Content", "Post_id"))
    return JsonResponse(topics, safe=False)

def get_specific_Answer(request, answer_id):
    answer = Answer.objects.filter(id=answer_id).first()
    if answer:
        answer_dict = model_to_dict(answer)
        return JsonResponse({'answer': answer_dict})

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

@csrf_exempt
def edit_answer(request):
    if request.method == "POST":
        data = json.loads(request.body)

        answer_id = data.get("id")
        
        # Update the post
        answer = Answer.objects.get(id=answer_id)
        
        answer.Content=data.get("content")

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


# User-Verwaltung
def login(request):
    if request.method == 'POST':
        username = request.POST["username"] # Username aus Formular in Variable username speichern
        password = request.POST["password"] # Passwort aus Formular in Variable password speichern
        user = authenticate(request, username=username, password=password) # Ist der Username in der DB vorhanden? Ist das Passwort in der DB vohanden und gehört es zum eingegebenen User?
        # Wenn der User valide ist wird er angemeldet und auf die Home Seite umgeleitet
        if user is not None:
            auth_login(request, user)
        # Wenn die Userinformationen inkorrekt sind erscheint eine Nachricht mit 'Login Incorrect' und der User wird auf die Login Seite umgeleitet
        else:
            messages.info(request, 'Login incorrect!')
    else:
        return 0

def logout(request):
    auth_logout(request) # User wird ausgeloggt

def sign_up(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            return 0
        else:
            if request:
                messages.info(request, 'You must define a unique username and your password must contain at least 8 characters!')
    else:
        form = RegisterForm()
        return 0
