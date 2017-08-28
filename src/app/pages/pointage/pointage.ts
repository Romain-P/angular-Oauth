import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { ListElementComponent } from './list.component';


import { ActivitiesService } from '../../services/activities/activities.service';
import { UserService } from '../../services/activitiesUser/user.service';
import { PointageService } from '../../services/pointage/pointage.service';

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
    private loadData(nbr: number, year: number): void {
    this.serviceUser.getUser(this.iduser).then((c) => {
      this.user = c as User;
      this.user.activities.forEach( acttivitie => {
 /*  this.servicePointage.getWeekNumber(nbr, year).then(
            weeks => {
           let pointage = weeks.find(c => c.activity.id === acttivitie.id) as Pointage; 
           let week = new Week();
           if (pointage !== null) {
             week.existe = false;
             week.pointage = new Pointage();
             week.pointage.activity = acttivitie;
             week.pointage.user = this.user;
             week.pointage.weekNumber = nbr;
             week.pointage.year = year;
 
         }else {
             week.pointage = pointage;
             week.existe = true;
         }
         this.listWeeks.push(week);
         this.listPointages.push(week.pointage);        
            },
   );  */
   let week = new Week();
   week.existe = false;
   week.pointage = new Pointage();
   week.pointage.activity = acttivitie;
   week.pointage.user = this.user;
   week.pointage.weekNumber = nbr;
   week.pointage.year = year;
   this.listWeeks.push(week);
   this.listPointages.push(week.pointage);      
 
      
       });
       
      this.source.load(this.listPointages);
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
                 title: 'Activité',
                 editable: false,
                 type: Activity,
                 valuePrepareFunction: (value) => {
                  let activity = value as Activity;
                  return activity ? activity.name : '';
                },
                 editor: {
                  type: Activity,
              
                   },
            },
               monday: { title: 'Lundi', type: 'string' },
               tuesday: { title: 'Mardi', type: 'string' },
               wednesday: { title: 'Mercredi', type: 'string' },
               thursday: { title: 'Jeudi', type: 'string' },
               friday: { title: 'Vendredi', type: 'string' },
               saturday: { title: 'Samedi', type: 'string' },
               sunday: { title: 'Dimanche', type: 'string' },
             
            },
        };
      }
      public onCreateConfirm(event): void {
        let activity = event.newData as Activity;
       
    
      }
    
      public onEditConfirm(event): void {
        console.log(event);
        let activity = event.newData as Activity;
    
      }
  
}
