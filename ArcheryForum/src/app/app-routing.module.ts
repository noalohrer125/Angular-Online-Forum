import { Routes } from "@angular/router";
import { HomeComponent } from "./content/home/home.component";
import { PostsComponent } from "./content/posts/posts.component";
import { PostComponent } from "./content/posts/post/post.component";
import { MyAccountComponent } from "./content/my-account/my-account.component";

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'posts', component: PostsComponent },
    { path: 'post/:id', component: PostComponent },
    { path: 'my-account', component: MyAccountComponent },
    // Other routes if needed
];
