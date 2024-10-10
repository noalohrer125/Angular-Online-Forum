from django.shortcuts import get_object_or_404
from .models import Post, Answer, Avatar


def sort_posts(sort_order, posts):
    #asc by topic
    if sort_order == "asc-topic":
        sorted_posts = sorted(posts, key=lambda x: x["Topic__name"])
    # desc by topic
    elif sort_order == "desc-topic":
        sorted_posts = sorted(posts, key=lambda x: x["Topic__name"], reverse=True)

    # asc by voting
    elif sort_order == "asc-voting":
        sorted_posts = sorted(posts, key=lambda x: x["voting_score"], reverse=True)
    # desc by voting
    elif sort_order == "desc-voting":
        sorted_posts = sorted(posts, key=lambda x: x["voting_score"])
    else:
        sorted_posts = list(reversed(posts))

    return sorted_posts


def add_like_post(post_id, user):
    # Get the post by its ID
    post = get_object_or_404(Post, id=post_id)
    
    # If the user has already liked the post
    if user in post.liked_by.all():
        # Remove the like
        post.liked_by.remove(user)

    # If the user hasn't liked the post yet
    else:
        # Add the user to the liked_by list
        post.liked_by.add(user)

        # If the user had disliked the post, remove the dislike
        if user in post.disliked_by.all():
            post.disliked_by.remove(user)
            # Since a dislike removes 1 vote, adding a like should cancel that, so no additional vote change

    # Save the updated post
    post.save()


def add_dislike_post(post_id, user):
    # Retrieve the post by its ID, or return a 404 error if not found
    post = get_object_or_404(Post, id=post_id)
    
    # If the user has already disliked the post
    if user in post.disliked_by.all():
        # Remove the dislike
        post.disliked_by.remove(user)
        
    # If the user hasn't disliked the post yet
    else:
        # Add the user to the list of people who disliked the post
        post.disliked_by.add(user)
        
        # If the user previously liked the post, remove the like
        if user in post.liked_by.all():
            post.liked_by.remove(user)

    # Save the updated post data
    post.save()


def add_like_answer(answer_id, user):
    # Get the answer by its ID
    answer = get_object_or_404(Answer, id=answer_id)
    
    # If the user has already liked the answer
    if user in answer.liked_by.all():
        # Remove the like
        answer.liked_by.remove(user)

    # If the user hasn't liked the answer yet
    else:
        # Add the user to the liked_by list
        answer.liked_by.add(user)

        # If the user had disliked the answer, remove the dislike
        if user in answer.disliked_by.all():
            answer.disliked_by.remove(user)
            # Since a dislike removes 1 vote, adding a like should cancel that, so no additional vote change

    # Save the updated answer
    answer.save()


def add_dislike_answer(answer_id, user):
    # Retrieve the answer by its ID, or return a 404 error if not found
    answer = get_object_or_404(Answer, id=answer_id)
    
    # If the user has already disliked the answer
    if user in answer.disliked_by.all():
        # Remove the dislike
        answer.disliked_by.remove(user)
        
    # If the user hasn't disliked the answer yet
    else:
        # Add the user to the list of people who disliked the answer
        answer.disliked_by.add(user)
        
        # If the user previously liked the answer, remove the like
        if user in answer.liked_by.all():
            answer.liked_by.remove(user)

    # Save the updated answer data
    answer.save()


def get_liked_users_to_post(post_id):
    # Retrieve the post by its ID, or return a 404 error if not found
    post = get_object_or_404(Post, id=post_id)
    
    # Return the list of users who liked the post
    return post.liked_by.all()


def get_liked_users_to_answer(post_id):
    # Retrieve the answer by its ID, or return a 404 error if not found
    answer = get_object_or_404(Answer, id=post_id)
    
    # Return the list of users who liked the answer
    return answer.liked_by.all()


def add_user_avatar(avatar_id, user):
    # Retrieve the avatar by its ID, or return a 404 error if not found
    avatar = get_object_or_404(Avatar, id=avatar_id)

    avatar.users.add(user)

    # Save the updated avatar data
    avatar.save()

def get_user_avatar(user_id):
    avatar = Avatar.get_avatar_by_user_id(user_id)
    if avatar:
        return avatar
    else:
        return 'no avatar found'
