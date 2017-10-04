import {Component, Input, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivityService} from '../../services/activity.service';
import {Activity} from '../../models/activity';
import {ActivityManagerComponent} from "./activityManager.component";
import {User} from "../../models/user";

@Component({
  selector: 'activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  private source: LocalDataSource;
  private settings: Object;

  @Input()
  private parent: Activity;
  @Input()
  private title: string;
  @Input()
  private manager: ActivityManagerComponent;

  constructor(private service: ActivityService) {
    this.source = new LocalDataSource();
  }

  public ngOnInit() {
    this.loadData();
  }

  public loadTableSettings() {
    return {
      mode: external,

      add: {
        addButtonContent: '<i class="ion-ios-plus-outline"></i>',
        createButtonContent: '<i class="ion-checkmark"></i>',
        cancelButtonContent: '<i class="ion-close"></i>',
        confirmCreate: true,
      },

      edit: {
        editButtonContent: '<i class="ion-edit"></i>',
        saveButtonContent: '<i class="ion-checkmark"></i>',
        cancelButtonContent: '<i class="ion-close"></i>',
        confirmSave: true,
      },

      delete: {
        deleteButtonContent: '<i class="ion-trash-a"></i>',
        confirmDelete: true,
      },

      columns: this.parent ?
        {
          name: {title: 'Nom', type: 'string',},
          creationDate: {
            title: 'Création',
            type: 'string',
            editable: false,
            valuePrepareFunction: (value) => this.formatDate(value)
          },
          modificationDate: {
            title: 'Modification',
            type: 'string',
            editable: false,
            valuePrepareFunction: (value) => this.formatDate(value)
          },
          lastEditor: {
            title: 'Modifié par', type: 'string', editable: false,
            valuePrepareFunction: (value) => {
              let user = value as User;
              return user ? user.name + " " + user.lastname : "";
            },
          }
        } :
        {
          name: {title: 'Nom', type: 'string',},
          code: {title: 'Code', type: 'string',},
          creationDate: {
            title: 'Création',
            type: 'string',
            editable: false,
            valuePrepareFunction: (value) => this.formatDate(value)
          },
          modificationDate: {
            title: 'Modification',
            type: 'string',
            editable: false,
            valuePrepareFunction: (value) => this.formatDate(value)
          },
          lastEditor: {
            title: 'Modifié par',
            type: 'string',
            editable: false,
            valuePrepareFunction: (value) => {
              let user = value as User;
              return user ? user.name + " " + user.lastname : "";
            },
          }
        }
      ,
    };
  }

  private formatDate(time: number): string {
    let date = new Date(time);

    return this.formatNumber(date.getDate()) + '/' +
      this.formatNumber(date.getMonth() + 1) + '/' +
      date.getFullYear() + ' ' +
      this.formatNumber(date.getHours()) + ':' +
      this.formatNumber(date.getMinutes());
  }

  private formatNumber(number: number): string {
    return number < 10 ? "0" + number : number.toString();
  }

  private rowSelected(event: any): void {
    let activity = event.data as Activity;
    this.manager.childrenRequested(activity);
  }

  private loadData(): void {
    let future = !this.parent ? this.service.getActivitiesParent() : this.service.getChildren(this.parent.id);

    future.then((activities) => {
      this.settings = this.loadTableSettings();
      this.source.reset(true);
      this.source.load(activities);
    });
  }

  public onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      let activity = event.data as Activity;

      this.service.deleteActivity(+activity.id).then(() => this.loadData());
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  public onCreateConfirm(event): void {
    let activity = event.newData as Activity;
    delete activity.lastEditor;
    activity.id = 0;

    if (this.parent) {
      activity.parentActivity = this.parent; //Deep copy of activity
      activity.code = this.parent.code;
    } else activity.parentActivity = null;

    this.service.postActivity(activity)
      .then(x => {
        x.subActivities = [];
        if (this.parent)
          this.parent.subActivities.push(x);
        event.confirm.resolve(x);
      });
  }

  public onEditConfirm(event): void {
    console.log(event);
    let activity = event.newData as Activity;

    this.service.saveActivity(activity).then(() => this.loadData());
  }
}
