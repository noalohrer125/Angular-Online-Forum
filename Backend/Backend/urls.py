"""
URL configuration for Backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from Backend_App.views import (
    vote_post,
    get_liked_posts,
    get_answers,
    get_csrf_token,
    get_posts,
    get_topics,
    add_post,
    add_answer,
    add_topic,
    delete_post,
    delete_answer,
    delete_topic,
    get_specific_topic,
    get_specific_Post,
    get_specific_Answer,
    edit_post,
    edit_answer,
    login,
    logout,
    sign_up,
    get_current_user,
    isAuthenticated,
    health_check,
    get_specific_user_object,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("vote_post/<str:voting>/<int:post_id>", vote_post, name="vote_post"),
    path("get_posts/<str:sort_order>/", get_posts, name="get_posts"),
    path("get_liked_posts/", get_liked_posts, name="get_liked_posts"),
    path("get_answers/", get_answers, name="get_answers"),
    path("get_topics/", get_topics, name="get_topics"),
    path("add_post/", add_post, name="add_post"),
    path("add_answer/", add_answer, name="add_answer"),
    path("add_topic/", add_topic, name="add_topic"),
    path("delete_post/<int:id>/", delete_post, name="delete_post"),
    path("delete_answer/<int:id>/", delete_answer, name="delete_answer"),
    path("delete_topic/<int:id>/", delete_topic, name="delete_post"),
    path("edit_post/", edit_post, name="edit_post"),
    path("edit_answer/", edit_answer, name="edit_answer"),
    path("get_specific_topic/<int:topic_id>/", get_specific_topic, name="get_specific_topic"),
    path("get_specific_post/<int:post_id>/", get_specific_Post, name="get_specific_Post"),
    path("get_specific_answer/<int:answer_id>/", get_specific_Answer, name="get_specific_answer"),
    path("get-csrf-token/", get_csrf_token, name="get_csrf_token"),
    path("login/", login, name="login"),
    path("logout/", logout, name="logout"),
    path("sign_up/", sign_up, name="sign_up"),
    path("current_user/", get_current_user, name="get_current_user"),
    path("isAuthenticated/", isAuthenticated, name="isAuthenticated"),
    path('health-check/', health_check, name='health_check'),
    path("get_specific_user_object/<int:user_id>/", get_specific_user_object, name="get_specific_user_object"),
]
