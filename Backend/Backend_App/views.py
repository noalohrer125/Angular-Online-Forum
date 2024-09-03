import json
from pyexpat.errors import messages
from django.forms import model_to_dict
from django.http import HttpResponse
from .forms import RegisterForm
from .models import Post, Answer, Topic
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout

from django.http import JsonResponse
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError


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
@csrf_exempt  # Exempts this view from CSRF verification
def login(request):
    if request.method == 'POST':  # Check if the request method is POST
        data = json.loads(request.body)  # Parse JSON data from the request body
        username = data.get('name')  # Get the username from the parsed data
        password = data.get('password')  # Get the password from the parsed data
        user = authenticate(request, username=username, password=password)

        # Check if username and password are provided
        if username and password:
            auth_login(request, user)
            print('login successfull')
        # Wenn die Userinformationen inkorrekt sind erscheint eine Nachricht mit 'Login Incorrect' und der User wird auf die Login Seite umgeleitet
        else:
            messages.info(request, 'Login incorrect!')
            print('login incorrect')
            return JsonResponse({'error': 'login incorrect'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)  # Handle non-POST requests

def logout(request):
    auth_logout(request) # User wird ausgeloggt

@csrf_exempt  # Exempts this view from CSRF verification
def sign_up(request):
    if request.method == 'POST':  # Check if the request method is POST
        try:
            data = json.loads(request.body)  # Parse JSON data from the request body
            username = data.get('name')  # Get the username from the parsed data
            password = data.get('password')  # Get the password from the parsed data

            # Check if username and password are provided
            if not username or not password:
                print('username and password are required!')
                return JsonResponse({'error': 'Username and password are required.'}, status=400)

            # Validate the password according to Django's password validation rules
            try:
                validate_password(password)
            except ValidationError as e:
                print({'error': e.messages})
                return JsonResponse({'error': e.messages}, status=400)

            # Check if the username already exists
            if User.objects.filter(username=username).exists():
                print('username allready exists')
                return JsonResponse({'error': 'Username already exists.'}, status=400)

            # Create a new user with the provided username and password
            user = User.objects.create_user(username=username, password=password)
            user.save()  # Save the user to the database

            print('user created successfully')
            return JsonResponse({'message': 'User created successfully.'}, status=201)

        except json.JSONDecodeError:  # Handle JSON decoding errors
            print('invalid json data')
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
    else:
        print('invalid request method')
        return JsonResponse({'error': 'Invalid request method.'}, status=405)  # Handle non-POST requests

def get_current_user(request):
    return JsonResponse({'user': str(request.user)})
