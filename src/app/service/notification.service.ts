import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService,
    private _snackBar: MatSnackBar) { }
  
  showSuccess(message, title){
      this.toastr.success(message, title)
  }
  
  showError(message, title){
      this.toastr.error(message, title)
  }
  
  showInfo(message, title){
      this.toastr.info(message, title)
  }
  
  showWarning(message, title){
      this.toastr.warning(message, title)
  }
  successAlert(data){
    this._snackBar.open(data,'ok',{
      duration:4000,
      panelClass: ['success-snackbar']
    })
  }

  errorAlert(data){
    this._snackBar.open(data,'ok',{
      duration:4000,
      panelClass: ['error-snackbar']
    })
  }
}
