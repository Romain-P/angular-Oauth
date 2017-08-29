import {Component, OnInit} from '@angular/core';
import {Activity} from '../../models/activity';

@Component({
  selector: 'pointageManager',
  templateUrl: './pointageManager.component.html',
  styleUrls: ['./pointageManager.component.scss'],
})
export class PointageManagerComponent implements OnInit {
  private tables: Table[];
  private manager: PointageManagerComponent;
   selected: string;
   weekselected: number;
   yearselected: number;
  constructor() {
    this.tables = [];
    this.manager = this;
    this.selected = "";
  }

  listAnnee: ListElementComponent[] = [];
  listSemaine: ListElementComponent[] = [];

  public ngOnInit() {
    // setting select data
    this.listAnnee.push(new ListElementComponent(0, `----Année----`));
    for (let i = 2017; i < 2018; i++) {
      this.listAnnee.push(new ListElementComponent(i, `${i}`));
    }

    this.listSemaine.push(new ListElementComponent(0, `----Semaine----`));
    for (let i = 1; i < 53; i++) {
      this.listSemaine.push(new ListElementComponent(i, `${i}-semaine du  ${this.getDate(i, 2017)}`));
    }
    this.selected = ""; //TODO
    this.yearselected = 2017;
    this.weekselected = 52;
    this.tables.push(new Table('/', null));
  }

  private getDate(w, y): string {
    const simple = new Date(y, 0, 1 + (w - 1) * 7);
    const dow = simple.getDay();
    const ISOWeek = simple;

    if (dow <= 4)
      ISOWeek.setDate(simple.getDate() - simple.getDay() + 1);
    else
      ISOWeek.setDate(simple.getDate() + 8 - simple.getDay());
    return this.formatDate(ISOWeek);
  }

  private formatDate(date: Date): string {

    return this.formatNumber(date.getDate()) + '/' +
      this.formatNumber(date.getMonth() + 1);
  }

  private formatNumber(number: number): string {
    return number < 10 ? "0" + number : number.toString();
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
  constructor( id: number , titre: string) {
    this.id = id;
    this.titre = titre;
  }
}
