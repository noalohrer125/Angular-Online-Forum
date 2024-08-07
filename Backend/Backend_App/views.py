import json
from django.http import HttpResponse
from .models import Post, Answer, Topic
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

# Posts
def get_posts(request):
    posts = Post.objects.all()
    return HttpResponse(posts)

def add_post(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        subject = data.get('subject')
        content = data.get('content')
        topic_name = data.get('topic_name')

        topic_id = get_object_or_404(Topic, name=topic_name).id

    post = Post.objects.create(
        Subject=subject,
        Content=content,
        User_id=current_user(),
        Topic_id=topic_id
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
    topics = Topic.objects.all().values('id', 'name')
    print(list(topics))
    return HttpResponse(list(topics))

# def get_topics(request):
#     topics = Topic.objects.all()
#     formatted_topics = [{topic.name} for topic in topics]
#     print(formatted_topics)
#     return HttpResponse(formatted_topics)


def add_topic(name, descripiton):
    topic = Topic.objects.create(
        name=name,
        description=descripiton
        )
    topic.save()

#Users
def add_user(name, password):
    user = User.objects.create_user(username=name, password=password)
    user.save()

def current_user(request):
    return request.user
