import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivityAssignmentComponent } from './pages/assignment/assignment.component';
import { UserService } from './services/user.service';
import { ActivityComponent } from './pages/activity/activity.component';
import { ActivityService } from './services/activity.service';
import { StatService } from './services/stat.service';
import { PointageComponent } from './pages/pointage/pointage.component';
import { PointageService } from './services/pointage.service';
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
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationGuard, LoggedGuard } from './services/authentication-gard.service';
import { HttpService } from './services/http.service';
import { ActivityManagerComponent} from './pages/activity/activityManager.component';
import { PointageManagerComponent } from './pages/pointage/pointageManager.component';
import { CustomEditorComponent } from './pages/pointage/custom-editor.component';
import { CustomWeekEditorComponent } from './pages/pointage/week-editor.component';
import { ButtonRenderComponent } from './pages/pointage/button-render.component';
import {RoleService} from "./services/role.service";
import {RoleAssignmentComponent} from "./pages/roles/role.component";
import {RoleGuard} from "./services/role-gard.service";
import {UtilService} from "app/services/util.service";
import {AssignmentManagerComponent} from "./pages/assignment/assignmentManager.component";
// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState,
  AuthenticationService,
  AuthenticationGuard,
  LoggedGuard,
  HttpService,
  ActivityService,
  UserService,
  PointageService,
  StatService,
  RoleService,
  RoleGuard,
  UtilService
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
    ActivityComponent,
    ActivityAssignmentComponent,
    ActivityManagerComponent,
    PointageComponent,
    PointageManagerComponent,
    CustomEditorComponent,
    CustomWeekEditorComponent,
    ButtonRenderComponent,
    RoleAssignmentComponent,
    AssignmentManagerComponent
  ],
  entryComponents: [
    CustomEditorComponent,
    CustomWeekEditorComponent,
    ButtonRenderComponent,
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
