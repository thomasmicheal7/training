import { when } from "jest-when";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/emploee.repository";
import EmployeeService from "../service/employee.service";
import bcrypt from "bcrypt";


const newEmployee = {
    name: "John Doe",
  email: "john.doe@example.com",
  password: "securepassword123",
  role: "UI",

}

describe("Employee Service Test", () => {
    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;

    beforeAll(() => {
        const dataSource = {
            getRepository: jest.fn()
        };
        employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee)) as jest.Mocked<EmployeeRepository>;
        employeeService = new EmployeeService(employeeRepository);
    });

    it("should get all employees", async () => {
        employeeRepository.find = jest.fn().mockResolvedValueOnce([]);
        const employees = await employeeService.find();
        expect(employees).toEqual([]);
    });

    it('should return getEmployeeById', async () => {
        const mockedFunction = jest.fn();
        when(mockedFunction).calledWith({id: 123}).mockResolvedValue({"id": 123, "name": "Employee name"});
        employeeRepository.findOneBy = mockedFunction;
        const user = await employeeService.findByID(123);
        expect(user).toEqual({"id": 123, "name": "Employee name"});
        expect(mockedFunction).toHaveBeenCalledTimes(1);
    });
    
    // it("should throw not found exception when employee not found", async () => {
    //     jest.spyOn(employeeRepository, "findOneBy").mockResolvedValueOnce(null);
    //     expect(employeeService.findByID(123)).rejects.toThrow("not found");
    // });

    it("should delete the employee by id", async () => {
        const mockFunction = jest.fn();
        employeeRepository.softRemove = mockFunction;
        const response = await employeeService.deleteEmployee(123);
        expect(mockFunction).toHaveBeenCalledTimes(1);
    })

    it("should throw not found exception when employee not found", async () => {
        const mockedFunction = jest.fn();
        employeeRepository.findOneBy = mockedFunction;
        when(mockedFunction).calledWith({email: "abc@yopmail.com"}).mockResolvedValue(null);
        
        try {
            await employeeService.loginEmployee("abc@yopmail.com", "password");
        } catch (err) {
            expect(err).toEqual(new Error("Employee with given ID not found"));
        }
    });

    it("should throw password mismatch if password mismatch", async () => {
        const bcryptMock = jest.fn();
        when(bcryptMock)
            .calledWith("password", "11111111")
            .mockResolvedValue(false);
        bcrypt.compare = bcryptMock;

        const mockedFunction = jest.fn();
        when(mockedFunction)
            .calledWith({ email: "abc@yopmail.com" })
            .mockResolvedValue({
                email: "abc@yopmail.com",
                password: "password",
            });
        employeeRepository.findOneBy = mockedFunction;
        try {
            await employeeService.loginEmployee("abc@yopmail.com", "password");
        } catch (err) {
            expect(err).toEqual(new Error("Incorrect Password"));
        }
    });

    
});