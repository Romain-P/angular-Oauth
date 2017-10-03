import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/do";
import {isNullOrUndefined} from "util";
import {User} from "../models/user";
import {Role} from "../models/role";
import {config} from "../app.config";

@Injectable()
export class AuthenticationService {
  private static readonly api = config.api_url;
  private static readonly tokenUrl = config.authentication.url;
  private static readonly userPath = config.models.user.current_meta_sync;
  private static readonly clientId = config.authentication.clientId;
  private static readonly clientSecret = config.authentication.clientSecret;

  private static readonly authHeaders = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json",
    "Authorization": "Basic " + btoa(AuthenticationService.clientId + ":" + AuthenticationService.clientSecret)
  });

  constructor(private http: Http) {
  }

  public authenticate(username: string, password: string): Observable<any> {
    let client = "username=" + username + "&password=" + password + "&grant_type=password&scope=read%20write&" +
      "client_secret=" + AuthenticationService.clientSecret + "&client_id=" + AuthenticationService.clientId;

    return this.http.post(AuthenticationService.tokenUrl, client, {headers: AuthenticationService.authHeaders})
      .map(response => response.json())
      .do(json => {
        localStorage.setItem('token', json.access_token);
        localStorage.setItem('expiration_date', ((Date.now() / 1000) + json.expires_in));
      })
      .mergeMap(json => this.http.get(AuthenticationService.userPath, {headers: this.getRequestHeader()}))
      .map(response => (response.json() as User))
      .do(user => {
        localStorage.setItem('userId', user.id+'');
        if (user.children.length > 0) {
          let role = new Role();
          role.name = "manager";
          user.roles.push(role);
        }
        localStorage.setItem('roles', JSON.stringify(user.roles));
      });
  }

  public validToken(): boolean {
    return !isNullOrUndefined(localStorage.getItem('token')) &&
      !isNullOrUndefined(localStorage.getItem('expiration_date')) &&
      Date.now() / 1000 < +localStorage.getItem('expiration_date');
  }

  public getRequestHeader(): Headers {
    return new Headers({
      "Authorization": "Bearer " + localStorage.getItem('token'),
      "Accept": "application/json",
      "Content-Type": "application/json"
    });
  }

  public invalidToken(error: any): Observable<any> {
    console.log(error);
    if (error && error.json().error === "invalid_token") {

      localStorage.removeItem('token');
      localStorage.removeItem('expiration_date');
      localStorage.removeItem('userId');

      window.location.reload();
    }
    return Observable.throw(error);
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration_date');
    localStorage.removeItem('userId');
    localStorage.removeItem('roles')
  }
}
