import { Component , OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivitiesService } from '../../services/activities/activities.service';

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
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      nom: {
        title: 'Nom',
        type: 'string',
      },
      code: {
        title: 'Code',
        type: 'string',
      },
      parent: {
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
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
