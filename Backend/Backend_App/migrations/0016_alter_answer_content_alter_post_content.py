# Generated by Django 5.0.3 on 2024-10-11 13:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Backend_App', '0015_alter_answer_id_alter_avatar_id_alter_post_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='Content',
            field=models.CharField(),
        ),
        migrations.AlterField(
            model_name='post',
            name='Content',
            field=models.CharField(),
        ),
    ]
