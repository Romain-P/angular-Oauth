import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AuthenticationService} from "../authentication/authentication.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService {
  constructor(private http: Http, private auth: AuthenticationService) {
  }

  public get(url: string): Observable<any> {
    return this.http.get(url, {headers: this.auth.getRequestHeader()}).catch(this.auth.invalidToken);
  }

  public post(url: string, data: any): Observable<any> {
    return this.http.post(url, data, {headers: this.auth.getRequestHeader()}).catch(this.auth.invalidToken);
  }

  public put(url: string, data: any): Observable<any> {
    return this.http.put(url, data, {headers: this.auth.getRequestHeader()}).catch(this.auth.invalidToken);
  }

  public delete(url: string): Observable<any> {
    return this.http.delete(url, {headers: this.auth.getRequestHeader()}).catch(this.auth.invalidToken);
  }
}
