import {Component, OnInit} from '@angular/core';
import {Zemlja} from '../model/zemlja';
import {ZemljaService} from '../services/zemlja.service';
import {Router} from '@angular/router';
import {FudbalskiRezultat} from '../model/fudbalskiRezultat';
import {FudbalskiRezultatService} from '../services/fudbalskiRezultat.service';
import {Liga} from '../model/liga';
import {FormControl} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatDialog} from '@angular/material/dialog';
import {PrikazKlubovaComponent} from '../prikaz-klubova/prikaz-klubova.component';
import {PrikazDodatnihInformacijaComponent} from '../prikaz-dodatnih-informacija/prikaz-dodatnih-informacija.component';

import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import gql from 'graphql-tag';
import {
  ZemljaQL,
  AllZemljaQuery,
  FudbalskiRezultatQL,
  FudbalskiRezulatiQuery, LigaQL
} from '../graphql/gqlModel';
import {AppComponent} from '../app.component';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-fudbal',
  templateUrl: './fudbal.component.html',
  styleUrls: ['./fudbal.component.css']
})
export class FudbalComponent implements OnInit {

  selektovanPrikaz = 0;

  zemlje: Zemlja[] = [];
  zemljeQL: Observable<ZemljaQL[]>;

  fudbalskiRezultati: FudbalskiRezultat[] = [];
  rezultatiQL: Observable<FudbalskiRezultatQL[]>;

  top5Rezultati: FudbalskiRezultat[] = [];

  zemljeRezultata: Zemlja[] = [];
  zemljeRezultataQL: ZemljaQL[] = [];

  ligeRezultata: Liga[] = [];
  ligeRezultataQL: LigaQL[] = [];

  date = new FormControl(new Date());
  selektovaniDatum: Date;

  constructor(private zemljaService: ZemljaService, private router: Router, private fudbalskiRezultatService: FudbalskiRezultatService,
              public dialog: MatDialog, private apollo: Apollo, public appComponent: AppComponent, private datePipe: DatePipe) {
    this.selektovaniDatum = new Date();
  }

