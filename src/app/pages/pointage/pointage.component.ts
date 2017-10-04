import {Component, Input, OnInit, OnChanges, SimpleChange} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';


import {ActivityService} from '../../services/activity.service';
import {UserService} from '../../services/user.service';
import {PointageService} from '../../services/pointage.service';
import {PointageManagerComponent} from './pointageManager.component';

import {User} from '../../models/user';
import {Activity} from '../../models/activity';
import {Week} from '../../models/week';
import {Pointage} from '../../models/pointage';
import {CustomEditorComponent} from './custom-editor.component';
import {CustomWeekEditorComponent} from './week-editor.component';
import {Absence} from "../../models/absence";
import {isNullOrUndefined} from "util";

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
  anneSelectionne: number;

  @Input()
  private title: string;


  listAct: Activity[] = [];
  user: User;
  iduser: number = 0;
  private source: LocalDataSource;
  private sourceDetail: LocalDataSource;
  listWeeks: Week[] = [];
  listPointages: Pointage[] = [];
  listTotal: Pointage[] = [];
  private settings: Object;
  private settingsDetail: Object;

  constructor(private serviceActivities: ActivityService,
              private serviceUser: UserService,
              private servicePointage: PointageService) {
    this.source = new LocalDataSource();
    this.sourceDetail = new LocalDataSource();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    PointageManagerComponent.semaineSelectionneeS = this.semaineSelectionnee;
    PointageManagerComponent.anneSelectionneS = this.anneSelectionne;
    for (const propName in changes) {
      if (propName === 'semaineSelectionnee' || propName === 'anneSelectionne') {
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
        this.settingsDetail = this.loadTableTotalSettings();
      },
    );


    PointageManagerComponent.semaineSelectionneeS = this.semaineSelectionnee;
    PointageManagerComponent.anneSelectionneS = this.anneSelectionne;
    this.loadData(this.semaineSelectionnee, this.anneSelectionne);
  }

  private rowSelected(event: any): void {
    const pointage = event.data as Pointage;
    this.manager.childrenRequested(pointage.activity);

  }

  private loadData(nbr: number, year: number): void {
    this.listTotal = [];
    this.listWeeks = [];
    this.listPointages = [];
    this.source.reset(true);
    this.source.load(this.listPointages);
    if (nbr > 0 && year > 0) {
      this.serviceUser.getUser(this.iduser).then((c) => {
        this.user = c as User;
        const activities = this.parent ? this.parent.subActivities : this.user.activities;
        this.listAct = this.user.activities;
        this.servicePointage.getWeekNumber(nbr, year).then(
          weeks => {
            activities.forEach(activitie => {
              const pointage = weeks.find(x => x.activity.id === activitie.id) as Pointage;
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
            const weektoadd = new Pointage();
            weektoadd.monday = 0;
            weektoadd.tuesday = 0;
            weektoadd.thursday = 0;
            weektoadd.wednesday = 0;
            weektoadd.friday = 0;
            weektoadd.sunday = 0;
            weektoadd.saturday = 0;
            weektoadd.activity = new Activity();
            weektoadd.activity.name = 'Total des saisies    ';
            weeks.forEach(
              wk => {
                weektoadd.monday = wk.monday + weektoadd.monday;
                weektoadd.tuesday = wk.tuesday + weektoadd.tuesday;
                weektoadd.thursday = wk.thursday + weektoadd.thursday;
                weektoadd.wednesday = wk.wednesday + weektoadd.wednesday;
                weektoadd.friday = wk.friday + weektoadd.friday;
                weektoadd.sunday = wk.sunday + weektoadd.sunday;
                weektoadd.saturday = wk.saturday + weektoadd.saturday;
              });
            this.listTotal.push(weektoadd);
            this.sourceDetail.reset(true);
            this.sourceDetail.load(this.listTotal);
          },
        );
      });
    }
  }

  private loadDatatotal(nbr: number, year: number): void {
    this.listTotal = [];
    this.sourceDetail.reset(true);
    this.sourceDetail.load(this.listTotal);
    if (nbr > 0 && year > 0) {
      this.servicePointage.getWeekNumber(nbr, year).then(
        weeks => {
          const weektoadd = new Pointage();
          weektoadd.monday = 0;
          weektoadd.tuesday = 0;
          weektoadd.thursday = 0;
          weektoadd.wednesday = 0;
          weektoadd.friday = 0;
          weektoadd.sunday = 0;
          weektoadd.saturday = 0;
          weektoadd.activity = new Activity();
          weektoadd.activity.name = 'Total des saisies    ';
          weeks.forEach(
            wk => {
              weektoadd.monday = wk.monday + weektoadd.monday;
              weektoadd.tuesday = wk.tuesday + weektoadd.tuesday;
              weektoadd.thursday = wk.thursday + weektoadd.thursday;
              weektoadd.wednesday = wk.wednesday + weektoadd.wednesday;
              weektoadd.friday = wk.friday + weektoadd.friday;
              weektoadd.sunday = wk.sunday + weektoadd.sunday;
              weektoadd.saturday = wk.saturday + weektoadd.saturday;
            });
          this.listTotal.push(weektoadd);
          this.sourceDetail.reset(true);
          this.sourceDetail.load(this.listTotal);
        },
      );
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
        monday: {
          filter: false,
          title: 'Lundi',
          type: 'number',
          editor: {
            type: 'custom',
            component: CustomWeekEditorComponent,
          },
          valuePrepareFunction: (value) => {
            let absence = this.isAbsentAndGet(1);
            return isNullOrUndefined(absence) ? value : 'ABS - ' + absence.absence_type
          }
        },
        tuesday: {
          filter: false,
          title: 'Mardi',
          editor: {
            type: 'custom',
            component: CustomWeekEditorComponent,
          },
          valuePrepareFunction: (value) => {
            let absence = this.isAbsentAndGet(2);
            return isNullOrUndefined(absence) ? value : 'ABS - ' + absence.absence_type
          }
        },
        wednesday: {
          filter: false,
          title: 'Mercredi',
          editor: {
            type: 'custom',
            component: CustomWeekEditorComponent,
          },
          valuePrepareFunction: (value) => {
            let absence = this.isAbsentAndGet(3);
            return isNullOrUndefined(absence) ? value : 'ABS - ' + absence.absence_type
          }
        },
        thursday: {
          filter: false,
          title: 'Jeudi',
          editor: {
            type: 'custom',
            component: CustomWeekEditorComponent,
          },
          valuePrepareFunction: (value) => {
            let absence = this.isAbsentAndGet(4);
            return isNullOrUndefined(absence) ? value : 'ABS - ' + absence.absence_type
          }
        },
        friday: {
          filter: false,
          title: 'Vendredi',
          editor: {
            type: 'custom',
            component: CustomWeekEditorComponent,
          },
          valuePrepareFunction: (value) => {
            let absence = this.isAbsentAndGet(5);
            return isNullOrUndefined(absence) ? value : 'ABS - ' + absence.absence_type
          }
        },
        saturday: {
          filter: false,
          title: 'Samedi',
          editor: {
            type: 'custom',
            component: CustomWeekEditorComponent,
          },
          valuePrepareFunction: (value) => {
            let absence = this.isAbsentAndGet(6);
            return isNullOrUndefined(absence) ? value : 'ABS - ' + absence.absence_type
          }
        },
        sunday: {
          filter: false,
          title: 'Dimanche',
          editor: {
            type: 'custom',
            component: CustomWeekEditorComponent,
          },
          valuePrepareFunction: (value) => {
            let absence = this.isAbsentAndGet(7);
            return isNullOrUndefined(absence) ? value : 'ABS - ' + absence.absence_type
          }
        },
      },
    };
  }

  public loadTableTotalSettings() {
    return {
      hideSubHeader: true,
      actions: {
        add: false,
        delete: false,
        edit: false,
      },

      columns: {
        activity: {
          filter: false,
          title: 'Les jours   ',
          editable: false,
          valuePrepareFunction: (value) => {
            const activity = value as Activity;
            return activity ? activity.name : '';
          },
        },
        monday: {filter: false, title: 'Lundi', type: 'text'},
        tuesday: {filter: false, title: 'Mardi', type: 'text'},
        wednesday: {filter: false, title: 'Mercredi', type: 'text'},
        thursday: {filter: false, title: 'Jeudi', type: 'text'},
        friday: {filter: false, title: 'Vendredi', type: 'text'},
        saturday: {filter: false, title: 'Samedi', type: 'text'},
        sunday: {filter: false, title: 'Dimanche', type: 'text'},
      },
    };
  }

  public onCreateConfirm(event): void {
    const activity = event.newData as Activity;


  }

  isAbsentAndGet(dayNumber: number): Absence {
    let absences: Absence[] = PointageManagerComponent.absenceDays;

    return absences.find(x => x.week_number == PointageManagerComponent.semaineSelectionneeS &&
    x.day == dayNumber &&
    x.year == PointageManagerComponent.anneSelectionneS);
  }

  public onEditConfirm(event): void {
    const pointage = event.newData as Pointage;
    const sem = this.listWeeks.find(x => x.pointage.id === pointage.id
    || (x.pointage.activity.id === pointage.activity.id && x.pointage.weekNumber === pointage.weekNumber
    && x.pointage.year === pointage.year ));
    if (sem.existe) {
      this.servicePointage.saveWeek(pointage).then(
        x => {
          event.confirm.resolve(event.newData);
          this.loadData(pointage.weekNumber, pointage.year);
        }
      );
    } else {
      pointage.id = 0;
      this.servicePointage.postWeek(pointage).then(
        x => {
          event.confirm.resolve(event.newData);
          this.loadData(pointage.weekNumber, pointage.year);
        }
      );
    }
  }
}
export class ListElementComponent {
  id: number;
  titre: string;

  constructor(id?: number, titre?: string) {
    this.id = id;
    this.titre = titre;
  }
}
