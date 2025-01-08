import { Member } from "./associations.member";

export class AssociationDTO {
  public id: number;
  public name: string;
  public members: Member[];

  constructor(id: number, name: string, members: Member[]) {
    this.id =id;
    this.name = name;
    this.members = members;
  }
}
