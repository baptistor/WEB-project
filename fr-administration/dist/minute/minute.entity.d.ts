import { User } from "src/users/users.entity";
export declare class Minute {
    id: number;
    date: string;
    content: string;
    idAssociation: number;
    voters: User[];
}
