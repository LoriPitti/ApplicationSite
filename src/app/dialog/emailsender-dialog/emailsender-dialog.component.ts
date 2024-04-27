import { Component } from '@angular/core';
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FormControl, Validators} from "@angular/forms";
import {HttpRequestService} from "../../service/httpRequest.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-emailsender-dialog',
  templateUrl: './emailsender-dialog.component.html',
  styleUrl: './emailsender-dialog.component.css'
})
export class EmailsenderDialogComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  errorMessageEmail = '';

  constructor(private http:HttpRequestService, private snackBar:MatSnackBar) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageEmail());
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

  sendEmail() {
    let email = this.email.value;
    if(email == null)
      email = '';
      this.http.sendRecoveryMail(email).subscribe({
        next: (r)=>{
          this.snackBar.open('Controlla la tua mail', 'Chiudi', {duration: 5000})
        },error: (error) => {
          this.snackBar.open(error, 'Chiudi', {duration: 5000})
        }
      })
  }
}
