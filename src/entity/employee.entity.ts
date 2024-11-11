import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import AbstractEntity from "./abstract-entity";
import Address from "./address.entity";
import { Role } from "../utils/role.enum";
import Department from "./dept.entity";

@Entity()
class Employee extends AbstractEntity {

  @Column()
  email: string;

  @Column()
  name: string;

  @OneToOne(() => Address, (address) => address.employee, {
    cascade: true,
    onDelete: "CASCADE",
  }) // specify inverse side as a second parameter
  address: Address

  @Column({nullable:true})
  password:string

  @Column({nullable:true})
  role: Role;
  
  @ManyToOne(() => Department, (department) => department.employees,{
    cascade: true,
    onDelete: "CASCADE",
    onUpdate:"CASCADE"
  })
  department:Department

}

export default Employee;