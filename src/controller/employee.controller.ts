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

class EmployeeController {
  public router: express.Router;
  constructor(private employeeService: EmployeeService) {
    this.router = express.Router();

    this.router.get("/", this.getAllEmployees);
    this.router.get("/:id", this.getEmployeeById);
    this.router.delete("/:id", this.deleteEmployee);
    this.router.put("/:id",this.updateEmployee);
    this.router.post("/login",this.loginEmployee);
    this.router.post("/",authorize,this.createEmployee);

  }

  public loginEmployee=async(
    req:express.Request,
    res:express.Response,
    next:NextFunction
  )=>{
    const {email,password}=req.body;
    try{
        const token= await this.employeeService.loginEmployee(email,password);
        res.status(200).send({data:token});
    }
    catch(error){
        next(error);
    }
  }
  public getAllEmployees = async (
    req: express.Request,
    res: express.Response
  ) => {
    const employees = await this.employeeService.find();
    res.status(200).send(employees);
  };
  public getEmployeeById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const employeeId = Number(req.params.id);
      const employee = await this.employeeService.findByID(employeeId);
      if (!employee) {
        const error = new Error(`No employee found with id: ${req.params.id}`);
        throw error;
      }
      res.status(200).send(employee);
    } catch (error) {
      next(error);
    }
  };

  public createEmployee = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {

      const role=req.role;

      if(role!==Role.HR){
        throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED);
      }

      const employee = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(employee);

      
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }

      const savedEmployee = await this.employeeService.createEmployee(
        employee.email,
        employee.name,
        employee.address,
        employee.password,
        employee.role,
        employee.dept
      );
      res.status(200).send(savedEmployee);
    } catch (error) {
      next(error);
    }
  };

  public deleteEmployee = async (
    req: express.Request,
    res: express.Response
  ) => {
    const employeeId = Number(req.params.id);
    await this.employeeService.deleteEmployee(employeeId);
    res.status(200).send();
  };

  updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee = plainToInstance(UpdateEmployeeDto, req.body);
      const errors = await validate(employee);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const id = parseInt(req.params.id);
      const curremployee = await this.employeeService.findByID(id);
      const changes = { ...req.body };
      for (const property in changes) curremployee[property] = changes[property];
      const savedEmployee = await this.employeeService.updateEmployee(
        curremployee
      );
      res.status(200).send(savedEmployee);
    } catch (error) {
      next(error);
    }
  };













}

export default EmployeeController;
