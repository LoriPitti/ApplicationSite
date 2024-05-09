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
import {ConfirmEmailComponent} from "./confirm-email/confirm-email.component";
import {confirmEmailGuard} from "./service/guard/auth-guard.guard";
import {AdminComponent} from "./admin/admin.component";
import {NewApplicationComponent} from "./admin/new-application/new-application.component";
import {AddAdminComponent} from "./admin/add-admin/add-admin.component";
import {StorageComponent} from "./admin/storage/storage.component";
import {ModifyApplicationsComponent} from "./admin/modify-applications/modify-applications.component";

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login/:type', component:LoginComponent},
  {path: 'student', component:StudentComponent, children:[
      {path: 'profile', component:ProfileComponent},
      {path:'myapplication', component:PersonalApplicationComponent}
    ]},
  {path: 'university', component:UniversityComponent},
  {path: 'management', component:ManagementComponent},
  {path:'register', component:RegisterComponent},
  {path:'student/confirm/email/:user', component:ConfirmEmailComponent, /*canActivate:[confirmEmailGuard]*/},
  {path: 'admin', component:AdminComponent, children:[
      {path: 'profile', component: ProfileComponent},
      {path: 'newApplication', component: NewApplicationComponent},
      {path: 'addAdmin', component: AddAdminComponent},
      {path: 'storage', component: StorageComponent},
      {path: 'modify', component: ModifyApplicationsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
