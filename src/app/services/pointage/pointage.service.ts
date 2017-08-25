import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { User } from '../../models/user';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpService } from '../http/http.service';

@Injectable()
export class PointageService {

  constructor(private http: HttpService, private auth: AuthenticationService) {}

 
}
