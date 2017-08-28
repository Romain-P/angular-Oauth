import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivitiesService } from '../../services/activities/activities.service';
import { Activity } from '../../models/activity';

import { UserService } from '../../services/activitiesUser/user.service';
import { PointageService } from '../../services/pointage/pointage.service';

import { User } from '../../models/user';
import { Week } from '../../models/week';
import { Pointage } from '../../models/pointage';
import { ListElementComponent } from './list.component';

@Component({
  selector: 'pointageManager',
  templateUrl: './pointageManager.html',
  styleUrls: ['./pointageManager.scss'],
})
export class PointageManagerComponent implements OnInit {
  private tables: Table[];
  private manager: PointageManagerComponent;
  datedeb = '';
  datefin = '';
  constructor() {
  this.tables = [];
  this.manager = this;
  }
listAnnee: ListElementComponent[]= [];
listSemaine: ListElementComponent[] = [];
  public ngOnInit() {
             // setting select data
             this.listAnnee.push(new ListElementComponent( 0 , `----Année----` ) );    
             for (let _i = 2017 ; _i < 2018; _i++) {
                  this.listAnnee.push(new ListElementComponent( _i , `${_i}` ) );    
             }
     
             this.listSemaine.push(new ListElementComponent( 0 , `----Semaine----` ) );    
             for (let _i = 1 ; _i < 53; _i++) {
           
             this.listSemaine.push(new ListElementComponent( _i , `${_i}- du  ${this.datedeb} au ${this.datefin}` ) );
             }
      this.tables.push(new Table('/', null));
  }

  public childrenRequested(activity: Activity): void {
    let index = this.tables.length - 1;

    let current;

    while ((current = this.tables[index].parent) &&
           current.subActivities.filter(x => x.id == activity.id).length == 0)
      this.tables.splice(index--, 1);

    const path = (index > 0 ? this.tables[index].title : '') + activity.name + ' / ';
     if (activity.subActivities !== null && activity.subActivities.length > 0 ) {
            this.tables.push(new Table(path, activity));
    }
  }
}

export class Table{
  title: string;
  parent: Activity;

  constructor(title: string, parent: Activity) {
    this.title = title;
    this.parent = parent;
  }
}
