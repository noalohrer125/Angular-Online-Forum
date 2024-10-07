from django.shortcuts import get_object_or_404
from .models import Post


def sort_posts(sort_order, posts):
    #asc by topic
    if sort_order == "asc-topic":
        sorted_posts = sorted(posts, key=lambda x: x["Topic__name"])
    # desc by topic
    elif sort_order == "desc-topic":
        sorted_posts = sorted(posts, key=lambda x: x["Topic__name"], reverse=True)

    # asc by voting
    elif sort_order == "asc-voting":
        sorted_posts = sorted(posts, key=lambda x: x["voting_score"])
    # desc by voting
    elif sort_order == "desc-voting":
        sorted_posts = sorted(posts, key=lambda x: x["voting_score"], reverse=True)
    else:
        sorted_posts = list(reversed(posts))

    return sorted_posts


def add_like(post_id, user):
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


def add_dislike(post_id, user):
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


def get_liked_users_to_post(post_id):
    # Retrieve the post by its ID, or return a 404 error if not found
    post = get_object_or_404(Post, id=post_id)
    
    # Return the list of users who liked the post
    return post.liked_by.all()
