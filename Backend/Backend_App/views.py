import json
from django.http import HttpResponse, JsonResponse
from django.forms import model_to_dict

from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

from django.middleware.csrf import get_token
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_protect

from .methods import sort_posts, add_like, add_dislike
from .models import Post, Answer, Topic

from rest_framework import response as drf_response
from rest_framework import status as drf_status

import logging

logging.basicConfig(
    filename="C:\\Users\\nl\\Github\\Angular-Online-Forum\\Backend\\Backend\\Logs\\Logs.log",
    encoding="utf-8",
    filemode="a",
    format="{asctime} - {levelname} - {message}",
    style="{",
    datefmt="%Y-%m-%d %H:%M",
)


def get_csrf_token(request):
    try:
        token = get_token(request)
        return JsonResponse({"csrfToken": token})
    except Exception as ex:
        error_message = f"Exception at get_csrf_token(): {str(ex.__class__.__name__)}: {str(ex)} on line {ex.__traceback__.tb_lineno}"
        # logging
        logging.error(f"error occured: {error_message}")
        return drf_response.Response(
            error_message, status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR
        )


def vote_post(request, voting, post_id):
    post = Post.objects.get(id=post_id)
    user = request.user

    if voting == 'up':
        # Add a like to the post
        add_like(post_id, user)
    elif voting == 'down':
        # Add a dislike to the post
        add_dislike(post_id, user)

    # Convert the updated post to a dictionary, excluding non-serializable fields
    post_dict = model_to_dict(post, exclude=['liked_by', 'disliked_by'])

    # Return the updated post data as JSON
    return JsonResponse(post_dict)


# Posts
def get_posts(request, sort_order):
    try:
        # Fetch the posts with relevant fields as dictionaries
        posts = list(Post.objects.values("id", "Subject", "Content", "Topic__name", "User"))

        # Calculate liked_by and disliked_by counts
        for post in posts:
            post['liked_by_count'] = Post.objects.get(id=post['id']).liked_by.count()
            post['disliked_by_count'] = Post.objects.get(id=post['id']).disliked_by.count()

        # Sort the posts
        sorted_posts = sort_posts(sort_order, posts)

        # Return the sorted posts as JSON
        return JsonResponse(sorted_posts, safe=False)

    except Exception as ex:
        error_message = f"Exception at get_posts(): {str(ex.__class__.__name__)}: {str(ex)} on line {ex.__traceback__.tb_lineno}"
        # logging
        logging.error(f"error occured: {error_message}")
        return drf_response.Response(
            error_message, status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR
        )


def get_specific_Post(request, post_id):
    try:
        post = Post.objects.filter(id=post_id).first()
        if post:
            # Convert the post to a dictionary excluding the liked_by and disliked_by fields
            post_dict = model_to_dict(post, exclude=['liked_by', 'disliked_by'])
            # Add the counts of likes and dislikes
            post_dict['likes_count'] = post.liked_by.count()
            post_dict['dislikes_count'] = post.disliked_by.count()
            return JsonResponse({"post": post_dict})
    except Exception as ex:
        error_message = f"Exception at get_specific_Post(): {str(ex.__class__.__name__)}: {str(ex)} on line {ex.__traceback__.tb_lineno} \n Post_Id: {post_id}"
        # logging
        logging.error(f"error occured: {error_message}")
        return JsonResponse(
            {"error": error_message}, status=500
        )


@csrf_protect
def add_post(request):
    try:
        if request.method == "POST":
            data = json.loads(request.body)
            subject = data.get("Subject")
            content = data.get("Content")
            topic_name = data.get("Topic_name")
            topic = get_object_or_404(Topic, name=topic_name)

        post = Post.objects.create(
            Subject=subject,
            Content=content,
            User=get_current_user_object(request),
            Topic=topic,
        )
        return HttpResponse(200)
    except Exception as ex:
        error_message = f"Exception at add_post(): {str(ex.__class__.__name__)}: {str(ex)} on line {ex.__traceback__.tb_lineno}"
        # logging
        logging.error(f"error occured: {error_message}")
        return drf_response.Response(
            error_message, status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR
        )


