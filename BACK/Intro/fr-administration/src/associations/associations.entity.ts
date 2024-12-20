import { User } from "src/users/users.entity";
import { Column, Entity, PrimaryGeneratedColumn, JoinTable, ManyToMany } from "typeorm";

@Entity()
export class Association {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  public users: User[];

  @Column()
  public name: string;

  constructor(name: string, users: User[]) {
    this.name = name;
    this.users = users;
  }
}
