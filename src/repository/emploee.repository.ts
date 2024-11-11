import { DataSource, Repository } from "typeorm"
import Employee from "../entity/employee.entity"
import dataSource from "../db/data-source.db";
class EmployeeRepository{
    private dataSource:DataSource;

    constructor(private employeeRepository:Repository<Employee>)
    {}
    

    find = async (): Promise<Employee[]> => {
        return this.employeeRepository.find({ relations: ["address","department"] });  
      };
    
      findOneBy = async (filter: Partial<Employee>): Promise<Employee | null> => {
        return this.employeeRepository.findOne({
          where: filter,
          relations: ["address","department"],
        });
      };
    save = async (employee: Employee): Promise<Employee> => {
        return this.employeeRepository.save(employee);
      };
      softRemove = async (employee: Employee): Promise<void> => {
        await this.employeeRepository.softRemove(employee);
      };
      update = async (employee: Partial<Employee>): Promise<Employee> => {
        return this.employeeRepository.save(employee);
      };

 }

 export default EmployeeRepository;