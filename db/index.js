const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }
  //find all employees
  findAllEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, '',  manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id=role.id LEFT JOIN department on role.department_id=department.id LEFT JOIN employee manager on manager.id=employee.manager_id"
      );
  }

  //find all possible managers
  findAllPossibleManagers(employeeId) {
    return this.connection
      .promise()
      .query(
        "SELECT id, first_name, last_name FROM employee WHERE id != ?",
        employeeId
      );
  }

  //create new employee
  createEmployee(employee) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", employee);
  }

  //update employees role
  updateEmployeeRole(employeeId, roleId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE id=?", [
        roleId,
        employeeId,
      ]);
  }

  //update employee manager
  updateEmployeeManager(employeeId, maangerId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET manager_id = ? WHERE id=?", [
        maangerId,
        employeeId,
      ]);
  }

  //find all roles
  findAllRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id"
      );
  }

  //create a new role
  createRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }
  findAllDepartments() {
    return this.connection.query("SELECT department.id, department.name FROM department");
  }

  //find all departments
  // findAllEmployees() {
  //     return this.connection.promise().query();
  // }

  //create a new department
  createDepartment(department) {
    return this.connection
      .promise()
      .query("INSERT INTO department SET ?", department);
  }
  // findAllEmployees() {
  //     return this.connection.promise().query();
  // }
}
module.exports = new DB(connection);
