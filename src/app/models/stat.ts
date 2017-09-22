
export class Stat {
    employees: number;
    lastWeekValidEmployees: number;
    lastMounthValidEmployees: number;
    lastWeekTop: ManDays[];
    lastMonthTop: ManDays[];
}

export class ManDays {
    name: string;
    manDays: number;
}
