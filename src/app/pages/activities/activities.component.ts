import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivitiesService } from '../../services/activities/activities.service';
import { Activity } from '../../models/activity';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {
  private source: LocalDataSource;
  private activities: Activity[];
  private listActivities: Object[];
  private settings: Object;

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

      columns: {
        id: {title: 'ID', editable: false, type: 'number',},
        name: {title: 'Nom', type: 'string',},
        code: {title: 'Code', type: 'string',},
        parentActivity: {
          title: 'Parent',
          valuePrepareFunction: (value) => value ? value : '/',
          type: 'html',
          editor: {
            type: 'list',
            config: {
              list: this.listActivities,
            },
          },
        },
      },
    };
  }

  private loadData(): void {
    this.activities = [];
    this.listActivities = [];

    this.service.getActivities().then((activities) => {
      activities.forEach(activity => {
        this.activities.push(JSON.parse(JSON.stringify(activity)) as Activity);
        this.listActivities.push({value: activity.name, title: activity.name});
        activity.parentActivity = activity.parentActivity ? activity.parentActivity.name : null;
      });
      this.settings = this.loadTableSettings();

      this.source.reset(true);
      this.source.load(activities);
    });
  }

  private castParentActivity(activity: Activity): void {
    if (activity.parentActivity !== '' && typeof activity.parentActivity !== "object")
      activity.parentActivity = this.activities.find(x => x.name === activity.parentActivity);
    else
      activity.parentActivity = null as Activity;
  }
  public onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      let activity = event.data as Activity;

      this.service.deleteActivity(+activity.id).then(() => this.loadData());
      event.confirm.resolve();
    } else{
      event.confirm.reject();}
  }
  public onCreateConfirm(event): void {
    let activity = event.newData as Activity;

    this.castParentActivity(activity);
    activity.id = 0;

    this.service.postActivity(activity).then(() => this.loadData());
  }
  public onEditConfirm(event): void {
    console.log(event);
    let activity = event.newData as Activity;
    this.castParentActivity(activity);

    this.service.saveActivity(activity).then(() => this.loadData());
  }
}
