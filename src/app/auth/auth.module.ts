import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { NgMaterialModule } from "../ng-material.module";

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    NgMaterialModule,
    CommonModule,
    FormsModule
  ]
})
export class AuthModule {}
