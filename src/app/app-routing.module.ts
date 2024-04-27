import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {StudentComponent} from "./student/student.component";
import {UniversityComponent} from "./university/university.component";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./student/profile/profile.component";
import {PersonalApplicationComponent} from "./student/personal-application/personal-application.component";
import {ManagementComponent} from "./management/management.component";

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login/:type', component:LoginComponent},
  {path: 'student', component:StudentComponent, children:[
      {path: 'profile', component:ProfileComponent},
      {path:'myapplication', component:PersonalApplicationComponent}
    ]},
  {path: 'university', component:UniversityComponent},
  {path: 'management', component:ManagementComponent},
  {path:'register', component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
