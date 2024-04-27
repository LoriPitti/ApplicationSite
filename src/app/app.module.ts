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
import {MatDialogActions, MatDialogContent, MatDialogModule} from "@angular/material/dialog";
import { LogoutDialogComponent } from './dialog/logout-dialog/logout-dialog.component';
import {MatButton} from "@angular/material/button";
import { HeaderComponent } from './student/header/header.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProfileComponent } from './student/profile/profile.component';
import { PersonalApplicationComponent } from './student/personal-application/personal-application.component';
import { ApplicationCardComponent } from './student/personal-application/application-card/application-card.component';
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ManagementComponent } from './management/management.component';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import { ChangePswDialogComponent } from './dialog/change-psw-dialog/change-psw-dialog.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    StudentComponent,
    UniversityComponent,
    LogoutDialogComponent,
    HeaderComponent,
    RegisterComponent,
    ProfileComponent,
    PersonalApplicationComponent,
    ApplicationCardComponent,
    ManagementComponent,
    ChangePswDialogComponent,
    ConfirmDialogComponent
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
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCard,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCardActions,
    MatCardContent
  ],
  providers: [
    provideAnimationsAsync(),
    IconSetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
