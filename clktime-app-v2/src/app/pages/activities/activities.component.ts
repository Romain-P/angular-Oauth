import { Component , OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivitiesService } from '../../services/activities/activities.service';
import { Activity } from '../../models/activity';
@Component({
  selector: 'activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {

  query: string = '';

  settings = {
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
      id: {
        title: 'ID',
        editable: false,
        type: 'number',
      },
      name: {
        title: 'Nom',
        type: 'string',
      },
      code: {
        title: 'Code',
        type: 'string',
      },
      parentActivity: {
        title: 'Parent',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: '1', title: 'Glenna Reichert' },
              { value: '2', title: 'Kurtis Weissnat' },
              { value: '3', title: 'Chelsey Dietrich' },
            ],
        },
      }, 
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: '1', title: 'Glenna Reichert' },
              { value: '2', title: 'Kurtis Weissnat' },
              { value: '3', title: 'Chelsey Dietrich' },
            ],
        },
      }, 
    },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: ActivitiesService, private _sanitizer: DomSanitizer) {
    this.service.getActivities().then((activites) => {
      console.log(activites);
      this.source.load(activites);
    });
  }
  ngOnInit() {
    
      }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      let newactivity = event.newData as Activity;
       this.service.deleteActivity(+newactivity.id).then(activity => {
        console.log(activity);
        this.service.getActivities().then(activites => {
          console.log(activites);
          this.source.load(activites);
          event.confirm.resolve();
        });
      });
      event.confirm.resolve();

    } else {
      event.confirm.reject();
    }
  }  

  onCreateConfirm(event): void {
    console.log(event);
    let newactivity = event.newData as Activity;
    newactivity.id=0;
    this.service.postActivity(newactivity).then(activity => {
      console.log(activity);
      this.service.getActivities().then(activites => {
        console.log(activites);
        this.source.load(activites);
        event.confirm.resolve();
      });
    });
  }
  onEditConfirm(event): void {
    console.log(event);
    this.service.saveActivity(event.newData).then(activity => {
      console.log(activity);
      this.service.getActivities().then(activites => {
        console.log(activites);
        this.source.load(activites);
      });
    });
  }

}
