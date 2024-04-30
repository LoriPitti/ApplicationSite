import {Component, OnInit} from '@angular/core';
import {HttpRequestService} from "../service/httpRequest.service";
import {UserService} from "../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})
export class ConfirmEmailComponent implements OnInit{
  username: string = 'Username';
  email: string = 'email@email.com'

  constructor(private http:HttpRequestService, private userService:UserService, private route:ActivatedRoute, private snackBar:MatSnackBar) {
  }

  ngOnInit(): void {
    let user = this.route.snapshot.paramMap.get('user');
    if(user == null)
      this.username = 'null'
    else
      this.username = user;

  }

  confirm(){
    this.http.updateComfirmEmail(this.username, 1).subscribe({
      next:(r)=>{
        localStorage.setItem("verified", "1")
      }, error:(error)=>{
        this.snackBar.open(error, 'Chiudi', {duration: 5000})
      }
    })
  }





}
