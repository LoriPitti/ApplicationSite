import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {HttpRequestService} from "../../service/httpRequest.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-application',
  templateUrl: './new-application.component.html',
  styleUrl: './new-application.component.css'
})
export class NewApplicationComponent implements OnInit{
  dipartimento:string[] = [];
  area:string[] = [];
  nazione:string[] = [];
  nomeDipartimento = new FormControl('', [Validators.required]);
  nomeUniversita = new FormControl('', [Validators.required]);
  nomeArea = new FormControl('', [Validators.required]);
  nomeNazione =  new FormControl('', [Validators.required]);
  nomeCorso =  new FormControl('', [Validators.required]);
  link =  new FormControl('', [Validators.required, Validators.pattern('^(http(s)?://)?[\\w.-]+\\.([a-zA-Z]{2,4})[/\\w.-]*$')]);
  errorMessageNomeDip = '';
  errorMessageLink = '';
  errorMessageNomeUni = '';
  errorMessageNomeArea = '';
  errorMessageNomeCorso = '';
  errorMessageNomeNazione = '';
  isDropDownDipDisabled = true;
  isDropDownAreaDisabled = true;
  isDropDownNazDisabled = true;
  isDropDownUniDisabled = false;
  isDropDownCorsoDisabled = false;
  type = 0; //0 bechelor


  constructor(private http:HttpRequestService, private snackBar:MatSnackBar, private router:Router) {
    merge(this.nomeDipartimento.statusChanges, this.nomeDipartimento.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageDipartimento());

    merge(this.nomeUniversita.statusChanges, this.nomeUniversita.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageUni());


    merge(this.nomeArea.statusChanges, this.nomeArea.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageArea());


    merge(this.nomeNazione.statusChanges, this.nomeNazione.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageNazione());

    merge(this.nomeCorso.statusChanges, this.nomeCorso.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageCorso());

    merge(this.link.statusChanges, this.link.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageLink());
  }
  ngOnInit() {
    this.dipartimento.push('dip1');
    this.dipartimento.push('dip2');
    this.dipartimento.push('dip3');
    this.nomeDipartimento.disable();
  }

  updateErrorMessageDipartimento(){
    if (this.nomeDipartimento.hasError('required')) {
      this.errorMessageNomeDip = 'Il campo è obbligatorio';
    } else this.errorMessageNomeDip = '';
  }

  updateErrorMessageUni(){
    if (this.nomeUniversita.hasError('required')) {
      this.errorMessageNomeUni = 'Il campo è obbligatorio';
    } else this.errorMessageNomeUni = '';
  }

  updateErrorMessageArea(){
    if (this.nomeArea.hasError('required')) {
      this.errorMessageNomeArea = 'Il campo è obbligatorio';
    } else this.errorMessageNomeArea = '';
  }

  updateErrorMessageNazione(){
    if (this.nomeNazione.hasError('required')) {
      this.errorMessageNomeNazione = 'Il campo è obbligatorio';
    } else this.errorMessageNomeNazione = '';
  }

  updateErrorMessageCorso(){
    if (this.nomeCorso.hasError('required')) {
      this.errorMessageNomeCorso = 'Il campo è obbligatorio';
    } else this.errorMessageNomeCorso = '';
  }

  updateErrorMessageLink(){
    if (this.link.hasError('required')) {
      this.errorMessageLink = 'Il campo è obbligatorio';
    } else if(this.link.hasError('pattern')){
      this.errorMessageLink = 'Inserisci un url valido (https://..)';
    } else
      this.errorMessageLink = '';
  }
  enableDropDown(val: string) {
    switch (val){
      case 'dip':
        this.nomeDipartimento.disable();
        this.isDropDownDipDisabled = false;
        break;
      case 'area':
        this.nomeArea.disable();
        this.isDropDownAreaDisabled = false;
        break;
      case 'naz':
        this.nomeNazione.disable();
        this.isDropDownNazDisabled = false;
        break;
      case 'uni':
        this.nomeUniversita.disable();
        this.isDropDownUniDisabled = false;
        break;
      case 'corso':
        break;
    }
  }
  enableInput(val: string) {
    switch (val){
      case 'dip':
       this.nomeDipartimento.enable();
        this.isDropDownDipDisabled = true;
        break;
      case 'area':
        this.nomeArea.enable();
        this.isDropDownAreaDisabled = true;
        break;
      case 'naz':
        this.nomeNazione.enable();
        this.isDropDownNazDisabled = true;
        break;
      case 'uni':
        this.nomeUniversita.enable();
        this.isDropDownUniDisabled = true;
        break;
      case 'corso':
        break;
    }
  }

  setType(type: number){
    this.type = type;
  }

  insert(){
    let dip = this.nomeDipartimento.value;
    if(dip == null)
      dip = '';
    let area = this.nomeArea.value;
    if(area == null)
      area = '';
    let naz = this.nomeNazione.value;
    if(naz == null)
      naz = '';
    let uni = this.nomeUniversita.value;
    if(uni == null)
      uni = '';
    let corso = this.nomeCorso.value;
    if(corso == null)
      corso = '';
    let link = this.link.value;
    if(link == null)
      link = '';
    this.http.addNewApplication(dip, area, naz, uni, corso, this.type, link).subscribe({
      next:(r) =>{
        this.snackBar.open(r.content, 'Chiudi', {duration: 2000})
        this.router.navigate(["admin/storage"]);
      }, error:(error) =>{
        this.snackBar.open(error, 'Chiudi', {duration: 2000})
      }
    })
  }
}
