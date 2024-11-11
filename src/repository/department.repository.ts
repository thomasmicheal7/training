import { DataSource, Repository } from "typeorm"
import dataSource from "../db/data-source.db";
import Department from "../entity/dept.entity";
class DeptRepository{
    private dataSource:DataSource;

    constructor(private deptRepository:Repository<Department>)
    {}
    

    find = async (): Promise<Department[]> => {
        return this.deptRepository.find();  
      };
    
      findOneBy = async (filter: Partial<Department>): Promise<Department | null> => {
        return this.deptRepository.findOne({
          where: filter
        });
      };
    save = async (department: Department): Promise<Department> => {
        return this.deptRepository.save(department);
      };
      softRemove = async (department: Department): Promise<void> => {
        await this.deptRepository.softRemove(department);
      };
      update = async (department: Partial<Department>): Promise<Department> => {
        return this.deptRepository.save(department);
      };

 }

 export default DeptRepository;