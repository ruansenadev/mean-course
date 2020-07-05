import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AuthRoutingModule } from "./auth-routing.module";
import { NgMaterialModule } from "../ng-material.module";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    AuthRoutingModule,
    NgMaterialModule,
    CommonModule,
    FormsModule
  ]
})
export class AuthModule {}
