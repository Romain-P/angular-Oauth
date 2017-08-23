export class User {
    id: number;
    username: string;
    name: string;
    lastname: string;
    avatar: any;
    email: string;
    superior: any;
    roles: any;
    activities: any;

    constructor(id?: number) {
      if (id) { 
            this.id = id;
         }
    }
}
