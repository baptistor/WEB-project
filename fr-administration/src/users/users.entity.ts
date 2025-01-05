import { Role } from "src/roles/roles.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lastname: string;

    @Column()
    firstname: string;

    @Column()
    age: number;

    @Column()
    password: string;

    @OneToMany(() => Role, role => role.user)
    roles: Role[];
}