def delete_post(request, id):
    try:
        post = Post.objects.get(id=id)
        post.delete()
        return HttpResponse(200)
    except Exception as ex:
        error_message = f"Exception at delete_post(): {str(ex.__class__.__name__)}: {str(ex)} on line {ex.__traceback__.tb_lineno} \n Post_Id: {id}"
        # logging
        logging.error(f"error occured: {error_message}")
        return drf_response.Response(
            error_message, status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@csrf_protect
def edit_post(request):
    try:
        if request.method == "POST":
            data = json.loads(request.body)
            post_id = data.get("id")

            # Update the post
            post = Post.objects.get(id=post_id)
            topic = Topic.objects.get(name=data.get("Topic_name"))
            post.Subject = data.get("Subject")
            post.Content = data.get("Content")
            post.Topic = topic
            post.save()
        return HttpResponse(200)
    except Exception as ex:
        error_message = f"Exception at edit_post(): {str(ex.__class__.__name__)}: {str(ex)} on line {ex.__traceback__.tb_lineno}"
        # logging
        logging.error(f"error occured: {error_message}")
        return drf_response.Response(
            error_message, status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# Answers
def get_answers(request):
    try:
        answers = list(reversed(Answer.objects.all().values("id", "Content", "Post", "User")))
        return JsonResponse(answers, safe=False)
    except Exception as ex:
        error_message = f"Exception at get_answers(): {str(ex.__class__.__name__)}: {str(ex)} on line {ex.__traceback__.tb_lineno}"
        # logging
        logging.error(f"error occured: {error_message}")
        return drf_response.Response(
            error_message, status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR
        )


def get_specific_Answer(request, answer_id):
    try:
        answer = Answer.objects.filter(id=answer_id).first()
        if answer:
            answer_dict = model_to_dict(answer)
            return JsonResponse({"answer": answer_dict})
    except Exception as ex:
        error_message = f"Exception at get_specific_Answer(): {str(ex.__class__.__name__)}: {str(ex)} on line {ex.__traceback__.tb_lineno} \n Answer_id: {answer_id}"
        # logging
        logging.error(f"error occured: {error_message}")
        return drf_response.Response(
            error_message, status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@csrf_protect
def add_answer(request):
    try:
        if request.method == "POST":
            data = json.loads(request.body)
            content = data.get("Content")
            post_id = data.get("Post_id")
            print(post_id)
            post = get_object_or_404(Post, id=post_id)
        Answer.objects.create(
            Content=content,
            User=get_current_user_object(request),
            Post=post,
        )
        return HttpResponse(200)
    except Exception as ex:
        error_message = f"Exception at add_answer(): {str(ex.__class__.__name__)}: {str(ex)} on line {ex.__traceback__.tb_lineno}"
        # logging
        logging.error(f"error occured: {error_message}")
        return drf_response.Response(
            error_message, status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR
        )


def delete_answer(request, id):
    try:
        answer = Answer.objects.get(id=id)
        answer.delete()
        return HttpResponse(200)
    except Exception as ex:
        error_message = f"Exception at delete_answer(): {str(ex.__class__.__name__)}: {str(ex)} on line {ex.__traceback__.tb_lineno} \n Answer_id: {id}"
        # logging
        logging.error(f"error occured: {error_message}")
        return drf_response.Response(
            error_message, status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@csrf_protect
def edit_answer(request):
    try:
        if request.method == "POST":
            data = json.loads(request.body)
            answer_id = data.get("id")

            # Update the post
            answer = Answer.objects.get(id=answer_id)
            answer.Content = data.get("Content")
            answer.save()
        return HttpResponse(200)
    except Exception as ex:
        error_message = f"Exception at edit_answer(): {str(ex.__class__.__name__)}: {str(ex)} on line {ex.__traceback__.tb_lineno}"
        # logging
        logging.error(f"error occured: {error_message}")
        return drf_response.Response(
            error_message, status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# Topics
def get_topics(request):
    try:
        topics = list(Topic.objects.all().values("id", "name"))
        return JsonResponse(topics, safe=False)
    except Exception as ex:
        error_message = f"Exception at get_topics(): {str(ex.__class__.__name__)}: {str(ex)} on line {ex.__traceback__.tb_lineno}"
        # logging
        logging.error(f"error occured: {error_message}")
        return drf_response.Response(
            error_message, status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR
        )


def get_specific_topic(request, topic_id):
    try:
        topic = Topic.objects.filter(id=topic_id).first()
        return JsonResponse({"name": topic.name})
    except Exception as ex:
        error_message = f"Exception at get_specific_topic(): {str(ex.__class__.__name__)}: {str(ex)} on line {ex.__traceback__.tb_lineno} \n Topic_id: {topic_id}"
        # logging
        logging.error(f"error occured: {error_message}")
        return drf_response.Response(
            error_message, status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@csrf_protect
def add_topic(request):
    try:
        if request.method == "POST":
            data = json.loads(request.body)
            name = data.get("name")
            description = data.get("description")
        topic = Topic.objects.create(
            name=name,
            description=description,
        )
        return HttpResponse(200)
    except Exception as ex:
        error_message = f"Exception at add_topic(): {str(ex.__class__.__name__)}: {str(ex)} on line {ex.__traceback__.tb_lineno}"
        # logging
        logging.error(f"error occured: {error_message}")
        return drf_response.Response(
            error_message, status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR
        )


def delete_topic(request, id):
    try:
        topic = Topic.objects.get(id=id)
        topic.delete()
        return HttpResponse(200)
    except Exception as ex:
        error_message = f"Exception at delete_topic(): {str(ex.__class__.__name__)}: {str(ex)} on line {ex.__traceback__.tb_lineno} \n Topic_id: {id}"
        # logging
        logging.error(f"error occured: {error_message}")
        return drf_response.Response(
            error_message, status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# Benutzer-Verwaltung
@csrf_protect
def login(request):
    try:
        if request.method == "POST":  # Check if the request method is POST
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
        else:
            return JsonResponse({"error": "Invalid request method."}, status=405)
    except Exception as ex:
        error_message = f"Exception at login(): {str(ex.__class__.__name__)}: {str(ex)} on line {ex.__traceback__.tb_lineno}"
        # logging
        logging.error(f"error occured: {error_message}")
        return drf_response.Response(
            error_message, status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR
        )


def logout(request):
    try:
        auth_logout(request)  # User wird ausgeloggt
        return JsonResponse({"message": "user logged out"}, status=200)
    except Exception as ex:
        error_message = f"Exception at logout(): {str(ex.__class__.__name__)}: {str(ex)} on line {ex.__traceback__.tb_lineno}"
        # logging
        logging.error(f"error occured: {error_message}")
        return drf_response.Response(
            error_message, status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@csrf_protect  # Enforces CSRF protection
def sign_up(request):
    # Check if the request method is POST
    if request.method == "POST" or request.method == "PUT":
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
            error_message = f"Exception at sign_up(): JSONDecodeError: Invalid JSON data on line {ex.__traceback__.tb_lineno} \n User: {request.user}"
            logging.error(f"error occurred: {error_message}")
            return JsonResponse({"error": "Invalid JSON data."}, status=400)
        except Exception as ex:  # Handle other exceptions
            error_message = f"Exception at sign_up(): {str(ex.__class__.__name__)}: {str(ex)} on line {ex.__traceback__.tb_lineno} \n User: {request.user}"
            logging.error(f"error occurred: {error_message}")
            return JsonResponse(
                {"error": "Registration failed, try again later"}, status=500
            )
    # Handle non-POST requests
    else:
        return JsonResponse({"error": "Invalid request method."}, status=405)


def get_specific_user_object(request, user_id):
    user_object = get_object_or_404(User, id=user_id)
    if user_object:
        return JsonResponse({"User": [user_object.id, user_object.username]})
    print(user_object)
    return user_object


def get_current_user_object(request):
    user_object = get_object_or_404(User, id=request.user.id)
    return user_object


def get_current_user(request):
    try:
        user = request.user
        user_data = {
            "username": str(user.username),
            "is_superuser": bool(user.is_superuser),
        }
        return JsonResponse(user_data)
    except Exception as ex:
        error_message = f"Exception at get_current_user(): {str(ex.__class__.__name__)}: {str(ex)} on line {ex.__traceback__.tb_lineno} \n User: {request.user}"
        # logging
        logging.error(f"error occured: {error_message}")
        return drf_response.Response(
            error_message, status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@csrf_protect
def isAuthenticated(request):
    try:
        user = request.user
        if user.is_authenticated:
            return JsonResponse({"authenticated": True})
        else:
            return JsonResponse({"authenticated": False})
    except Exception as ex:
        error_message = f"Exception at isAuthenticated(): {str(ex.__class__.__name__)}: {str(ex)} on line {ex.__traceback__.tb_lineno} \n User: {request.user}"
        # logging
        logging.error(f"error occured: {error_message}")
        return drf_response.Response(
            error_message, status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# Check if the backend is funning
def health_check(request):
    try:
        return JsonResponse({"status": "running"})
    except Exception as ex:
        error_message = f"Exception at health_check(): {str(ex.__class__.__name__)}: {str(ex)} on line {ex.__traceback__.tb_lineno}"
        # logging
        logging.error(f"error occured: {error_message}")
        return drf_response.Response(
            error_message, status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR
        )
