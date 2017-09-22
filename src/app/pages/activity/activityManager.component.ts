import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivityService } from '../../services/activity.service';
import { Activity } from '../../models/activity';

@Component({
  selector: 'activityManager',
  templateUrl: './activityManager.component.html',
  styleUrls: ['./activityManager.component.scss'],
})
export class ActivityManagerComponent implements OnInit {
  private tables: Table[];
  private manager: ActivityManagerComponent;

  constructor() {
    this.tables = [];
    this.manager = this;
  }

  public ngOnInit() {
    this.tables.push(new Table("/", null));
  }

  public childrenRequested(activity: Activity): void {
    let index = this.tables.length - 1;
    let current;

    while ((current = this.tables[index].parent) &&
           current.subActivities.filter(x => x.id == activity.id).length == 0)
      this.tables.splice(index--, 1);

    let path = (index > 0 ? this.tables[index].title : "") + activity.name + " / ";
    this.tables.push(new Table(path, activity));
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
