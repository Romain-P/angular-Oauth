
import {User} from "./user";
import {Activity} from "./activity";
export class Pointage {
    id: number;
    weekNumber: number;
    year: number;
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
    activity: Activity;
    user: User;

    constructor(id?: number) {
      if (id) {
            this.id = id;
        }
    }
}
