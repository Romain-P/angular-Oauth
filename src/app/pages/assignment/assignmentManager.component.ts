import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivityService } from '../../services/activity/activity.service';
import { Activity } from '../../models/activity';
import {User} from "../../models/user";
import {UserService} from "../../services/user/user.service";
import {UtilService} from "../../services/util/util.service";

@Component({
  selector: 'assignmentManager',
  templateUrl: './assisgnmentManager.component.html',
  styleUrls: ['./assignmentManager.component.scss'],
})
export class AssignmentManagerComponent implements OnInit {
  private tables: Table[];
  private manager: AssignmentManagerComponent;
  public selectedActivities: Object[];
  public toDelActivities: Object[];
  public listActivities: Activity[];
  public listActivitiesSelect: Activity[];
  public userActivities: Activity[];
  public selectedUser: User;

  constructor(private service: UserService) {
    this.tables = [];
    this.manager = this;
    this.toDelActivities = [];
    this.selectedActivities = [];
  }

  public ngOnInit() {
    this.tables.push(new Table("/", null));
  }

  public childrenRequested(user: User): void {
    let index = this.tables.length - 1;
    let current;

    while ((current = this.tables[index].parent) &&
           current.children.filter(x => x.id == user.id).length == 0)
      this.tables.splice(index--, 1);

    let path = (index > 0 ? this.tables[index].title : "") + user.name + " / ";

    if (user.children && user.children.length > 0)
      this.tables.push(new Table(path, user));
  }

  public addActivity(event): void {
    if (this.selectedActivities.length > 0) {
      this.selectedActivities.forEach(activitieID => {
        const act = this.listActivitiesSelect.find(c => c.id === activitieID);

        this.listActivitiesSelect.splice(this.listActivitiesSelect.indexOf(act), 1);
        this.userActivities.push(act);

      });

      this.selectedUser.activities = this.userActivities;
      this.service.saveUser(this.selectedUser);
      this.selectedActivities = [];
    }
  }

  public delActivity(event): void {
    if (this.toDelActivities.length > 0) {
      this.toDelActivities.forEach(activitieID => {
        const act = this.userActivities.find(c => c.id === activitieID);
        this.userActivities.splice(this.userActivities.indexOf(act), 1);
        this.listActivitiesSelect.push(act);
      });
      this.selectedUser.activities = this.userActivities;
      this.service.saveUser(this.selectedUser);
      this.selectedUser.activities = this.userActivities;
      this.toDelActivities = [];
    }
  }
}

export class Table{
  title: string;
  parent: User;

  constructor(title: string, parent: User) {
    this.title = title;
    this.parent = parent;
  }
}
