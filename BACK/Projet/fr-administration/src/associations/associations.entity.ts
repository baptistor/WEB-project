import { Role } from "src/roles/roles.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, PrimaryGeneratedColumn, JoinTable, ManyToMany, OneToMany } from "typeorm";

@Entity()
export class Association {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  public idUsers: User[];

  @Column()
  public name: string;

  @OneToMany(()=> Role, role=>role.association,{ eager: true } )
  public roles: Role

}