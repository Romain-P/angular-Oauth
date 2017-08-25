
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
    activity: any;
    user: any;
   
    constructor(id?: number) {
      if (id) { 
            this.id = id;
        }
    }
}
