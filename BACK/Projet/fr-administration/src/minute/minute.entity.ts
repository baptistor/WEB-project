import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "src/users/users.entity";
import { Association } from "src/associations/associations.entity";

@Entity()
export class Minute {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public date: string;

  @Column()
  public content: string;

  @ManyToOne(() => Association, { eager: true })
  public idAssociation: number;

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  public voters: User[];
}
