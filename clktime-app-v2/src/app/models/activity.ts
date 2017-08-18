export class Activity {
    id: number;
    name: string;
    code: string;
    parentActivity: any;

    constructor(id?: any) {
      if (id)
        this.id = id;
    }
}
