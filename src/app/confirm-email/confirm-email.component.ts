import {Component, OnInit} from '@angular/core';
import {HttpRequestService} from "../service/httpRequest.service";
import {UserService} from "../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})
export class ConfirmEmailComponent implements OnInit{
  username: string = 'Username';
  email: string = 'email@email.com'

  constructor(private http:HttpRequestService, private router:Router, private userService:UserService, private route:ActivatedRoute, private snackBar:MatSnackBar) {
  }

  ngOnInit(): void {
    let user = this.route.snapshot.paramMap.get('user');
    if(user == null)
      user = '';
    let token = this.route.snapshot.queryParamMap.get('token');
    if(token == null)
      token = '';
    console.log("Token: "+token)
    console.log("Username+"+user)
    this.username = user;
    this.http.verifyToken(user, token).subscribe({
      next:(r)=>{

      }, error:(err)=>{
        localStorage.clear();
        this.router.navigate([""]);
      }
    })

  }

  confirm(){
    this.http.updateComfirmEmail(this.username, 1).subscribe({
      next:(r)=>{
        localStorage.setItem("verified", "1")
        this.router.navigate([""]);
      }, error:(error)=>{
        this.snackBar.open(error, 'Chiudi', {duration: 5000})
      }
    })
  }





}
