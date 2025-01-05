import { User } from "src/users/users.entity";
import { Association } from "src/associations/associations.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('roles')
export class Role {
  @PrimaryColumn()
  idUser: number;

  @PrimaryColumn()
  idAssociation: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.roles, { eager: true})
  @JoinColumn({ name: 'idUser' })
  user: User;

  @ManyToOne(() => Association, (association) => association.roles)
  @JoinColumn({ name: 'idAssociation' })
  association: Association;
}