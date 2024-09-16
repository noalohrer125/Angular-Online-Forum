import json
from django.forms import model_to_dict
from django.http import HttpResponse
from .models import Post, Answer, Topic
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.http import JsonResponse
from django.core.serializers import serialize
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.middleware.csrf import get_token


def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({"csrfToken": token})


# Posts
def get_posts(request):
    posts = list(Post.objects.all().values("id", "Subject", "Content", "Topic_id"))
    return JsonResponse(posts, safe=False)


def get_specific_Post(request, post_id):
    post = Post.objects.filter(id=post_id).first()
    if post:
        post_dict = model_to_dict(post)
        return JsonResponse({"post": post_dict})


@csrf_protect
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


@csrf_protect
def edit_post(request):
    if request.method == "POST":
        data = json.loads(request.body)

        post_id = data.get("id")

        # Update the post
        post = Post.objects.get(id=post_id)

        topic = Topic.objects.get(name=data.get("topic_name"))

        post.Subject = data.get("subject")
        post.Content = data.get("content")
        post.Topic_id = topic

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
        return JsonResponse({"answer": answer_dict})


@csrf_protect
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


@csrf_protect
def edit_answer(request):
    if request.method == "POST":
        data = json.loads(request.body)
        answer_id = data.get("id")

        # Update the post
        answer = Answer.objects.get(id=answer_id)
        answer.Content = data.get("content")
        answer.save()
    return HttpResponse(200)


# Topics
def get_topics(request):
    topics = list(Topic.objects.all().values("id", "name"))
    return JsonResponse(topics, safe=False)


def get_specific_topic(request, topic_id):
    topic = Topic.objects.filter(id=topic_id).first()
    return JsonResponse({"name": topic.name})


@csrf_protect
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


# Benutzer-Verwaltung
@csrf_protect  # Enforces CSRF protection
def login(request):
    if request.method == "POST":  # Check if the request method is POST
        try:
            data = json.loads(request.body)  # Parse JSON data from the request body
            u_name = data.get("name")  # Get the username from the parsed data
            pw = data.get("password")  # Get the password from the parsed data
            user = authenticate(request, username=u_name, password=pw)

            if user is not None:
                auth_login(request, user)
                return JsonResponse({"message": "Login successful"}, status=200)
            else:
                return JsonResponse(
                    {"error": "Invalid username or password."}, status=200
                )
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data."}, status=200)
    else:
        return JsonResponse({"error": "Invalid request method."}, status=405)


def logout(request):
    auth_logout(request)  # User wird ausgeloggt
    return JsonResponse({"message": "user logged out."}, status=200)


@csrf_protect  # Enforces CSRF protection
def sign_up(request):
    if (
        request.method == "POST" or request.method == "PUT"
    ):  # Check if the request method is POST
        try:
            data = json.loads(request.body)  # Parse JSON data from the request body
            username = data.get("name")  # Get the username from the parsed data
            password = data.get("password")  # Get the password from the parsed data

            # Check if username and password are provided
            if not username or not password:
                return JsonResponse(
                    {"error": "Username and password are required."}, status=400
                )

            # Validate the password according to Django's password validation rules
            try:
                validate_password(password)
            except ValidationError as e:
                return JsonResponse({"error": e.messages}, status=400)

            # Check if the username already exists
            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "Username already exists."}, status=400)

            # Create a new user with the provided username and password
            user = User.objects.create_user(username=username, password=password)
            user.save()  # Save the user to the database
            return JsonResponse({"message": "User created successfully."}, status=201)

        except json.JSONDecodeError:  # Handle JSON decoding errors
            return JsonResponse({"error": "Invalid JSON data."}, status=400)
    else:
        return JsonResponse(
            {"error": "Invalid request method."}, status=405
        )  # Handle non-POST requests


def get_current_user(request):
    user = request.user
    user_data = {
        "username": str(user.username),
        "is_superuser": bool(user.is_superuser),
    }
    return JsonResponse(user_data)


@csrf_protect
def isAuthenticated(request):
    user = request.user
    if user.is_authenticated:
        return JsonResponse({"authenticated": True})
    else:
        return JsonResponse({"authenticated": False})
