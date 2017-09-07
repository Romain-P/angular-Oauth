import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Activity} from '../../models/activity';
import {HttpService} from '../http/http.service';
import {Role} from "../../models/role";

@Injectable()
export class RoleService {
  private roleUrl = `http://localhost:8080/role`;

  constructor(private http: HttpService) {}

  getRoles(): Promise<Role[]> {
    return this.http.get(this.roleUrl)
      .toPromise()
      .then(response => response.json() as Role[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
