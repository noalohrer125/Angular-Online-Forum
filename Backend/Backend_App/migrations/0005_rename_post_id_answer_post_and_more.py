# Generated by Django 5.0.3 on 2024-10-01 09:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Backend_App', '0004_answer_user_id_post_user_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='answer',
            old_name='Post_id',
            new_name='Post',
        ),
        migrations.RenameField(
            model_name='answer',
            old_name='User_id',
            new_name='User',
        ),
        migrations.RenameField(
            model_name='post',
            old_name='Topic_id',
            new_name='Topic',
        ),
        migrations.RenameField(
            model_name='post',
            old_name='User_id',
            new_name='User',
        ),
    ]