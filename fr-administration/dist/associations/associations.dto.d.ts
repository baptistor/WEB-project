import { Member } from "./associations.member";
export declare class AssociationDTO {
    name: string;
    members: Member[];
    constructor(name: string, members: Member[]);
}
