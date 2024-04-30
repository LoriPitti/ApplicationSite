import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {merge, window} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {LogoutDialogComponent} from "../../dialog/logout-dialog/logout-dialog.component";
import {ChangePswDialogComponent} from "../../dialog/change-psw-dialog/change-psw-dialog.component";
import {HttpRequestService} from "../../service/httpRequest.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {UserService} from "../../service/user.service";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";
import {ConfirmDeleteDialogComponent} from "../../dialog/confirm-delete-dialog/confirm-delete-dialog.component";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  username = '';
  cognome: string = '';
  nome: string = ''
  disabled = false;
  mail = ''
  matr = ''
  verified = 0;
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
  binaryString = '';

  constructor(private router:Router, public dialog:MatDialog, private http:HttpRequestService, private snackBar:MatSnackBar, private userService: UserService){
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

  ngOnInit(): void {
    this.getUserData();
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
    //this.router.navigate(["student/profile"]).then(()=>{window.location.reload});
    location.reload();
  }

  changePassword(){
      this.openDialog('0ms','0ms');
  }

  saveChanges() {
    let bin = '';
    let content = '';
    if (this.name.value != this.nome) {
      content += 'nome ';
      bin +='1';
    }else
      bin += '0';
    if (this.surname.value != this.cognome) {
      content += 'cognome ';
      bin +='1';
    }else
      bin += '0';
    if (this.email.value != this.mail) {
      content += 'email (necessaria verifica in seguito)';
      bin += '1';
    }else
      bin+='0';
    if (this.matricola.value != this.matr) {
      content += 'matricola ';
      bin += '1';
    }else
      bin += '0';
    this.binaryString = bin;
    if (content != '')
      this.openDialogConfirm('2ms', '1ms', content)
    else
      this.snackBar.open('Non stai modificando nessun campo','Chiudi', {duration: 5000})

  } //checking parameters changed to save


  private openDialogConfirm(enterAnimationDuration: string, exitAnimationDuration: string, content:string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '60vh',
      data: { message: 'I seguenti campi stanno per essere modificati: ', content: content, abort: true}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        //checking parameters not null
        let name = this.name.value;
        let surname = this.surname.value;
        let email = this.email.value;
        let matricola = this.matricola.value;
        if(name == null)
          name = '';
        if(surname == null)
          surname = '';
        if(email == null)
          email = '';
        if(matricola == null)
          matricola = '0';
        this.http.updateUserData(this.username, name, surname,email ,parseInt(matricola) , this.binaryString).subscribe({
          next:(result)=>{
            this.snackBar.open("Parametri aggiornati", 'Chiudi', {duration: 5000});
            location.reload();
          },error:(err)=>{
            this.snackBar.open(err, 'Chiudi', {duration: 5000});
          }
        })
      }
    });
  }
  private openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(ChangePswDialogComponent, {
      width: '60vh',
      data: { /* eventuale dato da passare al dialog */ }
    });
  } //dialog to change password

  sendEmail() {
    this.http.sendConfirmEmail(this.mail).subscribe({
      next: (r)=>{
        this.snackBar.open('Controlla la tua mail', 'Chiudi', {duration: 5000})
      },error: (error) => {
        this.snackBar.open(error, 'Chiudi', {duration: 5000})
      }
    })
  } //send email to confirm the address


  getUserData(){
    let user = localStorage.getItem("user");
    if(user == null)
      user = '';
    this.username = user;
    this.http.getUserData(user).subscribe({
      next:(response)=> {
        this.nome=response.nome;
        this.cognome=response.cognome;
        this.mail = response.email
        this.matr = response.matricola;
        this.verified = response.verified;
        localStorage.setItem("verified", this.verified.toString());

        this.name = new FormControl(this.nome,[Validators.required]);
        this.surname = new FormControl(this.cognome,[Validators.required]);
        this.email = new FormControl(this.mail, [Validators.required, Validators.email]);
        this.matricola = new FormControl(this.matr, [Validators.pattern('^[0-9]*$')]);
      },error:(error)=>{
        this.snackBar.open(error, 'Chiudi', {duration: 5000})
      }
    })
  } //contact server to get users parameter

  deleteUserAccount(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '60vh',
      data: { message: 'Attenzione, stai per eliminare l\'account: ', content: 'sei sicuro di volerlo fare? ogni tuo dato andrà perso definitivamente!', abort: true}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
      this.openConfirmDialog();
      }
    });
  }

  openConfirmDialog(){
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '60vh',
      data: {username:this.username}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this.http.deleteUser(this.username).subscribe({
          next:(r)=>{
            localStorage.clear();
            this.router.navigate([""]);
          },error:(err)=>{
            this.snackBar.open(err, 'Chiudi', {duration: 5000});
          }
        })
      }else{
        this.snackBar.open('Password errata', 'Chiudi', {duration:5000});
      }
    });
  }


}
