import { Role } from "src/roles/roles.entity";
import { User } from "src/users/users.entity";
export declare class Association {
    id: number;
    idUsers: User[];
    name: string;
    roles: Role;
}
