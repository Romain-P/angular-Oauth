import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';


import { ActivityService } from '../../services/activity/activity.service';
import { UserService } from '../../services/user/user.service';
import { PointageService } from '../../services/pointage/pointage.service';
import { PointageManagerComponent } from './pointageManager.component';

import { User } from '../../models/user';
import { Activity } from '../../models/activity';
import { Week } from '../../models/week';
import { Pointage } from '../../models/pointage';
import { CustomEditorComponent } from './custom-editor.component';

@Component({
  selector: 'pointage',
  templateUrl: './pointage.component.html',
  styleUrls: ['./pointage.component.scss'],
})

export class PointageComponent implements OnInit, OnChanges {
  @Input()
  private parent: Activity;

  @Input()
  private manager: PointageManagerComponent;

  @Input()
  semaineSelectionnee: number;

  @Input()
  anneSelectionne: number ;

  @Input()
  private title: string;
  

  listAct: Activity[] = [];
  user: User;
  iduser: number = 0;
  private source: LocalDataSource;
  listWeeks: Week[] = [];
  listPointages: Pointage[] = [];
  private settings: Object;

  constructor(private serviceActivities: ActivityService,
              private serviceUser: UserService,
              private servicePointage: PointageService) {
    this.source = new LocalDataSource();
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (const propName in changes) {
      if ( propName === 'semaineSelectionnee' || propName === 'anneSelectionne' ) {
        this.loadData(+this.semaineSelectionnee, +this.anneSelectionne);
      }
    }
    
 
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

    this.loadData(this.semaineSelectionnee, this.anneSelectionne);
    // this.source.load(activity);
    // getWeekNumber
  }

  private rowSelected(event: any): void {
    const pointage = event.data as Pointage;
    this.manager.childrenRequested(pointage.activity);
  }

  private loadData(nbr: number, year: number): void {
 
    this.listWeeks = [];
    this.listPointages = [];
    this.source.reset(true);
    this.source.load(this.listPointages);
       if ( nbr > 0 && year > 0) {
         this.serviceUser.getUser(this.iduser).then((c) => {
      this.user = c as User;
      const activities = this.parent ? this.parent.subActivities : this.user.activities;
      this.listAct = this.user.activities;
      this.servicePointage.getWeekNumber(nbr, year).then(
        weeks => {
          activities.forEach(activitie => {
            const pointage = weeks.find(c => c.activity.id === activitie.id) as Pointage;
            const week = new Week();
            if (pointage === undefined) {
              week.existe = false;
              week.pointage = new Pointage();
              week.pointage.activity = activitie;
              week.pointage.user = this.user;
              week.pointage.weekNumber = nbr;
              week.pointage.year = year;
              

            } else {
              week.pointage = pointage;
              week.existe = true;
            }
            this.listWeeks.push(week);
            this.listPointages.push(week.pointage);

          });
          this.source.reset(true);
          this.source.load(this.listPointages);
        });
    });
  }
}

  public loadTableSettings() {
    return {
      hideSubHeader: true,
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

      columns: {
        activity: {
          filter: false,
          title: 'Activité',
          editable: false,
          valuePrepareFunction: (value) => {
            const activity = value as Activity;
            return activity ? activity.name : '';
          },
          editor: {
            type: 'custom',
            component: CustomEditorComponent,
          },
        },
        monday: { filter: false, title: 'Lundi', type: 'text' },
        tuesday: { filter: false, title: 'Mardi', type: 'text' },
        wednesday: { filter: false, title: 'Mercredi', type: 'text' },
        thursday: { filter: false, title: 'Jeudi', type: 'text' },
        friday: { filter: false, title: 'Vendredi', type: 'text' },
        saturday: { filter: false, title: 'Samedi', type: 'text' },
        sunday: { filter: false, title: 'Dimanche', type: 'text' },


      },
    };
  }


  public onCreateConfirm(event): void {
    const activity = event.newData as Activity;


  }

  public onEditConfirm(event): void {
    const pointage = event.newData as Pointage;
    const sem = this.listWeeks.find( x => x.pointage.id === pointage.id 
      || (x.pointage.activity.id === pointage.activity.id && x.pointage.weekNumber === pointage.weekNumber
      && x.pointage.year === pointage.year ));
    if ( sem.existe ) {
      this.servicePointage.saveWeek(pointage).then(
        event.confirm.resolve(event.newData),
      );
    }else {
      pointage.id = 0;
      this.servicePointage.postWeek(pointage).then(
        event.confirm.resolve(event.newData),
      );
    }
  }
}
export class ListElementComponent {
  id: number;
  titre: string;
  constructor( id?: number , titre?: string) {
    this.id = id;
    this.titre = titre;
  }
}
