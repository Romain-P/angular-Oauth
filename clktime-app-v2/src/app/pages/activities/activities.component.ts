import { Component , OnInit } from '@angular/core';
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
  source: LocalDataSource = new LocalDataSource();
  listActivities: Object[] = [];
  

   settings: Object;

   constructor(protected service: ActivitiesService) {
  }
  ngOnInit() {
    this.service.getActivities().then((activites) => {
      activites.forEach(activite => {
         this.listActivities.push({ value: activite.id, title: activite.name });
       });
       this.settings = this.loadTableSettings(); 
       
       this.source.load(activites);
     });
    
  }
  
  loadTableSettings(){
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
              valuePrepareFunction: (value) => { 
                let act = value as Activity;
                return act? act.name : ''; },
              editor: {
                type: 'list',
                config: {
                  selectText: 'Select...',
                  list: this.listActivities ,
              },
            }, 
          },
          },
    };
    }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      let newactivity = event.data as Activity;
       this.service.deleteActivity(+newactivity.id).then(
        activity => { this.service.getActivities().then(
          activites => { 
            activites.forEach(activite => {
              this.listActivities.push({ value: activite.id, title: activite.name });
            });
            this.settings = this.loadTableSettings(); 
        
            this.source = new LocalDataSource(activites);
            event.confirm.resolve();
             });
            } 
       );
      event.confirm.resolve();

    } else {
      event.confirm.reject();
    }
  }  

  onCreateConfirm(event): void {
    console.log(event);
    let newactivity = event.newData as Activity;
    // we had the acctivity parent 
    if(newactivity.parentActivity !== null){
      let parentActivity: Activity = new Activity();
      parentActivity.id = newactivity.parentActivity;
      newactivity.parentActivity = parentActivity;
    }
    newactivity.id = 0;
 
   // newactivity.parentActivity = 
    this.service.postActivity(newactivity).then(
        activity => { this.service.getActivities().then(
          activites => { 
            activites.forEach(activite => {
              this.listActivities.push({ value: activite.id, title: activite.name });
            });
            this.settings = this.loadTableSettings(); 
        
            this.source = new LocalDataSource(activites);
            event.confirm.resolve();
             }); } );
  }

  onEditConfirm(event): void {
    console.log(event);
    let newactivity = event.newData as Activity;
    if(newactivity.parentActivity !== null){
      let parentActivity: Activity = new Activity();
      parentActivity.id = newactivity.parentActivity;
      newactivity.parentActivity = parentActivity;
    }
    this.service.saveActivity(newactivity).then(
       activity => { this.service.getActivities().then(
      activites => { 
        activites.forEach(activite => {
          this.listActivities.push({ value: activite.id, title: activite.name });
        });
        this.settings = this.loadTableSettings(); 
    
        this.source = new LocalDataSource(activites);
        event.confirm.resolve();
         }); } );
  }

}
