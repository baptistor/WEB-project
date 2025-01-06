import { User } from "src/users/users.entity";
import { Role } from "src/roles/roles.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Association {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => User)
    @JoinTable()
    users: User[];

    @Column()
    name: string;

    @OneToMany(()=> Role, role=>role.association,{ eager: true } )
    public roles: Role
}
