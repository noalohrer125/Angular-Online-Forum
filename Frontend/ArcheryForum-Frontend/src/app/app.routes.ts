import { Routes } from "@angular/router";
import { HomeComponent } from "./content/home/home.component";
import { PostsComponent } from "./content/posts/posts.component";
import { PostDetailsComponent } from "./content/posts/post-details/post-details.component";
import { NewPostComponent } from "./content/posts/new-post/new-post.component";
import { NewTopicComponent } from "./content/posts/new-topic/new-topic.component";
import { NewAnswerComponent } from "./content/posts/post-details/answers/new-answer/new-answer.component";
import { EditPostComponent } from "./content/posts/edit-post/edit-post.component";
import { EditAnswerComponent } from "./content/posts/post-details/answers/edit-answer/edit-answer.component";
import { LoginComponent } from "./user-handling/login/login.component";
import { RegisterComponent } from "./user-handling/register/register.component";
import { LogoutComponent } from "./user-handling/logout/logout.component";
import { LikedPostsComponent } from "./content/posts/liked-posts/liked-posts.component";
import { AuthGuard } from "./user-handling/auth.guard";

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'posts', component: PostsComponent },
    { path: 'post-details/:postId', component: PostDetailsComponent },
    { path: 'new-post', component: NewPostComponent , canActivate: [AuthGuard] },
    { path: 'edit-post/:CurrentPostId', component: EditPostComponent , canActivate: [AuthGuard] },
    { path: 'new-topic', component: NewTopicComponent, canActivate: [AuthGuard], data: { role: 'admin' }  },
    { path: 'new-answer', component: NewAnswerComponent, canActivate: [AuthGuard] },
    { path: 'edit-answer/:CurrentAnswerId', component: EditAnswerComponent , canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'sign_up', component: RegisterComponent },
    { path: 'logout', component: LogoutComponent , canActivate: [AuthGuard]},
    { path: 'liked_posts', component: LikedPostsComponent , canActivate: [AuthGuard]},
];
