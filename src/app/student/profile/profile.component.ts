import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {LogoutDialogComponent} from "../../dialog/logout-dialog/logout-dialog.component";
import {ChangePswDialogComponent} from "../../dialog/change-psw-dialog/change-psw-dialog.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  cognome: string = 'Pittiglio';
  nome: string = 'Lorenzo'
  disabled = false;
  mail = 'mail@mail.com'
  matr = '885893'
  modifyEnabled = false;
  isSaveDisabled = true;
  hide = true;
  name = new FormControl(this.nome,[Validators.required]);
  surname = new FormControl(this.cognome,[Validators.required]);
  password = new FormControl('', );
  email = new FormControl(this.mail, [Validators.required, Validators.email]);
  matricola = new FormControl('', [Validators.pattern('^[0-9]*$')]);
  errorMessageSurname ='';
  errorMessageName = '';
  errorMessageEmail = '';
  errorMessageMatricola = '';

  constructor(private router:Router, public dialog:MatDialog) {
    merge(this.name.statusChanges, this.name.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageName());

    merge(this.surname.statusChanges, this.surname.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageSurname());

    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageEmail());

    merge(this.matricola.statusChanges, this.matricola.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageMatricola());
  }

  updateErrorMessageEmail() {
    if (this.email.hasError('required')) {
      this.errorMessageEmail = 'Il campo è obbligatorio';
    } else if (this.email.hasError('email')) {
      this.errorMessageEmail = 'Formato mail non valido';
    } else {
      this.errorMessageEmail = '';
    }
  }

  updateErrorMessageName(){
    if (this.name.hasError('required')) {
      this.errorMessageName = 'Il campo è obbligatorio';
    } else this.errorMessageName = '';
  }
  updateErrorMessageSurname(){
    if (this.surname.hasError('required')) {
      this.errorMessageSurname = 'Il campo è obbligatorio';
    } else this.errorMessageSurname = '';
  }

  updateErrorMessageMatricola() {
    if (this.matricola.hasError('pattern') && this.matricola.value !== '') {
      this.errorMessageMatricola = 'Il campo deve essere numerico';
    } else if (this.matricola.value === '') {
      this.matricola.setErrors(null); // Rimuovi eventuali errori precedentemente impostati
      this.errorMessageMatricola = '';
    } else {
      this.errorMessageMatricola = '';
    }
  }


  modify(){
    this.modifyEnabled = true;
  }
  abort(){
    console.log("surname "+this.cognome)
    this.modifyEnabled = false;
    this.router.navigate(["student/profile"]).then(()=>{window.location.reload()});
  }

  changePassword(){
      this.openDialog('0ms','0ms');
  }


  saveChanges() {

  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(ChangePswDialogComponent, {
      width: '60vh',
      data: { /* eventuale dato da passare al dialog */ }
    });
  }
}
