import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {LocalDataSource, ViewCell} from 'ng2-smart-table';
import {UserService} from '../../services/user/user.service';
import {ActivityService} from '../../services/activity/activity.service';
import {User} from '../../models/user';
import {Observable} from 'rxjs/Rx';
import {Router} from '@angular/router';
import {Activity} from '../../models/activity';

@Component({
  selector: 'activitiesUser',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss'],
})
export class ActivityAssignmentComponent implements OnInit {
  private source: LocalDataSource;
  private users: User[];
  private listActivities: Activity[];
  private listActivitiesSelect: Activity[];
  private userActivities: Activity[];
  private settings: Object;
  private selectedActivities: Object[];
  private toDelActivities: Object[];
  private selectedUser: User;

  constructor(private service: UserService, private serviceActivities: ActivityService) {
    this.source = new LocalDataSource();
    this.selectedUser = new User();
    this.toDelActivities = [];
    this.selectedActivities = [];
  }

  public ngOnInit() {
    this.loadData();
  }

  public loadTableSettings() {
    return {
      mode: external,
      actions: false,
      columns: {
        name: {title: 'Nom', type: 'string'},
        lastname: {title: 'lastname', type: 'string'},
        email: {title: 'email', type: 'string'},
        superior: {
          title: 'Supérieur',
          valuePrepareFunction: (value) => {
            const act = value as User;
            return act ? `${act.name} ${act.lastname}` : '/';
          },
        },
      },
    };
  }

  private loadData(): void {
    this.users = [];
    this.listActivities = [];
    this.listActivitiesSelect = [];
    this.service.getUsers().then((users) => {
      users.forEach(user => {
        this.users.push(user);
      });
      this.settings = this.loadTableSettings();

      this.source.reset(true);
      this.source.load(users);
    });
    this.serviceActivities.getActivitiesParent().then((activities) => {
      activities.forEach(activitie => {
        this.listActivities.push(activitie);
        this.listActivitiesSelect.push(activitie);
      });
    });
  }


  public onRowSelect(event): void {
    this.listActivitiesSelect = [];
    this.listActivities.forEach(activitie => {
      this.listActivitiesSelect.push(activitie as Activity);
    });
    this.userActivities = [];
    console.log(event);
    const list = event.data.activities as Activity[];
    list.forEach(element => {
      this.userActivities.push(element as Activity);
      let ind = this.listActivitiesSelect.indexOf(this.listActivitiesSelect
        .find(c => c.id === element.id));
      if (ind >= 0) {
        this.listActivitiesSelect.splice(ind, 1);
      }

    });
    this.selectedUser = event.data as User;
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
