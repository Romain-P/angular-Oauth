import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Activity } from '../../models/activity';
import * as moment from 'moment';
import {HttpService} from "../../services/http.service";
import {UserService} from "../../services/user.service";
import {Absence} from "../../models/absence";

@Component({
  selector: 'pointageManager',
  templateUrl: './pointageManager.component.html',
  styleUrls: ['./pointageManager.component.scss'],
})
export class PointageManagerComponent implements OnInit {
  private tables: Table[];
  private manager: PointageManagerComponent;
   selected: string;
   private semaineSelectionnee: number ;
   private anneSelectionne: number;
  static semaineSelectionneeS: number ;
  static anneSelectionneS: number;
  constructor(private http: HttpService, private userService: UserService) {
    this.tables = [];
    this.manager = this;
    this.selected = '';
  }

  listAnnee: ListElementComponent[] = [];
  listSemaine: ListElementComponent[] = [];

  static absenceDays: Absence[];

  public ngOnInit() {
    // setting select data
    this.listAnnee.push(new ListElementComponent(0, `----Année----`));
    for (let i = 2017; i < 2018; i++) {
      this.listAnnee.push(new ListElementComponent(i, `${i}`));

    }

    this.listSemaine.push(new ListElementComponent(0, `----Semaine----`));
    for (let i = 1; i < 53; i++)
      this.listSemaine.push(new ListElementComponent(i, `${i}-semaine du  ${moment(`${moment().year()}`).add(i, 'week').startOf('isoWeek').format('DD/MM')}`));

    this.selected = ''; //TODO

    let current = moment().startOf('isoWeek');
    this.semaineSelectionnee = current.week();
    this.anneSelectionne = current.year();

    this.tables.push(new Table('/', null));
    this.collectAbsenceDays();
  }

  private collectAbsenceDays() {
    this.userService.getAbsenceDays(+localStorage.getItem('userId'), this.anneSelectionne)
      .then(days => PointageManagerComponent.absenceDays = days);
  }

  public childrenRequested(activity: Activity): void {
    let index = this.tables.length - 1;

    let current;

    while ((current = this.tables[index].parent) &&
    current.subActivities.filter(x => x.id == activity.id).length == 0)
      this.tables.splice(index--, 1);

    const path = (index > 0 ? this.tables[index].title : '') + activity.name + ' / ';
    if (activity.subActivities !== null && activity.subActivities.length > 0) {
      this.tables.push(new Table(path, activity));
    }
  }

}

export class Table {
  title: string;
  parent: Activity;

  constructor(title: string, parent: Activity) {
    this.title = title;
    this.parent = parent;
  }
}

export class ListElementComponent {
  id: number;
  titre: string;
  constructor( id?: number , titre?: string) {
    this.id = id;
    this.titre = titre;
  }
}
