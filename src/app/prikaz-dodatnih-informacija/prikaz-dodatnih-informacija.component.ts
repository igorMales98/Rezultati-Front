import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FudbalskiRezultat} from '../model/fudbalskiRezultat';

@Component({
  selector: 'app-prikaz-dodatnih-informacija',
  templateUrl: './prikaz-dodatnih-informacija.component.html',
  styleUrls: ['./prikaz-dodatnih-informacija.component.css']
})
export class PrikazDodatnihInformacijaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public rezultat: FudbalskiRezultat) {
  }

  ngOnInit(): void {
  }

}
