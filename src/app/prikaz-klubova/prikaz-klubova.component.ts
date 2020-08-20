import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Liga} from '../model/liga';
import {FudbalskiKlubService} from '../services/fudbalskiKlub.service';
import {FudbalskiKlub} from '../model/fudbalskiKlub';
import {PrikazIgracaComponent} from '../prikaz-igraca/prikaz-igraca.component';

@Component({
  selector: 'app-prikaz-klubova',
  templateUrl: './prikaz-klubova.component.html',
  styleUrls: ['./prikaz-klubova.component.css']
})
export class PrikazKlubovaComponent implements OnInit {

  klubovi: FudbalskiKlub[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public liga: Liga, private fudbalskiKlubService: FudbalskiKlubService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.fudbalskiKlubService.getKluboviFromLiga(this.liga).subscribe(klubovi2 => {
      this.klubovi = klubovi2;
    });
  }

  otvoriInfoOIgracimaITreneru(klub: FudbalskiKlub) {
    this.dialog.open(PrikazIgracaComponent, {
      width: '800px',
      height: '800px',
      data: klub
    });
  }
}
