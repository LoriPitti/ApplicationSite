import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LogoutDialogComponent} from "../logout-dialog/logout-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {relative} from "@angular/compiler-cli";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {

  title = '';


  constructor(public dialog:MatDialog, private router:Router, private route:ActivatedRoute) {
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
