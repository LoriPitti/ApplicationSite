import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpRequestService} from "../service/httpRequest.service";
import {UserService} from "../service/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LogoutDialogComponent} from "../dialog/logout-dialog/logout-dialog.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{


  title = '';
  admin = '';


  constructor(public dialog:MatDialog, private router:Router, private route:ActivatedRoute, private http:HttpRequestService, private userService:UserService,
              private snackBar:MatSnackBar) {
  }
  ngOnInit(): void {
    let  user = localStorage.getItem("admin");
    console.log(user)
    if(user == null)
      this.admin = '';
    else
      this.admin = user;
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '250px', // Imposta la larghezza del dialog
      data: { /* eventuale dato da passare al dialog */ }
    });
  }

  goTo(component: string) {
    switch (component){
      case 'profile':
        this.title = 'Sezione personale';
        break;
      case 'myapplication':
        this.title = 'Candidature';
        break;
      case 'newApplication':
        this.title = 'Aggiungi una nuova candidatura';
        break;
      case 'addAdmin':
        this.title = 'Aggiungi un nuovo admin';
        break;
      case 'storage':
        this.title = 'Monitora le candidature pubblicate';
        break;
      case 'modify':
        this.title = 'Modifica le candidature';
        break;

    }
    this.router.navigate([component], {relativeTo: this.route})
  }




}
