import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {HttpRequestService} from "../../service/httpRequest.service";

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrl: './confirm-delete-dialog.component.css'
})
export class ConfirmDeleteDialogComponent {
  hide = true;
  password = new FormControl('', [Validators.required]);
  errorMessagePassword = '';
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private http:HttpRequestService) {
    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessagePassword());
  }
  updateErrorMessagePassword() {
    if (this.password.hasError('required')) {
      this.errorMessagePassword = 'Il campo è obbligatorio';
    } else this.errorMessagePassword = '';
  }

  onOkClicked(value: any): void {
    let psw = this.password.value;
    if(psw == null)
      psw = '';

    this.http.login(this.data.username, psw).subscribe({
      next:(r)=>{
        this.dialogRef.close(value); // Passa il valore al componente che ha aperto il dialogo
      },error:(err)=>{
        this.dialogRef.close(false); // Passa il valore al componente che ha aperto il dialogo
      }
    })

  }


}
