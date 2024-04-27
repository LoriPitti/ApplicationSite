import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {HttpRequestService} from "../service/httpRequest.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  hide = true;
  hide2 = true;
  user = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#_\\.])[A-Za-z\\d@#_\\.]*$'), Validators.minLength(8)]);
  password2 = new FormControl('', [Validators.required]);
  matricola = new FormControl('', [Validators.pattern('^[0-9]*$')]);

  errorMessageEmail = '';
  errorMessageName = '';
  errorMessageUser = '';
  errorMessageSurname = '';
  errorMessagePassword = '';
  errorMessagePassword2 = '';
  errorMessageMatricola = '';

  nameInvalid = false;

  constructor(private router: Router, private http: HttpRequestService, private snackBar: MatSnackBar) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageEmail());

    merge(this.name.statusChanges, this.name.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageName());

    merge(this.surname.statusChanges, this.surname.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageSurname());


    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessagePassword());

    merge(this.password2.statusChanges, this.password2.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessagePassword2());

    merge(this.matricola.statusChanges, this.matricola.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageMatricola());

    merge(this.user.statusChanges, this.user.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageUser());

  }

  //------------------------VALIDATIONS INPUT------------------------
  updateErrorMessageEmail() {
    if (this.email.hasError('required')) {
      this.errorMessageEmail = 'Il campo è obbligatorio';
    } else if (this.email.hasError('email')) {
      this.errorMessageEmail = 'Formato mail non valido';
    } else {
      this.errorMessageEmail = '';
    }
  }

  updateErrorMessageUser() {
    if (this.name.hasError('required')) {
      this.errorMessageName = 'Il campo è obbligatorio';
    } else this.errorMessageName = '';
  }

  updateErrorMessageName() {
    if (this.name.hasError('required')) {
      this.errorMessageName = 'Il campo è obbligatorio';
    } else this.errorMessageName = '';
  }

  updateErrorMessageSurname() {
    if (this.surname.hasError('required')) {
      this.errorMessageSurname = 'Il campo è obbligatorio';
    } else this.errorMessageSurname = '';
  }

  updateErrorMessagePassword2() {
    if (this.password2.hasError('required')) {
      this.errorMessagePassword2 = 'Il campo è obbligatorio';
    } else if (this.password2.value !== this.password.value) {
      this.password2.setErrors({'invalid': true});
      this.errorMessagePassword2 = 'Le password non corrispondono';
    } else {
      this.errorMessagePassword2 = '';
    }

  }

  updateErrorMessagePassword() {
    if (this.password.hasError('required')) {
      this.errorMessagePassword = 'Il campo è obbligatorio';
    } else if (this.password.hasError('minlength')) {
      this.errorMessagePassword = 'Lunghezza minima 8 caratteri';
    } else if (this.password.hasError('pattern')) {
      this.errorMessagePassword = 'Deve contenere 1-@-A-a senza spazi';
    } else {
      this.errorMessagePassword = '';
    }
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


  backToHome() {
    this.router.navigate([""]);
  }
  confirm() {
    this.http.signup(this.user.value, this.email.value, this.name.value, this.surname.value, this.matricola.value, this.password.value).subscribe({
      next: (response: any) => {
        if(this.email.value)
          localStorage.setItem('username', this.email.value);
        this.router.navigate(["student"]);
      },
      error: (error) => {
        this.snackBar.open(error, 'Chiudi', {duration: 2000})
      }
    })
  }
}


