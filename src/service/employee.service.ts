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
import { CreateDepartmentDto } from "../dto/createDepartment.dto";
import Department from "../entity/dept.entity";

class EmployeeService{
    constructor(private employeeRepository:EmployeeRepository)
    {
    }
    find=async():Promise<Employee[]>=>{
        return this.employeeRepository.find()
    }

    findByID=async(id:number):Promise<Employee|null>=>{
        return this.employeeRepository.findOneBy({id});
    }

    loginEmployee=async(email:string,password:string)=>{
        const employee=await this.employeeRepository.findOneBy({email});
        if(!employee){
            throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);
        }
        const result = await bcrypt.compare(password,employee.password);
        
        if(!result){
            throw new IncorrectPasswordException(ErrorCodes.INCORRECT_PASSWORD);
        }
        const payload:jwtPayload={
            name:employee.name,
            email:employee.email,
            role:employee.role,
        };

        const token=jsonwebtoken.sign(payload,JWT_SECRET,{expiresIn:JWT_VALIDITY});

        return{token};
    }
    createEmployee = async (email: string, name: string, address: AddressDto,password:string,role:Role,dept:number): Promise<Employee> => {
        const newEmployee = new Employee();
        newEmployee.email = email;
        newEmployee.name = name;
        newEmployee.password=password?await bcrypt.hash(password,10):"";
        newEmployee.role=role;
    
    
        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;
        
        newEmployee.address = newAddress;
        
        const newDept = new Department();
        newDept.id = dept;
        
        
        newEmployee.department = newDept;
    
        return this.employeeRepository.save(newEmployee);
      }

      deleteEmployee = async (id: number): Promise<void> => {
        const employee = await this.findByID(id);
        await this.employeeRepository.softRemove(employee);
      }

      updateEmployee = async (employee:Employee): Promise<Employee>=>{
        return this.employeeRepository.update(employee);
      }


}


export default EmployeeService;