const { prompt } = require("inquirer");
const  db =require("./db")
require("console.table")

mainPrompt();
function mainPrompt() {
    prompt([
        {
            type: "list", 
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "view all departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "view all roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "view all employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "add a department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "add a role",
                    value: "ADD_ROLE"
                },    
                {
                    name: "add an employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "update an employee role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "quit",
                    value: "QUIT"
                }
            ]
        }
    ]).then(res => {
        let choice = res.choice;
        switch(choice){
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;
            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "VIEW_ROLES":
                viewRoles();
                break;
            case "VIEW_DEPARTMENTS":
                viewDepartments();
                break;
                default:
                quit();
        }
    })
}
function viewDepartments() {
    db.findAllDepartments().then(([rows])=>{
        let departments = rows;
        console.table(departments)
    }) 
    .then(()=>mainPrompt()); 
}
function viewRoles() {
    db.findAllRoles().then(([rows])=>{
        let roles = rows;
        console.table(roles)
    }) 
    .then(()=>mainPrompt()); 
}
function viewEmployees() {
    db.findAllEmployees().then(([rows])=>{
        let employees = rows;
        console.table(employees)
    }) 
    .then(()=>mainPrompt()); 
}
function addDepartment() {
    prompt ([
        {
            name: "name",
            message: "what is the name of the department?"
        }
    ])
    .then (res=>{
        let name = res;
    db.createDepartment(name)
    .then(()=>console.log(`added ${name.name}to the database`))
        .then(()=>mainPrompt())
    }) 

}
function addEmployee() {
    prompt ([
        {
            name: "first_name",
            message: "what is the employee's first name?"
        },
        {
            name: "last_name",
            message: "what is the employee's last name?"
        }
    ])
    .then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;

    db.findAllRoles()
    .then(([rows]) => {
        let roles = rows;
        const roleChoices= roles.map(({ id, title})=>({
            name: title, 
            value: id
        }));
        prompt ({
            type: "list",
            name: "roleId",
            message: "what is the employee role?",
            choices: roleChoices
        })
        .then(res=> {
            let roleId = res.roleId; 
        // console.log(`added ${name.name}to the database`)
    db.findAllEmployees()
        .then(([rows])=>{
            let employees = rows;
            const managerChoices = employees.map(({ id, first_name, last_name})=>({
                name: ` ${first_name} ${last_name}`,
                value: id
            }));
            managerChoices.unshift({ name: "none" , value: null});
            prompt ({
                type: "list",
                name: "managerId",
                message: "what is the employee's manager?",
                choices: roleChoices
            })
            .then(res =>{
                let employee = {
                    manager_id: res.managerId,
                    role_id: roleId,
                    first_name: firstName,
                    last_name: lastName
                }
            db.createEmployee(employee)    
            }) 
            .then(()=> console.log(`${firstName} ${lastName} was added to the database`))
            .then(()=>mainPrompt())
            }) 
          }) 
        }) 
    }) 
}


function updateEmployeeRole() {
    db.findAllEmployees()
    .then(([rows])=>{
        let employees = rows;
        const employeeChoices = employees.map(({ id, first_name, last_name })=>({
            name: `${first_name} ${last_name}`,
            value: id
        }));
    prompt([
        {
            type: "list", 
            name: "employeeId",
            message: "Which employee role do you want to update?",
            choices: employeeChoices 
            } 
        ])
        .then(res =>{
            let employeeId = res.employeeId;
            db.findAllRoles()
            .then(([rows])=>{
                let roles = rows;
            const roleChoices = roles.map(({ id, title })=>({
                name: title,
                value: id
            }));
    prompt([
        {
            type: "list", 
            name: "roleId",
            message: "Which role do you want to assign the selected employee?",
            choices: roleChoices
        }
    ])
    .then(res => db.updateEmployeeRole(employeeId, res.roleId))
    .then(()=> console.log("Updated employee's role"))
    .then(()=> mainPrompt())
    });
    });
    })
}


function addRole() {
    db.findAllDepartments()
    .then(([rows])=>{
        let departments = rows;
    const departmentChoices = departments.map(({ id, name })=>({
        name: name,
        value: id
    }));
    prompt([
                {
                    name: "title",
                    message: "What is the name of the role?"
                },
                {
                    name: "salary",
                    message: "What is the salary of the role?"
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Which department does the role belong to?",
                    choices: departmentChoices
                }
    ])
    .then(role => { db.createRole(role)
    .then(()=> console.log(`added ${role.title} to the database`))
    .then(()=> mainPrompt())
})
})
}

function quit() {
    console.log("Goodbye");
    process.exit();
}