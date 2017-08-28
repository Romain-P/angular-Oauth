import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { ListElementComponent } from './list.component';


import { ActivitiesService } from '../../services/activities/activities.service';
import { UserService } from '../../services/activitiesUser/user.service';
import { PointageService } from '../../services/pointage/pointage.service';
import { PointageManagerComponent } from './pointageManager';

import { User } from '../../models/user';
import { Activity } from '../../models/activity';
import { Week } from '../../models/week';
import { Pointage } from '../../models/pointage';

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

    listSemaine: ListElementComponent[] = [];
    semaienSelectionnee: object;
    listAnnee: ListElementComponent[]= [];
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

 datedeb = '';
 datefin = '';
     ngOnInit() {
         // setting select data
        this.listAnnee.push(new ListElementComponent( 0 , `----Année----` ) );    
        for (let _i = 2017 ; _i < 2018; _i++) {
             this.listAnnee.push(new ListElementComponent( _i , `${_i}` ) );    
        }

        this.listSemaine.push(new ListElementComponent( 0 , `----Semaine----` ) );    
        for (let _i = 1 ; _i < 53; _i++) {
      
            this.listSemaine.push(new ListElementComponent( _i , `${_i}- du  ${this.datedeb} au ${this.datefin}` ) );
        }

        // setting table datasource
        this.iduser = +localStorage.getItem('userId') || 0;
  
        this.settings = this.loadTableSettings();
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
      let activities = this.parent ? this.parent.subActivities : this.user.activities;
    
      this.servicePointage.getWeekNumber(nbr, year).then(
            weeks => {  
            activities.forEach( activitie => {
           let pointage = weeks.find(c => c.activity.id === activitie.id) as Pointage; 
           let week = new Week();
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
                 editor: {
              
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
