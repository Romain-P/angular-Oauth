import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Activity } from '../../models/activity';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpService } from '../http/http.service';
import { errorHandler } from '@angular/platform-browser/src/browser';

@Injectable()
export class ActivitiesService {
  private activitiesUrl = `http://10.64.0.41:8080/gta/activity`; // URL to web api
  constructor(private http: HttpService) {
  }

  
  getActivities(): Promise<Activity[]> {
    return this.http.get(this.activitiesUrl)
    .toPromise()
    .then(response => {
      return response.json() as Activity[];
    }).catch(this.handleError);
 

  }
  
  postActivity(activity: Activity): Promise<Activity> {
    return this.http.post(this.activitiesUrl, JSON.stringify(activity))
      .toPromise()
      .then(response => 
        response.json() as Activity,
      ).catch(this.handleError);

  }
  saveActivity(activity: Activity): Promise<Activity> {
    return this.http.put(this.activitiesUrl, JSON.stringify(activity))
      .toPromise()
      .then(response => 
        response.json() as Activity,
      ).catch(this.handleError);

  }
 deleteActivity(id: number): Promise<Activity> {
  const url = `${this.activitiesUrl}/${id}`;
  return this.http.delete(url)
  .toPromise()
  .then(() => null)
  .catch(this.handleError);
  }


    private handleError(error: any): Promise<any> {
      console.error('An error occured', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}
