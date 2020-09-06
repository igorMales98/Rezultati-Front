import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FudbalskiRezultat} from '../model/fudbalskiRezultat';
import {FudbalskiRezultatQL} from '../graphql/gqlModel';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-prikaz-rezultata-kluba',
  templateUrl: './prikaz-rezultata-kluba.component.html',
  styleUrls: ['./prikaz-rezultata-kluba.component.css']
})
export class PrikazRezultataKlubaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public rezultati: FudbalskiRezultat[] | FudbalskiRezultatQL[]) {
  }

  ngOnInit(): void {
  }

}
