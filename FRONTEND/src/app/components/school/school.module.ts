import { NgModule } from '@angular/core';

import { SchoolRoutingModule } from './school-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SchoolFormComponent } from './school-form/school-form.component';


@NgModule({
  declarations: [
    SchoolFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SchoolRoutingModule
  ]
})
export class SchoolModule { }
