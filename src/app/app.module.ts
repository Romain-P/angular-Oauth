import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivitiesUserComponent } from './pages/activitiesUser/activitiesUser';
import { ActivitiesUserService } from './services/activitiesuser/activitiesuser.service';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { ActivitiesService } from './services/activities/activities.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing';

// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthenticationGuard, LoggedGuard } from './services/authentication/gard.service';
import { HttpService } from './services/http/http.service';

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState,
  AuthenticationService,
  AuthenticationGuard,
  LoggedGuard,
  HttpService,
  ActivitiesService,
  ActivitiesUserService,
];

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void,
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App,
    ActivitiesComponent,
    ActivitiesUserComponent,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NgaModule.forRoot(),
    NgbModule.forRoot(),
    PagesModule,
    routing,
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
  ],
})

export class AppModule {

  constructor(public appState: AppState) {
  }
}
