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
import {PrikazIgracaComponent} from './prikaz-igraca/prikaz-igraca.component';
import {PrikazDodatnihInfoFudbaleraComponent} from './prikaz-dodatnih-info-fudbalera/prikaz-dodatnih-info-fudbalera.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {PrikazRezultataKlubaComponent} from './prikaz-rezultata-kluba/prikaz-rezultata-kluba.component';
import {PrikazDodatnihInformacijaComponent} from './prikaz-dodatnih-informacija/prikaz-dodatnih-informacija.component';

import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

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
    PrikazKlubovaComponent,
    PrikazIgracaComponent,
    PrikazDodatnihInfoFudbaleraComponent,
    PrikazRezultataKlubaComponent,
    PrikazDodatnihInformacijaComponent
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
    MatCardModule,
    MatBottomSheetModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [
    MatDatepickerModule,
    {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({uri: 'http://localhost:8080/graphql'}),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache', // disabling cache for fetch
          errorPolicy: 'ignore'
        },
      },
    });
  }
}
