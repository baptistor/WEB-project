import { User } from "src/users/users.entity";
import { Association } from "src/associations/associations.entity";
export declare class Role {
    idUser: number;
    idAssociation: number;
    name: string;
    user: User;
    association: Association;
}
