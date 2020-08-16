import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Rezultati-Front';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.navigate(['/fudbal']);
  }

  tabKlik(tab) {
    if (tab.index === 0) {
      this.router.navigate(['/fudbal']);
    } else if (tab.index === 1) {
      this.router.navigate(['/kosarka']);
    } else if (tab.index === 2) {
      this.router.navigate(['/tenis']);
    } else if (tab.index === 3) {
      this.router.navigate(['/odbojka']);
    }
  }

}
