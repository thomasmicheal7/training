import { EntityNotFoundError } from "typeorm";
import { AddressDto } from "../dto/createAddress.dto";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/emploee.repository";
import { Role } from "../utils/role.enum";
import bcrypt from "bcrypt";
import { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { jwtPayload } from "../utils/jwtPayload";
import EntityNotFoundException from "../exception/entityNotFound.exception";
import IncorrectPasswordException from "../exception/incorrectPassword.exception";
import jsonwebtoken from "jsonwebtoken"
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";
import { ErrorCodes } from "../utils/error.code";
import DeptRepository from "../repository/department.repository";
import Department from "../entity/dept.entity";

class DeptService{
    constructor(private deptRepository:DeptRepository)
    {
    }
    find=async():Promise<Department[]>=>{
        return this.deptRepository.find()
    }

    findByID=async(id:number):Promise<Department|null>=>{
        return this.deptRepository.findOneBy({id});
    }


    createDept = async (name: string): Promise<Department> => {
        const newDept = new Department();

        newDept.name = name;
        
    
        return this.deptRepository.save(newDept);
      }

      deleteDept = async (id: number): Promise<void> => {
        const department = await this.findByID(id);
        await this.deptRepository.softRemove(department);
      }

      updateDept = async (department:Department): Promise<Department>=>{
        return this.deptRepository.update(department);
      }


}


export default DeptService;