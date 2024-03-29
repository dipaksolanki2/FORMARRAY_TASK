import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { loginGuard } from '../shared/guards/auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { notAuthGuard } from '../shared/guards/not-auth.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [notAuthGuard],
    component: LoginComponent
  },
  {
    path:'signup',
    component: SignUpComponent
  },
  {
    path: 'change-password',
    canActivate: [loginGuard],
    component: ChangePasswordComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
