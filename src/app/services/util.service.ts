import {Injectable} from "@angular/core";

@Injectable()
export class UtilService {
  cloneObject(object: any): any {
    return JSON.parse(JSON.stringify(object));
  }
}
