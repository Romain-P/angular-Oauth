import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivitiesUserComponent } from './activitiesUser/activitiesUser';
import { PointageManagerComponent } from './pointage/pointageManager';
import { AuthenticationGuard, LoggedGuard } from '../services/authentication/gard.service';
import { ActivitiesManagerComponent } from './activities/activitiesManager.component';

// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoggedGuard],
    loadChildren: 'app/pages/login/login.module#LoginModule',
  },
  {
    path: 'pages', canActivate: [AuthenticationGuard], children: [
    {
      path: '',
      component: Pages,
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
        { path: 'activities', component: ActivitiesManagerComponent },
        { path: 'activitiesUser', component: ActivitiesUserComponent },
        { path: 'pointage', component: PointageComponent },
      ],
    },
  ],
  },
];


export const routing: ModuleWithProviders = RouterModule.forChild(routes);
