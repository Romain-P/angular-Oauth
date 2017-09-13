import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Activity} from '../../models/activity';
import {HttpService} from '../http/http.service';
import {Role} from "../../models/role";

@Injectable()
export class RoleService {
  private roleUrl = `http://localhost:8080/role`;
  private userRoles: Array<String>;

  constructor(private http: HttpService) {
    this.userRoles = null;
  }

  getRoles(): Promise<Role[]> {
    return this.http.get(this.roleUrl)
      .toPromise()
      .then(response => response.json() as Role[])
      .catch(this.handleError);
  }

  hasAnyRole(roles: Array<String>): boolean {
    this.userRoles = (JSON.parse(localStorage.getItem("roles")) as Role[]).map(x => x.name);

    let authorized = roles.length == 0;

    roles.forEach(x => authorized = this.userRoles.findIndex(y => x === y) != -1 || authorized);

    return authorized;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
