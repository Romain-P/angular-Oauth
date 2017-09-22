import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { User } from '../models/user';
import { Activity } from '../models/activity';
import { Pointage } from '../models/pointage';
import { AuthenticationService } from './authentication.service';
import { HttpService } from './http.service';

@Injectable()
export class PointageService {
  private pointageUrl = `http://10.64.0.41:8080/gta/week`;

  constructor(private http: HttpService, private auth: AuthenticationService) {}

  getWeeks(): Promise<Pointage[]> {
    return this.http.get(this.pointageUrl)
      .toPromise()
      .then(response => {
        return response.json() as Pointage[];
      }).catch(this.handleError);
  }
  getWeekNumber(nbr: number, year: number): Promise<Pointage[]> {
    const url = `${this.pointageUrl}/user/weekNumber/${nbr}/year/${year}`;
    return this.http.get(url)
    .toPromise()
    .then(response => {
      return response.json() as Pointage[];
    }).catch(this.handleError);
  }

  postWeek(week: Pointage): Promise<Pointage> {
    this.formatUser(week.user);
    this.formatActivity(week.activity);
    return this.http.post(this.pointageUrl, week)
      .toPromise()
      .then(response => {
      }).catch(this.handleError);
  }

  saveWeek(week: Pointage): Promise<Pointage> {
    this.formatUser(week.user);
    this.formatActivity(week.activity);
    return this.http.put(this.pointageUrl, week)
      .toPromise()
      .catch(this.handleError);
  }

  deleteWeek(id: number): Promise<Pointage> {
    const url = `${this.pointageUrl}/${id}`;
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private formatUser(user: User): void {
    if (user.activities !== null) {
      user.activities.forEach(x => this.formatActivity(x));
    }
  }

  private formatActivity(activity: Activity): void {
    if (activity.subActivities !== null && activity.subActivities.length <= 0) {
      activity.subActivities = null;
    }else if (activity.subActivities !== null) {
      activity.subActivities.forEach(x => this.formatActivity(x));
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

}
