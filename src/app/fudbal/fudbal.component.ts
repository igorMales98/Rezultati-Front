import {Component, OnInit} from '@angular/core';
import {Zemlja} from '../model/zemlja';
import {ZemljaService} from '../services/zemlja.service';
import {Router} from '@angular/router';
import {FudbalskiRezultat} from '../model/fudbalskiRezultat';
import {FudbalskiRezultatService} from '../services/fudbalskiRezultat.service';
import {Liga} from '../model/liga';
import {FormControl} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-fudbal',
  templateUrl: './fudbal.component.html',
  styleUrls: ['./fudbal.component.css']
})
export class FudbalComponent implements OnInit {

  zemlje: Zemlja[] = [];
  fudbalskiRezultati: FudbalskiRezultat[] = [];

  zemljeRezultata: Zemlja[] = [];
  ligeRezultata: Liga[] = [];

  date = new FormControl(new Date());

  constructor(private zemljaService: ZemljaService, private router: Router, private fudbalskiRezultatService: FudbalskiRezultatService) {
  }

  ngOnInit(): void {
    this.zemljaService.getAll().subscribe(zemlje => {
      this.zemlje = zemlje;
    });
    this.fudbalskiRezultatService.getAll().subscribe(rezultati => {
      this.fudbalskiRezultati = rezultati;
      this.srediPrikaz();
    });
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
        if (liga.id === rezultat.domacin.liga.id) {
          ligaExist = true;
          break;
        }
      }
      if (!exist) {
        this.zemljeRezultata.push(rezultat.domacin.zemlja);
      }
      if (!ligaExist) {
        this.ligeRezultata.push(rezultat.domacin.liga);
      }
      exist = false;
      ligaExist = false;
    }
  }

  prikaziLige(zemlja: Zemlja) {
    zemlja.prikazaneLige = zemlja.prikazaneLige !== true;
  }

  dobaviRezultateZaDatum(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
    const date = event.value;
    this.fudbalskiRezultatService.getForTheDate(date).subscribe(rezultati => {
      this.fudbalskiRezultati = rezultati;
      this.srediPrikaz();
    });
  }
}
