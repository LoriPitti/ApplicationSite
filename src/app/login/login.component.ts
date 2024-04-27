import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {HttpRequestService} from "../service/httpRequest.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {ChangePswDialogComponent} from "../dialog/change-psw-dialog/change-psw-dialog.component";
import {EmailsenderDialogComponent} from "../dialog/emailsender-dialog/emailsender-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements  OnInit{
  hide = true;
  type = '';
  valid = true;
  user = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  errorMessageUser = '';
  errorMessagePassword = '';

  constructor(private route:ActivatedRoute, private  router: Router, private http:HttpRequestService, private snackBar:MatSnackBar,
              private dialog:MatDialog) {
    merge(this.user.statusChanges, this.user.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageUser());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessagePassword());
  }

  ngOnInit(): void {
   let t = localStorage.getItem('type');
   if(t == null){
     this.type  = '';
     console.log("Error: localStorage memory ")
     this.router.navigate([""]);
   }else
     this.type = t;

  }

  updateErrorMessageUser() {
    if (this.user.hasError('required')) {
      this.errorMessageUser = 'Il campo è obbligatorio';
    } else this.errorMessageUser = '';
  }

  updateErrorMessagePassword() {
    if (this.password.hasError('required')) {
      this.errorMessagePassword = 'Il campo è obbligatorio';
    } else this.errorMessagePassword = '';
  }
  backToHome() {
    this.router.navigate([""]);
  }

  login(){
    let path = this.type;
    switch (path){
      case 'student':
        let username = '';
        let psw = '';
        if(this.user.value)
          username = this.user.value;
        if(this.password.value)
          psw = this.password.value;
          this.http.login(username, psw).subscribe({
            next: (response)=>{
              localStorage.setItem("user", username);                    //<-- localstorage
              this.router.navigate(["student"]);
            },error: (error) => {
              this.snackBar.open(error, 'Chiudi', {duration: 2000})
            }
          })
        break;
    }
  }


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(EmailsenderDialogComponent, {
      width: '60vh',
      data: { /* eventuale dato da passare al dialog */ }
    });
  }


}
