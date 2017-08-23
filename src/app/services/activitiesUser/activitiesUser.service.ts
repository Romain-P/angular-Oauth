import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { User } from '../../models/user';
import {AuthenticationService} from '../authentication/authentication.service';
import {HttpService} from '../http/http.service';

@Injectable()
export class ActivitiesUserService {
  private usersUrl = `http://10.64.0.41:8080/gta/user`;

  constructor(private http: HttpService, private auth: AuthenticationService) {}

  getUsers(): Promise<User[]> {
    return this.http.get(this.usersUrl)
      .toPromise()
      .then(response => {
        return response.json() as User[];
      }).catch(this.handleError);
  }

  postUser(activity: User): Promise<User> {
    return this.http.post(this.usersUrl, activity)
      .toPromise()
      .then(response => {
      }).catch(this.handleError);
  }

  saveUser(activity: User): Promise<User> {
    return this.http.put(this.usersUrl, activity)
      .toPromise()
      .catch(this.handleError);
  }

  deleteUser(id: number): Promise<User> {
    const url = `${this.usersUrl}/${id}`;
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
