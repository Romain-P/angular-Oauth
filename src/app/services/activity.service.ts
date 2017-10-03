import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Activity} from '../models/activity';
import {HttpService} from './http.service';
import {config} from "../app.config";

@Injectable()
export class ActivityService {
  private activitiesUrl = config.models.activity.url;
  private activitiesParents = config.models.activity.parents;
  private childrenActivities = config.models.activity.children;

  constructor(private http: HttpService) {}

  getActivitiesParent(): Promise<Activity[]> {
    return this.http.get(this.activitiesParents)
      .toPromise()
      .then(response => {
        return response.json() as Activity[];
      }).catch(this.handleError);
  }

  getChildren(id: number): Promise<Activity[]> {
    return this.http.get(this.childrenActivities + id)
      .toPromise()
      .then(response => {
        return response.json() as Activity[];
      }).catch(this.handleError);
  }

  postActivity(activity: Activity): Promise<Activity> {
    this.formatActivity(activity);
    return this.http.post(this.activitiesUrl, activity)
      .toPromise()
      .then(response => {
        return response.json();
      }).catch(this.handleError);
  }

  saveActivity(activity: Activity): Promise<Activity> {
    this.formatActivity(activity);
    return this.http.put(this.activitiesUrl, activity)
      .toPromise()
      .catch(this.handleError);
  }

  deleteActivity(id: number): Promise<Activity> {
    const url = `${this.activitiesUrl}${id}`;
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private formatActivity(activity: Activity): void {
    if (activity.subActivities != null && activity.subActivities.length <= 0)
      activity.subActivities = null;
    else if (activity.subActivities != null)
      activity.subActivities.forEach(x => this.formatActivity(x));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
