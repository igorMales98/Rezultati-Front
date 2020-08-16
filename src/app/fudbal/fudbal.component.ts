import {Component, OnInit} from '@angular/core';
import {Zemlja} from '../model/zemlja';
import {ZemljaService} from '../services/zemlja.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-fudbal',
  templateUrl: './fudbal.component.html',
  styleUrls: ['./fudbal.component.css']
})
export class FudbalComponent implements OnInit {

  zemlje: Zemlja[] = [];

  constructor(private zemljaService: ZemljaService, private router: Router) {
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
