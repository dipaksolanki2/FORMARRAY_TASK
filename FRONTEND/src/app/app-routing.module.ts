import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'school',
    loadChildren: () => import('./components/school/school.module').then((m) => m.SchoolModule),
  },
  {
    path: '',
    loadChildren: () => import('./components/auth/auth.module').then((m) => m.AuthModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


