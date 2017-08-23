import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivitiesUserService } from '../../services/activitiesUser/activitiesUser.service';
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

    constructor(private service: ActivitiesUserService, private serviceActivities: ActivitiesService) {
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
        this.listActivitiesSelect= [];
        this.service.getUsers().then((users) => {
            users.forEach(user => {
                this.users.push(user);
            });
            this.settings = this.loadTableSettings();

            this.source.reset(true);
            this.source.load(users);
        });
        this.serviceActivities.getActivities().then((activities) => {
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
        this.userActivies = [];
        console.log(event);
    const list = event.data.activities as Activity[];   
    list.forEach(element => {
        this.userActivies.push(element);
    }); 
      }
}
