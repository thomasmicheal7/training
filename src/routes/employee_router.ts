// import express, { Request, Response } from "express";
// import Employee from "../entity/employee.entity";
// import dataSource from "../db/data-source.db";


// const employeeRouter = express.Router();
// const employees:Employee[]=[];
// let count =employees.length


// employeeRouter.get("/", async (req, res) => {
//     const employeeRepository = dataSource.getRepository(Employee);
//     const values = await employeeRepository.find();
//     res.status(200).send(values);
//   });

//   employeeRouter.get("/:id", async (req, res) => {
//     const employeeRepository = dataSource.getRepository(Employee);
//     const employee = await employeeRepository.findOneBy({
//       id: Number(req.params["id"]),
//   });
//     res.status(200).send(employee);
//   });

//   employeeRouter.post("/", async (req, res) => {
//     const newEmployee = new Employee();
//     newEmployee.email = req.body.email;
//     newEmployee.name = req.body.name;
//     const employeeRepository = dataSource.getRepository(Employee);
//     const savedEmployee = await employeeRepository.save(newEmployee);
//     res.status(200).send(savedEmployee);
//   });



// // employeeRouter.put("/:id", (req, res) => {
// //   const employee = employees.find((emp) => emp.id === Number(req.params["id"]));
// //   employee.email = req.body.email;
// //   employee.name = req.body.name;
// //   employee.updatedAt = new Date();
// //   console.log("update employees");
// //   res.status(200).send(employee);
// // });

// // employeeRouter.post("/", (req, res) => {
// //     console.log(req.body);
// //     const newEmployee = new Employee();
// //     newEmployee.email = req.body.email;
// //     newEmployee.name = req.body.name;
// //     newEmployee.createdAt = new Date();
// //     newEmployee.updatedAt = new Date();
// //     newEmployee.id = ++count;
// //     employees.push(newEmployee);
// //     res.status(200).send(newEmployee);
// //   });
  
// //   employeeRouter.delete("/:id", (req, res) => {
// //     console.log("delete employees");
// //     const employeeIdxToDelete = employees.findIndex(
// //       (emp) => emp.id === Number(req.params["id"])
// //     );
// //     employees.splice(employeeIdxToDelete, 1);
// //     res.status(200).send();
// //   });
  
// employeeRouter.delete("/:id", async (req, res) => {
//     const employeeRepository = dataSource.getRepository(Employee);
//     const result = await employeeRepository.softDelete({ id: Number(req.params["id"]) });
//     res.status(200).send(result);
//   });

//   employeeRouter.put("/:id", async (req, res) => {
//     const employeeRepository = dataSource.getRepository(Employee);
//     const employee = await employeeRepository.findOneBy({
//       id: Number(req.params["id"]),
//   });
//     employee.email = req.body.email;
//     employee.name = req.body.name;
//   const savedEmployee = await employeeRepository.save(employee);
//     res.status(200).send(employee);
//   });

// export default employeeRouter;


import EmployeeController from "../controller/employee.controller";
import dataSource from "../db/data-source.db";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/emploee.repository";
import EmployeeService from "../service/employee.service";

const employeeController = new EmployeeController(
  new EmployeeService(
    new EmployeeRepository(dataSource.getRepository(Employee))
  )
);
const employeeRouter = employeeController.router;

export default employeeRouter;





















