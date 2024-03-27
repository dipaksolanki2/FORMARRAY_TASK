import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolFormComponent } from './school-form/school-form.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { loginGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'school',
    canActivate: [loginGuard],
    component: SchoolFormComponent
  },
  {
    path: '',
    redirectTo: 'school',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
