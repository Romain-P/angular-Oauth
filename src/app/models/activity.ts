export class Activity {
    id: number;
    name: string;
    code: string;
    parentActivity: Activity;
    subActivities: Activity[];
    creationDate: number;
    modificationDate: number;

    constructor(id?: number) {
      if (id) this.id = id;
    }
}
