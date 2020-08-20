import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FudbalskiKlub} from '../model/fudbalskiKlub';

@Component({
  selector: 'app-prikaz-igraca',
  templateUrl: './prikaz-igraca.component.html',
  styleUrls: ['./prikaz-igraca.component.scss']
})
export class PrikazIgracaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public klub: FudbalskiKlub) {
  }

  ngOnInit(): void {
  }

}
