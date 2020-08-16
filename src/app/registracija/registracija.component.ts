import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  predjiNaPrijavu() {
    this.dialog.closeAll();
    const regDialog = this.dialog.open(LoginComponent, {
      width: '550px',
      height: '550px'
    });
  }
}
