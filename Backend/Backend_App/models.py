from django.db import models
from django.contrib.auth.models import User

# Topic-Model
class Topic(models.Model):
    id = models.IntegerField(primary_key=True, unique=True)
    name = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=100)
# Post-Model
class Post(models.Model):
    id = models.IntegerField(primary_key=True, unique=True)
    Subject = models.CharField(max_length=100)
    Content = models.CharField(max_length=1000)
    liked_by = models.ManyToManyField(User, related_name='liked_posts', blank=True)
    disliked_by = models.ManyToManyField(User, related_name='disliked_posts', blank=True)
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    Topic = models.ForeignKey("Topic", on_delete=models.CASCADE)
# Answer-Model
class Answer(models.Model):
    id = models.IntegerField(primary_key=True, unique=True)
    Content = models.CharField(max_length=1000)
    liked_by = models.ManyToManyField(User, related_name='liked_answer', blank=True)
    disliked_by = models.ManyToManyField(User, related_name='disliked_answer', blank=True)
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    Post = models.ForeignKey("Post", on_delete=models.CASCADE)
