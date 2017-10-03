import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Stat } from '../models/stat';
import { HttpService } from './http.service';
import {config} from "../app.config";

@Injectable()
export class StatService {
  private pointageUrl = config.models.stat.url;

  constructor(private http: HttpService) {}

  getStats(): Promise<Stat> {
    return this.http.get(this.pointageUrl)
      .toPromise()
      .then(response => {
        return response.json() as Stat;
      }).catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

}
