import { Role } from "src/roles/roles.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{  
    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    public name: string;
    @Column()
    public firstname: string;
    @Column()
    public age: number
    
    @OneToMany(() => Role, role => role.user)
    roles: Role[];

    constructor(name: string,firstname: string,age: number){
        this.name=name;
        this.firstname=firstname;
        this.age=age;
    }
}