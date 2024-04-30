import {Injectable} from "@angular/core";

@Injectable({providedIn:'root'})
 export class UserService{
    private nome:string;
    private cognome:string;
    private matricola:string;
    private email:string;
    private password:string;
    private verify:number;
    constructor() {
      this.nome = '';
      this.cognome = '';
      this.matricola = '';
      this.email = '';
      this.password = '';
      this.verify = 0;
    }
  // Getter e setter per 'nome'
  public getNome(): string {
    return this.nome;
  }
  public setNome(nome: string): void {
    this.nome = nome;
  }

  // Getter e setter per 'cognome'
  public getCognome(): string {
      console.log("cognome: "+this.cognome)
    return this.cognome;
  }
  public setCognome(cognome: string): void {
    this.cognome = cognome;
  }

  // Getter e setter per 'matricola'
  public getMatricola(): string {
    return this.matricola;
  }
  public setMatricola(matricola: string): void {
    this.matricola = matricola;
  }

  // Getter e setter per 'email'
  public getEmail(): string {
    return this.email;
  }
  public setEmail(email: string): void {
    this.email = email;
  }

  // Getter e setter per 'password'
  public getPassword(): string {
    return this.password;
  }
  public setPassword(password: string): void {
    this.password = password;
  }

  // Getter e setter per 'verify'
  public getVerify(): number {
    return this.verify;
  }
  public setVerify(verify: number): void {
    this.verify = verify;
  }

}
