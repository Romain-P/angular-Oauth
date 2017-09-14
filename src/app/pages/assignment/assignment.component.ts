import {Component, Input, OnInit} from '@angular/core';
import {LocalDataSource, ViewCell} from 'ng2-smart-table';
import {UserService} from '../../services/user/user.service';
import {ActivityService} from '../../services/activity/activity.service';
import {User} from '../../models/user';
import {Activity} from '../../models/activity';
import {AssignmentManagerComponent} from "./assignmentManager.component";
import {UtilService} from "../../services/util/util.service";

@Component({
  selector: 'activitiesUser',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss'],
})
export class ActivityAssignmentComponent implements OnInit {
  @Input()
  private parent: User;
  @Input()
  private title: string;
  @Input()
  private manager: AssignmentManagerComponent;

  private source: LocalDataSource;
  private users: User[];
  private settings: Object;

  constructor(private service: UserService, private serviceActivities: ActivityService, private util: UtilService) {
    this.source = new LocalDataSource();
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
        email: {title: 'email', type: 'string'}
      },
    };
  }

  public onRowSelect(event): void {
    this.manager.listActivitiesSelect = [];
    this.manager.listActivities.forEach(activitie => {
      this.manager.listActivitiesSelect.push(activitie as Activity);
    });
    this.manager.userActivities = [];
    console.log(event);

    const user = event.data as User;
    this.manager.childrenRequested(user);

    const list = event.data.activities as Activity[];
    list.forEach(element => {
      this.manager.userActivities.push(element as Activity);
      let ind = this.manager.listActivitiesSelect.indexOf(this.manager.listActivitiesSelect
        .find(c => c.id === element.id));
      if (ind >= 0) {
        this.manager.listActivitiesSelect.splice(ind, 1);
      }

    });
    this.manager.selectedUser = this.users.find(x => {
      let user = event.data as User;
      return x.name === user.name && x.lastname === user.lastname;
    });
  }

  private loadData(): void {
    this.users = [];
    this.manager.listActivities = [];
    this.manager.listActivitiesSelect = [];

    let id = this.parent ? this.parent.id : +localStorage.getItem('userId');

    this.service.getUser(id).then((user) => {

      if (!this.parent) {
        let clone = this.util.cloneObject(user);
        clone.children = [];
        user.children.push(clone);
      }

      this.users.push(...user.children);
      this.settings = this.loadTableSettings();
      this.source.reset(true);
      this.source.load(user.children);
    });
    this.serviceActivities.getActivitiesParent().then((activities) => {
      activities.forEach(activitie => {
        this.manager.listActivities.push(activitie);
        this.manager.listActivitiesSelect.push(activitie);
      });
    });
  }
}
