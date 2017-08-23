import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivitiesService } from '../../services/activities/activities.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Activity } from '../../models/activity';

@Component({
    selector: 'pointage',
    templateUrl: './pointage.html',
    styleUrls: ['./pointage.scss'],
})
export class PointageComponent implements OnInit {
  
    constructor(){
  
    }

    public ngOnInit() {
   
    }

   
    
}
