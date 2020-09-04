import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FudbalskiKlubService} from '../services/fudbalskiKlub.service';
import {FudbalskiKlub} from '../model/fudbalskiKlub';
import {PrikazIgracaComponent} from '../prikaz-igraca/prikaz-igraca.component';
import {FudbalskiRezultatService} from '../services/fudbalskiRezultat.service';
import {PrikazRezultataKlubaComponent} from '../prikaz-rezultata-kluba/prikaz-rezultata-kluba.component';
import {
  BodoviKlubQuery,
  FudbalskiKluboviQuery,
  FudbalskiKlubQL, FudbalskiRezultatQL,
  RezultatiForKlubQuery
} from '../graphql/gqlModel';
import {AppComponent} from '../app.component';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';
import {FudbalskiRezultat} from '../model/fudbalskiRezultat';


@Component({
  selector: 'app-prikaz-klubova',
  templateUrl: './prikaz-klubova.component.html',
  styleUrls: ['./prikaz-klubova.component.css']
})
export class PrikazKlubovaComponent implements OnInit {

  klubovi: FudbalskiKlub[] = [];
  odabran = 11;
  loading = true;

  kluboviQL: Observable<FudbalskiKlubQL[]>;
  bod: Observable<number> = new Observable<number>();

  rezultatiKlubaQL: Observable<FudbalskiRezultatQL[]>;
  rez: FudbalskiRezultatQL[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fudbalskiKlubService: FudbalskiKlubService,
              public dialog: MatDialog, private fudbalskiRezultatService: FudbalskiRezultatService, public appComponent: AppComponent,
              private apollo: Apollo) {
  }

  ngOnInit(): void {
    console.log('odabtan je ' + this.data.odabranRezim);
    if (this.data.odabranRezim === 1) {
      this.fudbalskiKlubService.getKluboviFromLigaAndSezona(this.data.liga, 11).subscribe(klubovi2 => {
        this.klubovi = klubovi2;

        for (const klub of this.klubovi) {
          this.fudbalskiRezultatService.getPoeniForLigaAndSezonaAndKlub(this.data.liga.id, 11, klub.id).subscribe(bodovi => {
            klub.bodovi = bodovi;
          });
        }

        setTimeout(() => {
          this.klubovi.sort((a, b) => b.bodovi - a.bodovi);
          this.loading = false;
        }, 1500);

      });
    } else {
      this.kluboviQL = this.apollo.watchQuery<FudbalskiKluboviQuery>({
        query: gql`
          query fudbalskiKlubovi($ligaId: String, $sezonaId: String) {
            id
            naziv
            zemlja {
              id
              naziv
            }
            trener {
              id
              ime
              prezime
            }
            fudbaleri {
              id
              ime
              prezime
              pozicija
              zemljaRodjenja {
                naziv
              }
              datumRodjenja
            }
          }
        `,
        variables: {ligaId: this.data.liga.id, sezonaId: '11'}
      }).valueChanges.pipe(map(result => result.data.fudbalskiKlubovi));
      let i = 0;
      this.kluboviQL.forEach(klubovi => {
        for (const klub of klubovi) {
          this.bod[i] = this.apollo.watchQuery<BodoviKlubQuery>({
            query: gql`
              query bodovi($ligaId: String, $sezonaId: String, $klubId: String) {bodovi}
            `,
            variables: {ligaId: this.data.liga.id, sezonaId: '11', klubId: klub.id}
          }).valueChanges.pipe(map(result => klub.bodovi = result.data.bodovi));
          i++;
        }
      });
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    }
  }

  otvoriInfoOIgracimaITreneru(klub: FudbalskiKlub | FudbalskiKlubQL) {
    this.dialog.open(PrikazIgracaComponent, {
      width: '800px',
      height: '800px',
      data: klub
    });
  }

  dobaviKluboveZaSezonu() {
    this.loading = true;
    if (this.data.odabranRezim === 1) {
      this.fudbalskiKlubService.getKluboviFromLigaAndSezona(this.data.liga, this.odabran).subscribe(klubovi2 => {
        this.klubovi = klubovi2;

        for (const klub of this.klubovi) {
          this.fudbalskiRezultatService.getPoeniForLigaAndSezonaAndKlub(this.data.liga.id, this.odabran, klub.id).subscribe(bodovi => {
            klub.bodovi = bodovi;
          });
        }

        setTimeout(() => {
          this.klubovi.sort((a, b) => b.bodovi - a.bodovi);
          this.loading = false;
        }, 1500);
      });
    } else {
      this.kluboviQL = this.apollo.watchQuery<FudbalskiKluboviQuery>({
        query: gql`
          query fudbalskiKlubovi($ligaId: String, $sezonaId: String) {
            id
            naziv
            zemlja {
              id
              naziv
            }
            trener {
              id
              ime
              prezime
            }
            fudbaleri {
              id
              ime
              prezime
              pozicija
              zemljaRodjenja {
                naziv
              }
              datumRodjenja
            }
          }
        `,
        variables: {ligaId: this.data.liga.id, sezonaId: this.odabran}
      }).valueChanges.pipe(map(result => result.data.fudbalskiKlubovi));
      let i = 0;
      this.kluboviQL.forEach(klubovi => {
        for (const klub of klubovi) {
          this.bod[i] = this.apollo.watchQuery<BodoviKlubQuery>({
            query: gql`
              query bodovi($ligaId: String, $sezonaId: String, $klubId: String) {bodovi}
            `,
            variables: {ligaId: this.data.liga.id, sezonaId: this.odabran, klubId: klub.id}
          }).valueChanges.pipe(map(result => klub.bodovi = result.data.bodovi));
          i++;
        }
      });
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    }

  }

  otvoriInfoORezultatima(klub: FudbalskiKlub | FudbalskiKlubQL) {
    let rezultatiKluba;
    if (this.data.odabranRezim === 1) {
      this.fudbalskiRezultatService.getRezultatiForKlub(this.data.liga.id, this.odabran, klub.id).subscribe(data => {
        rezultatiKluba = data;
        this.dialog.open(PrikazRezultataKlubaComponent, {
          width: '800px',
          height: '800px',
          data: rezultatiKluba
        });
      });
    } else {
      this.rezultatiKlubaQL = this.apollo.watchQuery<RezultatiForKlubQuery>({
        query: gql`
          query rezultatiForKlub($ligaId: String, $sezonaId: String, $klubId: String) {
            id
            vremeOdrzavanjaUtakmice
            domacin {
              id
              naziv
            }
            gost {
              id
              naziv
            }
            liga {
              id
            }
            goloviDomacin
            goloviGost
            informacija {
              id
              posedDomacin
              posedGost
              suteviDomacin
              suteviGost
              brojZutihKartonaDomacin
              brojZutihKartonaGost
              brojCrvenihKartonaDomacin
              brojCrvenihKartonaGost
            }
          }
        `,
        variables: {
          ligaId: this.data.liga.id, sezonaId: this.odabran, klubId: klub.id
        }
      }).valueChanges.pipe(map(result => this.rez = result.data.rezultatiForKlub));
      // console.log(this.rez[0]);
      setTimeout(() => {
        this.dialog.open(PrikazRezultataKlubaComponent, {
          width: '800px',
          height: '800px',
          data: this.rez
        });
      }, 500);
    }
  }
}
