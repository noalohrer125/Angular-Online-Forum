import { Routes } from "@angular/router";
import { HomeComponent } from "./content/home/home.component";
import { MyAccountComponent } from "./content/my-account/my-account.component";
import { PostsComponent } from "./content/posts/posts.component";
import { PostDetailsComponent } from "./content/posts/post-details/post-details.component";
import { NewPostComponent } from "./content/posts/new-post/new-post.component";
import { NewTopicComponent } from "./content/posts/new-topic/new-topic.component";
import { NewAnswerComponent } from "./content/posts/post-details/answers/new-answer/new-answer.component";
import { EditPostComponent } from "./content/posts/edit-post/edit-post.component";
import { EditAnswerComponent } from "./content/posts/post-details/answers/edit-answer/edit-answer.component";
import { LoginComponent } from "./user-handling/login/login.component";
import { RegisterComponent } from "./user-handling/register/register.component";

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'posts', component: PostsComponent },
    { path: 'my-account', component: MyAccountComponent },
    { path: 'post-details/:postId', component: PostDetailsComponent},
    { path: 'new-post', component: NewPostComponent},
    { path: 'edit-post/:CurrentPostId', component: EditPostComponent},
    { path: 'new-topic', component: NewTopicComponent},
    { path: 'new-answer', component: NewAnswerComponent},
    { path: 'edit-answer/:CurrentAnswerId', component: EditAnswerComponent},
    { path: 'login', component: LoginComponent},
    { path: 'sign_up', component: RegisterComponent},
];
