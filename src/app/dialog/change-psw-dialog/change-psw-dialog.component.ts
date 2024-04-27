import { Component } from '@angular/core';
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpRequestService} from "../../service/httpRequest.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-change-psw-dialog',
  templateUrl: './change-psw-dialog.component.html',
  styleUrl: './change-psw-dialog.component.css'
})
export class ChangePswDialogComponent {
  hide  = true;
  hide2 = true;
  password = new FormControl('', [Validators.required]);
  passwordNew = new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#_\\.])[A-Za-z\\d@#_\\.]*$'), Validators.minLength(8)]);
  passwordConfirm = new FormControl('', [Validators.required]);
  errorMessagePassword = '';
  errorMessagePasswordNew = '';
  errorMessagePasswordConfirm = '';

  constructor(private router:Router, private http :HttpRequestService, private snackBar:MatSnackBar, public dialog:MatDialog) {
    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessagePassword());

    merge(this.passwordNew.statusChanges, this.passwordNew.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessagePassword());

    merge(this.passwordConfirm.statusChanges, this.passwordConfirm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessagePasswordConfirm());
  }

  updateErrorMessagePassword() {
    if (this.password.hasError('required')) {
      this.errorMessagePassword = 'Il campo è obbligatorio';
    } else this.errorMessagePassword = '';
  }

  updateErrorMessagePasswordNew() {
    if (this.passwordNew.hasError('required')) {
      this.errorMessagePasswordNew = 'Il campo è obbligatorio';
    } else if (this.passwordNew.hasError('minlength')) {
      this.errorMessagePasswordNew = 'Lunghezza minima 8 caratteri';
    } else if (this.passwordNew.hasError('pattern')) {
      this.errorMessagePasswordNew = 'Deve contenere 1-@-A-a senza spazi';
    } else {
      this.errorMessagePasswordNew = '';
    }
  }

  updateErrorMessagePasswordConfirm() {
    if (this.passwordConfirm.hasError('required')) {
      this.errorMessagePasswordConfirm = 'Il campo è obbligatorio';
    } else if (this.passwordConfirm.value !== this.passwordNew.value) {
      this.passwordConfirm.setErrors({'invalid': true});
      this.errorMessagePasswordConfirm = 'Le password non corrispondono';
    } else {
      this.errorMessagePasswordConfirm = '';
    }
  }

  abort(){
    this.router.navigate(["student/profile"]).then(()=>{window.location.reload()})
  }

  changePassword(){
    let user = localStorage.getItem("user");
    let psw = this.password.value;
    let psw2 = this.passwordNew.value;
    if(user == null)
      user = '';
    if(psw == null)
      psw = '';
    if(psw2 == null)
      psw2 = '';

    this.http.updatePassword(user,psw, psw2).subscribe({
      next:(response) =>{
        this.openDialog('0ms', '0ms');
      },error:(error)=>{
        this.snackBar.open(error, 'Chiudi', {duration: 2000})
      }
    })
  }

  private openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '60vh',
      data: { message: 'La password è stata cambiata'}
    });
  }

}
