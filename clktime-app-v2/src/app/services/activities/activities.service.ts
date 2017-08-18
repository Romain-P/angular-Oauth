import { Injectable } from '@angular/core';
import { Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Activity } from '../../models/activity';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpService } from '../http/http.service';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ActivitiesService {
  private activitiesUrl = `http://10.64.0.41:8080/gta/activity`; // URL to web api
  constructor(private http: Http, private https: HttpService, private auth: AuthenticationService) {
  }

  
  getActivities(): Promise<Activity[]> {
    return this.https.get(this.activitiesUrl)
    .toPromise()
    .then(response => {
      return response.json() as Activity[];
    }).catch(this.handleError);
 

  }
  
  postActivity(activity: Activity): Promise<Activity> {
    
   
      return this.http.post(this.activitiesUrl, activity, {headers: this.auth.getRequestHeader()})
       .toPromise()
        .then(response => {} ).catch(this.handleError);

  }
  
  
  saveActivity(activity: Activity): Promise<Activity> {
 
    return this.http.put(this.activitiesUrl,activity, {headers: this.auth.getRequestHeader()})
      .toPromise()
      .catch(this.handleError);

  }
 deleteActivity(id: number): Promise<Activity> {
  const url = `${this.activitiesUrl}/${id}`;
  return this.https.delete(url)
  .toPromise()
  .then(() => null)
  .catch(this.handleError);
  }


    private handleError(error: any): Promise<any> {
      console.error('An error occured', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}
