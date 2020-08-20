import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {HttpClientModule} from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MAT_RIPPLE_GLOBAL_OPTIONS, MatNativeDateModule, RippleGlobalOptions} from '@angular/material/core';
import {FudbalComponent} from './fudbal/fudbal.component';
import {KosarkaComponent} from './kosarka/kosarka.component';
import {OdbojkaComponent} from './odbojka/odbojka.component';
import {TenisComponent} from './tenis/tenis.component';
import {LoginComponent} from './login/login.component';
import {RegistracijaComponent} from './registracija/registracija.component';
import {PrikazKlubovaComponent} from './prikaz-klubova/prikaz-klubova.component';
import {MatCardModule} from '@angular/material/card';

const globalRippleConfig: RippleGlobalOptions = {
  disabled: false,
  animation: {
    enterDuration: 500,
    exitDuration: 0
  }
};

@NgModule({
  declarations: [
    AppComponent,
    FudbalComponent,
    KosarkaComponent,
    OdbojkaComponent,
    TenisComponent,
    LoginComponent,
    RegistracijaComponent,
    PrikazKlubovaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    MatDatepickerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  providers: [
    MatDatepickerModule,
    {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
