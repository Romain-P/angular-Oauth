import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/do";
import {isNullOrUndefined} from "util";

@Injectable()
export class AuthenticationService {
  private static readonly api = 'http://10.64.0.41:8080/gta';
  private static readonly tokenUrl = AuthenticationService.api + '/login/token';
  private static readonly userPath = AuthenticationService.api + '/hello';
  private static readonly clientId = 'clktime-app';
  private static readonly clientSecret = 'ortec-secret';

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
      .do(request => localStorage.setItem('userId', request.json().id));
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
  }
}