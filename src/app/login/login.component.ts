import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RegistracijaComponent} from '../registracija/registracija.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  predjiNaRegistraciju() {
    this.dialog.closeAll();
    const regDialog = this.dialog.open(RegistracijaComponent, {
      width: '650px',
      height: '650px'
    });
  }
}
