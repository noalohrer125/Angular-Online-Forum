// app-routes.ts
import { Routes } from "@angular/router";
import { HomeComponent } from "./content/home/home.component";
import { MyAccountComponent } from "./content/my-account/my-account.component";
import { PostsComponent } from "./content/posts/posts.component";

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'posts', component: PostsComponent },
    { path: 'my-account', component: MyAccountComponent },
    // Other routes below if needed
];
