import DeptController from "../controller/dept.controller";
import dataSource from "../db/data-source.db";
import Department from "../entity/dept.entity";
import DeptRepository from "../repository/department.repository";
import DeptService from "../service/dept.service";

const deptController = new DeptController(
  new DeptService(
    new DeptRepository(dataSource.getRepository(Department))
  )
);
const deptRouter = deptController.router;

export default deptRouter;
