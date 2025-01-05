import { User } from "src/users/users.entity";
import { Role } from "src/roles/roles.entity";
export declare class Association {
    id: number;
    users: User[];
    name: string;
    roles: Role;
}
