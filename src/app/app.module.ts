import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';
import { UniversityComponent } from './university/university.component';
import { IndustryComponent } from './industry/industry.component';
import {MatDialogActions, MatDialogContent, MatDialogModule} from "@angular/material/dialog";
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import {MatButton} from "@angular/material/button";
import { HeaderComponent } from './student/header/header.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProfileComponent } from './student/profile/profile.component';
import { PersonalApplicationComponent } from './student/personal-application/personal-application.component';
import { ApplicationCardComponent } from './student/personal-application/application-card/application-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    StudentComponent,
    UniversityComponent,
    IndustryComponent,
    LogoutDialogComponent,
    HeaderComponent,
    RegisterComponent,
    ProfileComponent,
    PersonalApplicationComponent,
    ApplicationCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    IconModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogModule,
    MatButton,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync(),
    IconSetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
