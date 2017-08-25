import {User} from "./user";
export class Activity {
    id: number;
    name: string;
    code: string;
    parentActivity: Activity;
    subActivities: Activity[];
    creationDate: number;
    modificationDate: number;
    users: User[];
    lastEditor: User;

    constructor(id?: number) {
      if (id) this.id = id;
      this.users = null;
    }
}
