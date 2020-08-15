import {Component, OnInit} from '@angular/core';
import {ZemljaService} from './services/zemlja.service';
import {Zemlja} from './model/zemlja';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Rezultati-Front';

  zemlje: Zemlja[] = [];

  constructor(private zemljaService: ZemljaService) {
  }

  ngOnInit(): void {
    this.zemljaService.getAll().subscribe(zemlje => {
      this.zemlje = zemlje;
    });
  }

  prikaziLige(zemlja: Zemlja) {
    zemlja.prikazaneLige = zemlja.prikazaneLige !== true;
  }
}
