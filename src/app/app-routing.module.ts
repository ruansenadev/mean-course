import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";

import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { PostListComponent } from "./post/post-list/post-list.component";
import { PostCreateComponent } from "./post/post-create/post-create.component";

const routes: Routes = [
  {path: '', component: PostListComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'new', component: PostCreateComponent, canActivate: [AuthGuard]},
  {path: 'edit/:id', component: PostCreateComponent, canActivate: [AuthGuard]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
