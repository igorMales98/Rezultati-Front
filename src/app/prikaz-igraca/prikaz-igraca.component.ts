import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FudbalskiKlub} from '../model/fudbalskiKlub';
import {Fudbaler} from '../model/fudbaler';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {PrikazDodatnihInfoFudbaleraComponent} from '../prikaz-dodatnih-info-fudbalera/prikaz-dodatnih-info-fudbalera.component';

@Component({
  selector: 'app-prikaz-igraca',
  templateUrl: './prikaz-igraca.component.html',
  styleUrls: ['./prikaz-igraca.component.scss']
})
export class PrikazIgracaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public klub: FudbalskiKlub, private bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
  }

  prikaziDodatneInfoOIgracu(igrac: Fudbaler) {
    this.bottomSheet.open(PrikazDodatnihInfoFudbaleraComponent, {
      data: igrac
    });
  }
}
