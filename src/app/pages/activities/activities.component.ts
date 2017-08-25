import {Component, Input, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivitiesService} from '../../services/activities/activities.service';
import {Activity} from '../../models/activity';
import {ActivitiesManagerComponent} from "./activitiesManager.component";
import {User} from "../../models/user";

@Component({
  selector: 'activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {
  private source: LocalDataSource;
  private settings: Object;

  @Input()
  private parent: Activity;
  @Input()
  private title: string;
  @Input()
  private manager: ActivitiesManagerComponent;

  constructor(private service: ActivitiesService) {
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
          creationDate: {title: 'Création', type: 'string', editable: false},
          modificationDate: {title: 'Modification', type: 'string', editable: false},
          lastEditor: {title: 'Modifié par', type: 'string', editable: false,
            valuePrepareFunction: (value) =>  {
              let user = value as User;
              return user.name + " " + user.lastname;
            },
          }
        } :
        {
          name: {title: 'Nom', type: 'string',},
          code: {title: 'Code', type: 'string',},
          creationDate: {title: 'Création', type: 'string', editable: false},
          modificationDate: {title: 'Modification', type: 'string', editable: false},
          lastEditor: {
            title: 'Modifié par',
            type: 'string',
            editable: false,
            valuePrepareFunction: (value) =>  {
              let user = value as User;
              return user.name + " " + user.lastname;
            },
          }
        }
      ,
    };
  }

  private rowSelected(event: any): void {
    let activity = event.data as Activity;
    this.manager.childrenRequested(activity);
  }

  private loadData(): void {
    let future = !this.parent ? this.service.getActivitiesParent() : this.service.getParents(this.parent.id);

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

    activity.id = 0;

    if (this.parent) {
      activity.parentActivity = this.parent; //Deep copy of activity
      activity.code = this.parent.code;
    } else activity.parentActivity = null;

    this.service.postActivity(activity).then(x => {
      x.subActivities = null;
      this.parent.subActivities.push(x);
      activity.id = x.id;
      this.loadData()
    });
  }

  public onEditConfirm(event): void {
    console.log(event);
    let activity = event.newData as Activity;

    this.service.saveActivity(activity).then(() => this.loadData());
  }
}
