import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Activity } from '../../models/activity';
import { errorHandler } from '@angular/platform-browser/src/browser';

@Injectable()
export class ActivitiesService {
  private getallactivitiesUrl = `http://10.64.0.41:8080/gta/GET/activity/all`; // URL to web api
  private headers = new Headers({ 'Content-type': 'application/json', 'Accept-Language': 'application/json' });

  constructor(private http: Http) {
  }

  
  getActivities(): Promise<any> {
    return this.http.get(this.getallactivitiesUrl)
    .toPromise()
    .then(response => {
      return response.json() as any[];
    }).catch(this.handleError);
 

  }  
    private handleError(error: any): Promise<any> {
      console.error('An error occured', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}
