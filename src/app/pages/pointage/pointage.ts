import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivitiesService } from '../../services/activities/activities.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Activity } from '../../models/activity';
import { ListElementComponent } from './list.component';

@Component({
    selector: 'pointage',
    templateUrl: './pointage.html',
    styleUrls: ['./pointage.scss'],
})

export class PointageComponent implements OnInit {
 
    listSemaine: ListElementComponent[]=[];
    semaienSelectionnee: object;
    listAnnee: ListElementComponent[]=[];
    anneSelectionne: object;

    constructor() {
  
}

 datedeb = '';
 datefin = '';
     ngOnInit() {
        this.listAnnee.push(new ListElementComponent( 0 , `----Année----` ) );    
        for (let _i = 2017 ; _i < 2018; _i++) {
             this.listAnnee.push(new ListElementComponent( _i , `${_i}` ) );    
        }

        this.listSemaine.push(new ListElementComponent( 0 , `----Semaine----` ) );    
        for (let _i = 1 ; _i < 53; _i++) {
        
            this.listSemaine.push(new ListElementComponent( _i , `${_i}- du  ${this.datedeb} au ${this.datefin}` ) );
        }
    }

   
}
