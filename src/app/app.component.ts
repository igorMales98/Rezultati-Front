import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from './login/login.component';
import {RegistracijaComponent} from './registracija/registracija.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Rezultati-Front';
  public odabran = 1;

  constructor(private router: Router, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.router.navigate(['/kosarka'], {skipLocationChange: true}).then(() => {
      this.router.navigate(['/fudbal']);
    });
  }

  tabKlik(tab) {
    if (tab.index === 0) {
      this.router.navigate(['/fudbal']);
    } else if (tab.index === 1) {
      this.router.navigate(['/kosarka']);
    } else if (tab.index === 2) {
      this.router.navigate(['/tenis']);
    } else if (tab.index === 3) {
      this.router.navigate(['/odbojka']);
    }
  }

  otvoriPrijavu() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '550px',
      height: '550px'
    });
  }

  otvoriRegistraciju() {
    const dialogRef = this.dialog.open(RegistracijaComponent, {
      width: '650px',
      height: '650px'
    });
  }

  principPromenjen() {
    console.log(this.odabran);
    this.ngOnInit();
  }
}
