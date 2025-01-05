import { Role } from "src/roles/roles.entity";
export declare class User {
    id: number;
    lastname: string;
    firstname: string;
    age: number;
    password: string;
    roles: Role[];
}
