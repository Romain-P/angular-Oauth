import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { ActivityComponent } from './activity/activity.component';
import { ActivityAssignmentComponent } from './assignment/assignment.component';
import { PointageManagerComponent } from './pointage/pointageManager.component';
import { AuthenticationGuard, LoggedGuard } from '../services/authentication/gard.service';
import { ActivityManagerComponent } from './activity/activityManager.component';
import {RoleAssignmentComponent} from "./roles/role.component";
import {RoleGuard} from "../services/role/rolegard.service";

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
        { path: 'activity', component: ActivityManagerComponent, canActivate: [RoleGuard], data: {roles: ['admin']} },
        { path: 'assignment', component: ActivityAssignmentComponent, canActivate: [RoleGuard], data: {roles: ['admin', 'manager']} },
        { path: 'pointage', component: PointageManagerComponent },
        { path: 'role', component: RoleAssignmentComponent, canActivate: [RoleGuard], data: {roles: ['admin']} },
      ],
    },
  ],
  },
];


export const routing: ModuleWithProviders = RouterModule.forChild(routes);
