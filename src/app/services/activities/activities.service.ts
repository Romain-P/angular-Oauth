import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Activity} from '../../models/activity';
import {HttpService} from '../http/http.service';

@Injectable()
export class ActivitiesService {
  private activitiesUrl = `http://localhost:8080/activity`;
  private activitiesParents = 'http://localhost:8080/activity/parents';

  constructor(private http: HttpService) {}

  getActivities(): Promise<Activity[]> {
    return this.http.get(this.activitiesUrl)
      .toPromise()
      .then(response => {
        return response.json() as Activity[];
      }).catch(this.handleError);
  }

  getActivitiesParent(): Promise<Activity[]> {
    return this.http.get(this.activitiesParents)
      .toPromise()
      .then(response => {
        return response.json() as Activity[];
      }).catch(this.handleError);
  }

  getParents(id: number): Promise<Activity[]> {
    return this.http.get(this.activitiesParents + '/' + id)
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
    const url = `${this.activitiesUrl}/${id}`;
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
