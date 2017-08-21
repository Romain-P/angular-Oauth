export class Activity {
    id: number;
    name: string;
    code: string;
    parentActivity: any;

    constructor(id?: number) {
      if (id)
        this.id = id;
    }
}
