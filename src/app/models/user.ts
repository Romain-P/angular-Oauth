import {Activity} from "./activity";
export class User {
    id: number;
    username: string;
    name: string;
    lastname: string;
    avatar: any[];
    email: string;
    superior: User;
    roles: string[];
    activities: Activity[];

    constructor(id?: number) {
      if (id) this.id = id;
    }
}
