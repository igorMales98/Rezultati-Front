import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Liga} from '../model/liga';
import {FudbalskiKlubService} from '../services/fudbalskiKlub.service';
import {FudbalskiKlub} from '../model/fudbalskiKlub';
import {PrikazIgracaComponent} from '../prikaz-igraca/prikaz-igraca.component';
import {FudbalskiRezultatService} from '../services/fudbalskiRezultat.service';
import {PrikazRezultataKlubaComponent} from '../prikaz-rezultata-kluba/prikaz-rezultata-kluba.component';

@Component({
  selector: 'app-prikaz-klubova',
  templateUrl: './prikaz-klubova.component.html',
  styleUrls: ['./prikaz-klubova.component.css']
})
export class PrikazKlubovaComponent implements OnInit {

  klubovi: FudbalskiKlub[] = [];
  odabran = 11;
  loading = true;

  constructor(@Inject(MAT_DIALOG_DATA) public liga: Liga, private fudbalskiKlubService: FudbalskiKlubService, public dialog: MatDialog,
              private fudbalskiRezultatService: FudbalskiRezultatService) {
  }

  ngOnInit(): void {
    this.fudbalskiKlubService.getKluboviFromLigaAndSezona(this.liga, 11).subscribe(klubovi2 => {
      this.klubovi = klubovi2;

      for (const klub of this.klubovi) {
        this.fudbalskiRezultatService.getPoeniForLigaAndSezonaAndKlub(this.liga.id, 11, klub.id).subscribe(bodovi => {
          klub.bodovi = bodovi;
        });
      }

      setTimeout(() => {
        this.klubovi.sort((a, b) => b.bodovi - a.bodovi);
        this.loading = false;
      }, 1500);

    });
  }

  otvoriInfoOIgracimaITreneru(klub: FudbalskiKlub) {
    this.dialog.open(PrikazIgracaComponent, {
      width: '800px',
      height: '800px',
      data: klub
    });
  }

  dobaviKluboveZaSezonu() {
    this.loading = true;
    this.fudbalskiKlubService.getKluboviFromLigaAndSezona(this.liga, this.odabran).subscribe(klubovi2 => {
      this.klubovi = klubovi2;

      for (const klub of this.klubovi) {
        this.fudbalskiRezultatService.getPoeniForLigaAndSezonaAndKlub(this.liga.id, this.odabran, klub.id).subscribe(bodovi => {
          klub.bodovi = bodovi;
        });
      }

      setTimeout(() => {
        this.klubovi.sort((a, b) => b.bodovi - a.bodovi);
        this.loading = false;
      }, 1500);
    });
  }

  otvoriInfoORezultatima(klub: FudbalskiKlub) {
    let rezultatiKluba;
    this.fudbalskiRezultatService.getRezultatiForKlub(this.liga.id, this.odabran, klub.id).subscribe(data => {
      rezultatiKluba = data;
      this.dialog.open(PrikazRezultataKlubaComponent, {
        width: '800px',
        height: '800px',
        data: rezultatiKluba
      });
    });
  }
}
