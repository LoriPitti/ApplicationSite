import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements  OnInit{
  hide = true;
  userError: string = 'Error';
  pswError: string = 'Error';
  type = '';
  valid = true;

  constructor(private route:ActivatedRoute, private  router: Router) {
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
  backToHome() {
    this.router.navigate([""]);
  }

  login(){
    let path = this.type;
    localStorage.setItem("isLogged", "true");
    this.router.navigate([path])

  }
}
