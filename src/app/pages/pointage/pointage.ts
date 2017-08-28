import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';


import { ActivitiesService } from '../../services/activities/activities.service';
import { UserService } from '../../services/activitiesUser/user.service';
import { PointageService } from '../../services/pointage/pointage.service';
import { PointageManagerComponent } from './pointageManager';

import { User } from '../../models/user';
import { Activity } from '../../models/activity';
import { Week } from '../../models/week';
import { Pointage } from '../../models/pointage';

import { CustomEditorComponent } from './custom-render.component';
@Component({
    selector: 'SaisiePointage',
    templateUrl: './pointage.html',
    styleUrls: ['./pointage.scss'],
})

export class PointageComponent implements OnInit {
  @Input()
  private parent: Activity;

  @Input()
  private manager: PointageManagerComponent;
 
    semaienSelectionnee: object;
  listAct: Activity[]=[];
    user: User;
    anneSelectionne: object;
    iduser: number = 0;
    private source: LocalDataSource;
    listWeeks: Week[]= [];
    listPointages: Pointage[]= [];
    private settings: Object;

    constructor( private serviceActivities: ActivitiesService,
                 private serviceUser: UserService,
                 private servicePointage: PointageService ) {
                      this.source = new LocalDataSource();
                    }


     ngOnInit() {
  

        // setting table datasource
        this.iduser = +localStorage.getItem('userId') || 0;
  
        this.serviceUser.getUser(this.iduser).then((c) => {
          this.user = c as User;
          this.listAct = this.user.activities;
          this.settings = this.loadTableSettings();
        },
        );
        
        this.loadData(28, 2017);
        // this.source.load(activities);
        // getWeekNumber
    }


    private rowSelected(event: any): void {
      const pointage = event.data as Pointage;
      this.manager.childrenRequested(pointage.activity);
    }
  

    private loadData(nbr: number, year: number): void {
    this.serviceUser.getUser(this.iduser).then((c) => {
      this.user = c as User;
      const activities = this.parent ? this.parent.subActivities : this.user.activities;
      this.listAct = this.user.activities;
      this.servicePointage.getWeekNumber(nbr, year).then(
            weeks => {  
            activities.forEach( activitie => {
           const pointage = weeks.find(c => c.activity.id === activitie.id) as Pointage; 
           const week = new Week();
           if (pointage === undefined) {
             week.existe = false;
             week.pointage = new Pointage();
             week.pointage.activity = activitie;
             week.pointage.user = this.user;
             week.pointage.weekNumber = nbr;
             week.pointage.year = year;
 
         }else {
             week.pointage = pointage;
             week.existe = true;
         }
         this.listWeeks.push(week);
         this.listPointages.push(week.pointage);       
         
            });
          this.source.load(this.listPointages);  
          });
        }); 
     
      }

      public loadTableSettings() {
        return {
          mode: external,
        
          actions: {
            add: false,
            delete: false,
          
            },
            edit: {
                editButtonContent: '<i class="ion-edit"></i>',
                saveButtonContent: '<i class="ion-checkmark"></i>',
                cancelButtonContent: '<i class="ion-close"></i>',
                confirmSave: true,
              },
    
          columns:
            {
              activity: { 
                filter: false,
                 title: 'Activité',
                 editable: false,
                 valuePrepareFunction: (value) => {
                  const activity = value as Activity;
                  return activity ? activity.name : '';
                },
                
          },
               monday: { filter: false, title: 'Lundi', type: 'string' },
               tuesday: { filter: false, title: 'Mardi', type: 'string' },
               wednesday: { filter: false, title: 'Mercredi', type: 'string' },
               thursday: { filter: false, title: 'Jeudi', type: 'string' },
               friday: { filter: false, title: 'Vendredi', type: 'string' },
               saturday: { filter: false, title: 'Samedi', type: 'string' },
               sunday: { filter: false, title: 'Dimanche', type: 'string' },
             
            },
        };
      }


      public onCreateConfirm(event): void {
        const activity = event.newData as Activity;
       
    
      }
    
      public onEditConfirm(event): void {
        console.log(event);
        const activity = event.newData as Activity;
    
      }
  
}
