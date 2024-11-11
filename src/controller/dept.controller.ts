import { validate } from "class-validator";
import HttpException from "../exception/http.exception";
import EmployeeService from "../service/employee.service";
import express, { NextFunction, Request, Response } from "express";
import { CreateEmployeeDto } from "../dto/createEmployee.dto";
import { plainToInstance } from "class-transformer";
import { UpdateEmployeeDto } from "../dto/updateEmployee";
import IncorrectPasswordException from "../exception/incorrectPassword.exception";
import { ErrorCodes } from "../utils/error.code";
import { Role } from "../utils/role.enum";
import { RequestWithUser } from "../utils/requestWithUser";
import authorize from "../middleware/authorize.middleware";
import DeptService from "../service/dept.service";
import { CreateDepartmentDto } from "../dto/createDepartment.dto";

class DeptController {
  public router: express.Router;
  constructor(private deptService: DeptService) {
    this.router = express.Router();

    this.router.get("/", this.getAllDepartments);
    this.router.get("/:id", this.getDepartmentById);
    this.router.delete("/:id", this.deleteDepartment);
    this.router.put("/:id",this.updateDepartment);
    this.router.post("/",authorize,this.createDepartment);

  }

  public getAllDepartments = async (
    req: express.Request,
    res: express.Response
  ) => {
    const depts = await this.deptService.find();
    res.status(200).send(depts);
  };
  public getDepartmentById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const deptId = Number(req.params.id);
      const dept = await this.deptService.findByID(deptId);
      if (!dept) {
        const error = new Error(`No department found with id: ${req.params.id}`);
        throw error;
      }
      res.status(200).send(dept);
    } catch (error) {
      next(error);
    }
  };

  public createDepartment = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {

      const role=req.role;

      if(role!==Role.HR){
        throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED);
      }

      const dept = plainToInstance(CreateDepartmentDto, req.body);
      const errors = await validate(dept);

      
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }

      const savedDept = await this.deptService.createDept(
        dept.name
      );
      res.status(200).send(savedDept);
    } catch (error) {
      next(error);
    }
  };

  public deleteDepartment = async (
    req: express.Request,
    res: express.Response
  ) => {
    const deptId = Number(req.params.id);
    await this.deptService.deleteDept(deptId);
    res.status(200).send();
  };

  updateDepartment= async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dept = plainToInstance(CreateDepartmentDto, req.body);
      const errors = await validate(dept);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const id = parseInt(req.params.id);
      const currentDept = await this.deptService.findByID(id);
      const changes = { ...req.body };
      for (const property in changes) currentDept[property] = changes[property];
      const savedDept = await this.deptService.updateDept(
        currentDept
      );
      res.status(200).send(savedDept);
    } catch (error) {
      next(error);
    }
  };













}

export default DeptController;
