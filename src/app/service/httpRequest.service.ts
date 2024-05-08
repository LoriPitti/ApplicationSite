import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, tap} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({providedIn:'root'})
export class HttpRequestService{

  constructor(private http:HttpClient) {
  }

  private getHeader(){
      const authToken = localStorage.getItem("token");
      if(authToken){
        return new HttpHeaders({
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        })
      }else
        return new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        });

  }


  //-------------------------------------------ADMIN-------------------------------------------------------------
  adminLogin(admin:string, password:string){
    const params = new HttpParams()
      .set("admin", admin)
      .set("password", password);
    return this.http.get<any>("http://localhost:8080/admin/login", {params: params, headers: this.getHeader() }).pipe(
      map (r =>{
        return r;
      }),catchError((err: HttpErrorResponse )=> {
        throw new Error(err.error);
      })
    )
  }
  getAdminData(admin:string){
    const params = new HttpParams()
      .set("username", admin);
    return this.http.get<any>("http://localhost:8080/admin/data",{params:params, headers: this.getHeader()}).pipe(
      map(r=>{
        return r;
      }), catchError((err:HttpErrorResponse)=>{
        throw new Error((err.error));
      })
    )
  }

  updateAdminData(admin:string,surname:string, cell:string,  bin:string){
    const params = new HttpParams()
      .set("admin", admin)
      .set("cognome", surname)
      .set("cell", cell)
      .set("bin", bin);
    return this.http.get<any>("http://localhost:8080/admin/data/update",
    {params:params, headers:this.getHeader()}).pipe(
      map(r=>{
        return r;
      }), catchError((err:HttpErrorResponse)=>{
        throw new Error((err.error));
      })
    )
  }
  addNewApplication(dip:string, area:string, nazione:string, uni:string, corso:string,  type:number, lik:string ){
    return this.http.post<any>("http://localhost:8080/admin/application/add", {
      "dip" : dip,
      "area" : area,
      "nazione" : nazione,
      "uni" : uni,
      "url" : lik,
      "type" : type
    }).pipe(
      map(response =>{
        return response;
      }),catchError((err:HttpErrorResponse) =>{
        return err.error;
    })
    )
  }
  //-------------------------------------------USER-------------------------
  signup(user: string | null, email: string | null , name: string | null, surname: string | null, matricola: string | null, password: string | null){

    return this.http.post<string>("http://localhost:8080/signup", {
      'utente' : user,
      'matricola' : matricola,
      'nome' : name,
      'cognome' : surname,
      'email' : email,
      'password' : password
    }, {headers: this.getHeader()}).pipe(
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
    return this.http.get<any>("http://localhost:8080/login", {params: params, headers: this.getHeader() }).pipe(
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
    }, {headers: this.getHeader()}).pipe(
      map(r=>{
        return r;
      }), catchError((err:HttpErrorResponse) =>{
        throw new Error((err.error));
      })
    )
  }

  getUserData(username:string){
    console.log("Called to get data")
    const params = new HttpParams()
      .set("username", username);
    return this.http.get<any>("http://localhost:8080/user/data",{params:params, headers: this.getHeader()}).pipe(
      map(r=>{
        return r;
      }), catchError((err:HttpErrorResponse)=>{
        throw new Error((err.error));
      })
    )
  }

  sendRecoveryMail(email:string){
    const params = new HttpParams()
      .set("email", email);
   return  this.http.get("http://localhost:8080/user/recovery", {params:params, headers: this.getHeader()}).pipe(
      map(r=>{
        return r;
      }),catchError((err:HttpErrorResponse)=>{
        throw new Error((err.error));
    })
    )
  }

  sendConfirmEmail(email:string){
    const params = new HttpParams()
      .set("email", email);
    return  this.http.get("http://localhost:8080/user/confirm/email", {params:params, headers:this.getHeader()}).pipe(
      map(r=>{
        return r;
      }),catchError((err:HttpErrorResponse)=>{
        throw new Error((err.error));
      })
    )
  }

  updateComfirmEmail(user:string, type:number){
    const params = new HttpParams()
      .set("user", user)
      .set("type", type);
    return  this.http.get("http://localhost:8080/user/confirm/email/set", {params:params, headers:this.getHeader()}).pipe(
      map(r=>{
        return r;
      }),catchError((err:HttpErrorResponse)=>{
        throw new Error((err.error));
      })
    )
  }

  updateUserData(user:string, nome:string, cognome:string, email:string, matr:number, bin:string){
    const params = new HttpParams()
      .set("bin", bin);
    return this.http.post<any>("http://localhost:8080/user/data/update", {
      "utente" : user,
      "matricola" : matr,
      "nome" : nome,
      "cognome" : cognome,
      "email" : email,
      "password" : ""
    }, {params:params, headers:this.getHeader()}).pipe(
      map(r=>{
        return r;
      }), catchError((err:HttpErrorResponse)=>{
        throw new Error((err.error));
      })
    )
  }

  deleteUser(user:string){
    const params = new HttpParams()
      .set("user", user);
    return this.http.delete<any>("http://localhost:8080/user/delete", {params:params, headers:this.getHeader()}).pipe(
      map(r=>{
        return r;
      }),catchError((err:HttpErrorResponse) =>{
        throw new Error(err.error);
      })
    )
  }
  verifyToken(user:string, token:string){
    const params = new HttpParams()
      .set("user",user)
      .set("token", token);
    return this.http.get<any>("http://localhost:8080/user/token/verify", {params:params, headers:this.getHeader()}).pipe(
      map(r=>{
        return r;
      }),catchError((err:HttpErrorResponse)=>{
        throw new Error((err.error));
      } )
    )
  }
}
