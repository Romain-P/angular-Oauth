import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { User } from '../models/user';
import {AuthenticationService} from './authentication.service';
import {HttpService} from './http.service';
import {Activity} from "../models/activity";
import {config} from "../app.config";
import {Absence} from "../models/absence";

@Injectable()
export class UserService {
  private usersUrl = config.models.user.url;
  private currentUser = config.models.user.current;
  private metaUser = config.models.user.meta_sync;

  constructor(private http: HttpService, private auth: AuthenticationService) {}

  getAbsenceDays(userId: number, year: number): Promise<Absence[]> {
    return this.http.get(config.models.user.absence_days.replace('{userId}', `${userId}`).replace('{year}', `${year}`))
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  getUsers(): Promise<User[]> {
    return this.http.get(this.usersUrl)
      .toPromise()
      .then(response => {
        return response.json() as User[];
      }).catch(this.handleError);
  }
  getUser(id: number): Promise<User> {
    return this.http.get(`${this.usersUrl}${id}`)
      .toPromise()
      .then(response => {
        return response.json() as User;
      }).catch(this.handleError);
  }

  getUserSyncWithMeta(id: number): Promise<User> {
    return this.http.get(`${this.metaUser}${id}`)
      .toPromise()
      .then(response => {
        return response.json() as User;
      }).catch(this.handleError);
  }

  getCurrentUser(): Promise<User> {
    return this.http.get(this.currentUser)
      .toPromise()
      .then(response => {
        return response.json() as User;
      }).catch(this.handleError);
  }

  postUser(activity: User): Promise<User> {
    this.formatUser(activity);
    return this.http.post(this.usersUrl, activity)
      .toPromise()
      .then(response => {
      }).catch(this.handleError);
  }

  saveUser(activity: User): Promise<User> {
    this.formatUser(activity);
    return this.http.put(this.usersUrl, activity)
      .toPromise()
      .catch(this.handleError);
  }

  deleteUser(id: number): Promise<User> {
    const url = `${this.usersUrl}${id}`;
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private formatUser(user: User): void {
    if (user.activities != null)
      user.activities.forEach(x => this.formatActivity(x))
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
