import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.css'
})
export class LogoutDialogComponent {
  constructor(private router:Router) {
  }

  logout() {
    localStorage.clear()
    this.router.navigate([""])
  }
}
