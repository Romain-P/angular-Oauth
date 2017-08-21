import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Activity} from '../../models/activity';
import {AuthenticationService} from '../authentication/authentication.service';
import {HttpService} from '../http/http.service';

@Injectable()
export class ActivitiesService {
  private activitiesUrl = `http://10.64.0.41:8080/gta/activity`;

  constructor(private http: HttpService, private auth: AuthenticationService) {}

  getActivities(): Promise<Activity[]> {
    return this.http.get(this.activitiesUrl)
      .toPromise()
      .then(response => {
        return response.json() as Activity[];
      }).catch(this.handleError);
  }

  postActivity(activity: Activity): Promise<Activity> {
    return this.http.post(this.activitiesUrl, activity)
      .toPromise()
      .then(response => {
      }).catch(this.handleError);
  }

  saveActivity(activity: Activity): Promise<Activity> {
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

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
