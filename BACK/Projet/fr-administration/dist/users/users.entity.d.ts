import { Role } from "src/roles/roles.entity";
export declare class User {
    id: number;
    name: string;
    firstname: string;
    age: number;
    roles: Role[];
    constructor(name: string, firstname: string, age: number);
}
