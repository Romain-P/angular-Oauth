import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../services/activitiesUser/user.service';
import { ActivitiesService } from '../../services/activities/activities.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Activity } from '../../models/activity';

@Component({
    selector: 'activitiesUser',
    templateUrl: './activitiesUser.html',
    styleUrls: ['./activitiesUser.scss'],
})
export class ActivitiesUserComponent implements OnInit {
    private source: LocalDataSource;
    private users: User[];
    private listActivities: Activity[];
    private listActivitiesSelect: Activity[];
    private userActivies: Activity[];
    private settings: Object;
    selectedactivities: Object[] = [];
    toDelActivities: Object[] = [];
    selectedUser: User = new User();
    constructor(private service: UserService, private serviceActivities: ActivitiesService) {
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
                name: { title: 'Nom', type: 'string' },
                lastname: { title: 'lastname', type: 'string' },
                email: { title: 'email', type: 'string' },
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

    private castParentUser(user: User): void {
        if (user.superior !== '' && typeof user.superior !== 'object') {
            user.superior = this.users.find(x => x.id === +user.superior);
        } else {
        user.superior = null as User;
    }


    }
    public onRowSelect(event): void {
        this.listActivitiesSelect = [];
        this.listActivities.forEach(activitie => {
            this.listActivitiesSelect.push(activitie);
        });
        this.userActivies = [];
        console.log(event);
    const list = event.data.activities as Activity[];
    list.forEach(element => {
        this.userActivies.push(element);
        this.listActivitiesSelect.splice(this.listActivitiesSelect.indexOf(element) , 1 );
    });
    this.selectedUser = event.data as User;
      }

      public addActivity(event): void {
     if ( this.selectedactivities.length > 0) {
        this.selectedactivities.forEach(activitieID => {
            const act = this.listActivitiesSelect.find( c => c.id === activitieID );

            this.listActivitiesSelect.splice(this.listActivitiesSelect.indexOf(act) , 1 );
            this.userActivies.push(act);

        });

        this.selectedUser.activities = this.userActivies;
        this.service.saveUser(this.selectedUser);
        this.selectedactivities = []; }
    }

        public delActivity(event): void {
            if ( this.toDelActivities.length > 0) {
               this.toDelActivities.forEach(activitieID => {
                   const act = this.userActivies.find( c => c.id === activitieID );
                   this.userActivies.splice(this.userActivies.indexOf(act) , 1 );
                   this.listActivitiesSelect.push(act);
            });
            this.selectedUser.activities = this.userActivies;
            this.service.saveUser(this.selectedUser);
            this.selectedUser.activities = this.userActivies;
               this.toDelActivities = []; }
      }
}
