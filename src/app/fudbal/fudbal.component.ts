import {Component, OnInit} from '@angular/core';
import {Zemlja} from '../model/zemlja';
import {ZemljaService} from '../services/zemlja.service';
import {Router} from '@angular/router';
import {FudbalskiRezultat} from '../model/fudbalskiRezultat';
import {FudbalskiRezultatService} from '../services/fudbalskiRezultat.service';

@Component({
  selector: 'app-fudbal',
  templateUrl: './fudbal.component.html',
  styleUrls: ['./fudbal.component.css']
})
export class FudbalComponent implements OnInit {

  zemlje: Zemlja[] = [];
  fudbalskiRezultati: FudbalskiRezultat[] = [];

  zemljeRezultata: Zemlja[] = [];

  constructor(private zemljaService: ZemljaService, private router: Router, private fudbalskiRezultatService: FudbalskiRezultatService) {
  }

  ngOnInit(): void {
    this.zemljaService.getAll().subscribe(zemlje => {
      this.zemlje = zemlje;
    });
    this.fudbalskiRezultatService.getAll().subscribe(rezultati => {
      this.fudbalskiRezultati = rezultati;

      let exist = false;
      for (const rezultat of this.fudbalskiRezultati) {
        for (const zemlja of this.zemljeRezultata) {
          if (zemlja.id === rezultat.domacin.zemlja.id) {
            exist = true;
            break;
          }
        }
        if (!exist) {
          this.zemljeRezultata.push(rezultat.domacin.zemlja);
        }
      }
    });
  }

  prikaziLige(zemlja: Zemlja) {
    zemlja.prikazaneLige = zemlja.prikazaneLige !== true;
  }

}