  ngOnInit(): void {

    if (this.appComponent.odabran === 1) {
      this.zemljaService.getAll().subscribe(zemlje => {
        this.zemlje = zemlje;
      });
      this.fudbalskiRezultatService.getForTheDate(this.selektovaniDatum).subscribe(rezultati => {
        this.fudbalskiRezultati = rezultati;
        this.srediPrikaz();
      });
    } else {
      this.zemljeQL = this.apollo.watchQuery<AllZemljaQuery>({
        query: gql`
          query allZemlja {
            id
            naziv
            lige {
              id
              naziv
              sport {
                id
              }
            }
          }
        `
      }).valueChanges.pipe(map(result => result.data.allZemlja));
      this.rezultatiQL = this.apollo.watchQuery<FudbalskiRezulatiQuery>({
        query: gql`
          query rezultatiForDate($date: String) {
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
          date: this.datePipe.transform(this.selektovaniDatum, 'yyyyMMddHHmm').toString()
        }
      }).valueChanges.pipe(map(result => result.data.rezultatiForDate));
      this.srediPrikazQL();
    }
  }

  srediPrikaz() {
    let exist = false;
    let ligaExist = false;
    for (const rezultat of this.fudbalskiRezultati) {
      for (const zemlja of this.zemljeRezultata) {
        if (zemlja.id === rezultat.domacin.zemlja.id) {
          exist = true;
          break;
        }
      }
      for (const liga of this.ligeRezultata) {
        if (liga.id === rezultat.liga.id) {
          ligaExist = true;
          break;
        }
      }
      if (!exist) {
        this.zemljeRezultata.push(rezultat.domacin.zemlja);
      }
      if (!ligaExist) {
        this.ligeRezultata.push(rezultat.liga);
      }
      exist = false;
      ligaExist = false;
    }
  }

  srediPrikazQL() {
    let exist = false;
    let ligaExist = false;
    this.rezultatiQL.forEach(rezultati => {
      for (const rezultat of rezultati) {
        for (const zemlja of this.zemljeRezultataQL) {
          if (zemlja.id === rezultat.domacin.zemlja.id) {
            exist = true;
            break;
          }
        }
        for (const liga of this.ligeRezultataQL) {
          if (liga.id === rezultat.liga.id) {
            ligaExist = true;
            break;
          }
        }
        if (!exist) {
          this.zemljeRezultataQL.push(rezultat.domacin.zemlja);
        }
        if (!ligaExist) {
          this.ligeRezultataQL.push(rezultat.liga);
        }
        exist = false;
        ligaExist = false;
      }
    });

  }

  prikaziLige(zemlja: Zemlja | ZemljaQL) {
    zemlja.prikazaneLige = zemlja.prikazaneLige !== true;
  }

  dobaviRezultateZaDatum(event: MatDatepickerInputEvent<Date>) {
    this.selektovanPrikaz = 0;
    if (this.appComponent.odabran === 1) {
      this.zemljeRezultata = [];
      this.ligeRezultata = [];
      console.log(event.value);
      const date = event.value;
      this.fudbalskiRezultatService.getForTheDate(date).subscribe(rezultati => {
        this.fudbalskiRezultati = rezultati;
        this.srediPrikaz();
        if (this.selektovanPrikaz === 1) {
          this.filtrirajTop5();
        }
      });
    } else {
      this.zemljeRezultataQL = [];
      this.ligeRezultataQL = [];
      console.log(event.value);
      const date = event.value;
      this.rezultatiQL = this.apollo.watchQuery<FudbalskiRezulatiQuery>({
        query: gql`
          query rezultatiForDate($date: String) {
            id
            vremeOdrzavanjaUtakmice
            domacin {
              id
              naziv
              zemlja {
                id
                naziv
                lige {
                  id
                  naziv
                }
              }
            }
            gost {
              id
              naziv
            }
            liga {
              id
              naziv
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
          date: this.datePipe.transform(date, 'yyyyMMddHHmm').toString()
        }
      }).valueChanges.pipe(map(result => result.data.rezultatiForDate));
      this.srediPrikazQL();
    }

  }

  tabKlik(tab) {
    this.selektovanPrikaz = tab.index;
    if (tab.index === 0) {
      this.zemljeRezultata = [];
      this.ligeRezultata = [];
      this.ngOnInit();
    } else if (tab.index === 1) {
      this.filtrirajTop5();
    } else if (tab.index === 2) {
      this.zemljeRezultata = [];
      this.ligeRezultata = [];
      this.fudbalskiRezultati = [];
    }
  }

  filtrirajTop5() {
    this.zemljeRezultata = [
      {id: '26', naziv: 'Engleska', lige: [{id: '42', naziv: 'Premier League', sport: {id: '1', naziv: 'Fudbal'}}], prikazaneLige: false},
      {id: '85', naziv: 'Nemačka', lige: [{id: '126', naziv: 'Bundesliga', sport: {id: '1', naziv: 'Fudbal'}}], prikazaneLige: false},
      {id: '32', naziv: 'Francuska', lige: [{id: '188', naziv: 'Ligue 1', sport: {id: '1', naziv: 'Fudbal'}}], prikazaneLige: false},
      {id: '108', naziv: 'Španija', lige: [{id: '163', naziv: 'LaLiga', sport: {id: '1', naziv: 'Fudbal'}}], prikazaneLige: false},
      {id: '47', naziv: 'Italija', lige: [{id: '73', naziv: 'Serie A', sport: {id: '1', naziv: 'Fudbal'}}], prikazaneLige: false},
    ];

    this.ligeRezultata = [
      {id: '42', naziv: 'Premier League', sport: {id: '1', naziv: 'Fudbal'}},
      {id: '126', naziv: 'Bundesliga', sport: {id: '1', naziv: 'Fudbal'}},
      {id: '188', naziv: 'Ligue 1', sport: {id: '1', naziv: 'Fudbal'}},
      {id: '163', naziv: 'LaLiga', sport: {id: '1', naziv: 'Fudbal'}},
      {id: '73', naziv: 'Serie A', sport: {id: '1', naziv: 'Fudbal'}},
    ];

    console.log('treba da prodje');
    console.log(this.fudbalskiRezultati);
    this.top5Rezultati = [];
    for (const rezultat of this.fudbalskiRezultati) {
      console.log('id lige rez je ' + rezultat.liga.id);
      for (const liga of this.ligeRezultata) {
        console.log('id lige  je ' + liga.id);

        // tslint:disable-next-line:triple-equals
        if (liga.id == rezultat.liga.id) {
          console.log('isti su');
          this.top5Rezultati.push(rezultat);
          break;
        }
      }
    }
    this.fudbalskiRezultati = this.top5Rezultati;
    console.log(this.fudbalskiRezultati);
    console.log('proso je');
  }

  prikaziKluboveIzLige(liga: Liga | LigaQL) {
    this.dialog.open(PrikazKlubovaComponent, {
      width: '800px',
      height: '800px',
      data: {liga, odabranRezim: this.appComponent.odabran}
    });
  }

  otvoriDodatniInfo(rezultat: FudbalskiRezultat | FudbalskiRezultatQL) {
    this.dialog.open(PrikazDodatnihInformacijaComponent, {
      width: '600px',
      height: '600px',
      data: rezultat
    });
  }


}
