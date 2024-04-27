import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router:Router) {
  }

   goToLogin(type:string){
    let param = '';
    switch (type){
      case "student":
        param = 'student';
        break;
      case "university":
        param = 'university';
        break;
      case "management":
        param = 'management';
        break;
      default:
        break;
    }
    localStorage.setItem('type', param);
    this.router.navigate(["login/"+param]);
  }


  register() {
    this.router.navigate(["register"]);
  }
}
