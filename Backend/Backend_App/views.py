from django.http import HttpResponse
from .models import Post, Answer, Topic

def posts(request):
    posts = Post.objects.all()
    return HttpResponse(posts)

def answers(request):
    answers = Answer.objects.all()
    return HttpResponse(answers)

def topics(request):
    topics = Topic.objects.all()
    return HttpResponse(topics)
