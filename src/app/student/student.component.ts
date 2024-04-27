import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LogoutDialogComponent} from "../dialog/logout-dialog/logout-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {relative} from "@angular/compiler-cli";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit{

  title = '';
  user = '';


  constructor(public dialog:MatDialog, private router:Router, private route:ActivatedRoute) {
  }
  ngOnInit(): void {
    let  user = localStorage.getItem("user");
    console.log(user)
    if(user == null)
      this.user = '';
    else
      this.user = user;

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
    }
      this.router.navigate([component], {relativeTo: this.route})
    }


}
