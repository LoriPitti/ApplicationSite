import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, tap} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({providedIn:'root'})
export class HttpRequestService{
   private httpOptions = {headers: new HttpHeaders({
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    })};
  constructor(private http:HttpClient) {
  }
  signup(user: string | null, email: string | null , name: string | null, surname: string | null, matricola: string | null, password: string | null){


    return this.http.post<string>("http://localhost:8080/signup", {
      'utente' : user,
      'matricola' : matricola,
      'nome' : name,
      'cognome' : surname,
      'email' : email,
      'password' : password
    }, this.httpOptions).pipe(
      map(r=> {
        return r
      }),
      catchError((error:HttpErrorResponse) =>{
        throw new Error (error.error)
      })
    )
  }

  login(user:string, password:string){
    const params = new HttpParams()
      .set("username", user)
      .set("password", password);
    return this.http.get<string>("http://localhost:8080/login", {params: params, headers:new HttpHeaders({
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      }) }).pipe(
      map (r =>{
        return r;
      }),catchError((err: HttpErrorResponse )=> {
        throw new Error(err.error);
      })
    )
  }

  updatePassword(user:string, password:string, passwordNew:string){
    return this.http.post<string>("http://localhost:8080/user/update/password", {
      "user" : user,
      "password" : password,
      "passwordNew" : passwordNew
    }).pipe(
      map(r=>{
        return r;
      }), catchError((err:HttpErrorResponse) =>{
        throw new Error((err.error));
      })
    )
  }

  sendRecoveryMail(email:string){
    const params = new HttpParams()
      .set("email", email);
   return  this.http.get("http://localhost:8080/user/recovery", {params:params}).pipe(
      map(r=>{
        return r;
      }),catchError((err:HttpErrorResponse)=>{
        throw new Error((err.error));
    })
    )
  }
}
