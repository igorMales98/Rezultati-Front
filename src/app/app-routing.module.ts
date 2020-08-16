import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FudbalComponent} from './fudbal/fudbal.component';
import {KosarkaComponent} from './kosarka/kosarka.component';
import {OdbojkaComponent} from './odbojka/odbojka.component';
import {TenisComponent} from './tenis/tenis.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
  {
    path: 'fudbal', component: FudbalComponent
  },
  {
    path: 'kosarka', component: KosarkaComponent
  },
  {
    path: 'odbojka', component: OdbojkaComponent
  },
  {
    path: 'tenis', component: TenisComponent
  },
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
