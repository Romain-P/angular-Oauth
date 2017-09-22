import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Stat } from '../../models/stat';
import { HttpService } from '../http/http.service';

@Injectable()
export class StatService {
  private pointageUrl = `http://10.64.0.41:8080/gta/stat`;

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
