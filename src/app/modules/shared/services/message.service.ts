import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(public snackBar: MatSnackBar) {}

  openSnackBar(
    message: string,
    action: string = "X",
    duration: number = 10000
  ) {
    this.snackBar.open(message, action, {
      duration: duration,
      direction: "ltr",
      panelClass: "custom-snak-bar",
    });
  }
}



  

