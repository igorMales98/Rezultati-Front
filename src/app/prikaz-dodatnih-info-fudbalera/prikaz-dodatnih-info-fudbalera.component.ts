import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {Fudbaler} from '../model/fudbaler';

@Component({
  selector: 'app-prikaz-dodatnih-info-fudbalera',
  templateUrl: './prikaz-dodatnih-info-fudbalera.component.html',
  styleUrls: ['./prikaz-dodatnih-info-fudbalera.component.css']
})
export class PrikazDodatnihInfoFudbaleraComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<PrikazDodatnihInfoFudbaleraComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public igrac: Fudbaler) {
  }

  ngOnInit(): void {
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
