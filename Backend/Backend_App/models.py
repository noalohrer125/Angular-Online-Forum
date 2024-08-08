from django.db import models

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
    # User_id = models.ForeignKey("User", on_delete=models.CASCADE)
    Topic_id = models.ForeignKey("Topic", on_delete=models.CASCADE)

# Answer-Model
class Answer(models.Model):
    id = models.IntegerField(primary_key=True, unique=True)
    Content = models.CharField(max_length=1000)
    # User_id = models.ForeignKey("User", on_delete=models.CASCADE)
    Post_id = models.ForeignKey("Post", on_delete=models.CASCADE)
