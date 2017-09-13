import {Activity} from "./activity";
import {Role} from "./role";
export class User {
    id: number;
    username: string;
    name: string;
    lastname: string;
    avatar: any[];
    email: string;
    superior: User;
    children: User[];
    roles: Role[];
    activities: Activity[];

    constructor(id?: number) {
      if (id) this.id = id;
    }
}
