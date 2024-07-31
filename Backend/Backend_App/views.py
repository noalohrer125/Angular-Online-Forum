from django.http import HttpResponse
from .models import Post

def posts(request):
    posts = Post.objects.all()
    return HttpResponse(posts)
