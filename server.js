const express = require("express");
const db = require("./db/connection");
const apiRoutes = require("./routes");
const inquirer = require("inquirer");
const cTable = require("console.table");
const fetch = require("node-fetch");
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use("/api", apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    initialQuestions();
  });
});

const initialQuestions = () => {
  inquirer
    .prompt({
      type: "list",
      name: "type",
      message: "What type of action do you want to perform?",
      choices: [
        "View Information",
        "Add or Change Information",
        "Delete Information",
        "Quit",
      ],
    })
    .then(({ type }) => {
      switch (type) {
        case "View Information":
          viewQuestions();
          break;
        case "Add or Change Information":
          addQuestions();
          break;
        case "Delete Information":
          deleteQuestions();
          break;
        default:
          console.log("Thank you and have a good day!");
          break;
      }
    });
};

const viewQuestions = () => {
  inquirer
    .prompt({
      type: "list",
      name: "type",
      message: "What type of information would you like to see?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "View Employees by a Manager",
        "View Employees by Department",
        "View Department's Utilized Budget",
        "Return to Main Menu",
      ],
    })
    .then(({ type }) => {
      switch (type) {
        case "View All Departments":
          viewInformation("departments");
          break;
        case "View All Roles":
          viewInformation("roles");
          break;
        case "View All Employees":
          viewInformation("employees");
          break;
        case "View Employees by a Manager":
          viewEmployeesBy("manager");
          break;
        case "View Employees by Department":
          viewEmployeesBy("department");
          break;
        case "View Department's Utilized Budget":
          viewInformation("budget");
          break;
        default:
          initialQuestions();
          break;
      }
    });
};

const viewInformation = (type) => {
  const queryUrl = "http://localhost:3001/api/" + type;
  fetch(queryUrl)
    .then((response) => {
      if (!response.ok) {
        return alert("Error: " + response.statusText);
      }
      return response.json();
    })
    .then(({ data }) => {
      console.log(cTable.getTable(data));
      initialQuestions();
    });
};

const viewEmployeesBy = (type) => {
  const choicesUrl = "http://localhost:3001/api/" + type;
  fetch(choicesUrl)
    .then((response) => {
      if (!response.ok) {
        return alert("Error: " + response.statusText);
      }
      return response.json();
    })
    .then(({ data }) => {
      inquirer
        .prompt({
          type: "list",
          name: "id",
          message: `Which ${type} would you like to view?`,
          choices: data,
        })
        .then(({ id }) => {
          const queryUrl =
            "http://localhost:3001/api/employees/" + type + "/" + id;
          fetch(queryUrl)
            .then((response) => {
              if (!response.ok) {
                return alert("Error: " + response.statusText);
              }
              return response.json();
            })
            .then(({ data }) => {
              console.log(cTable.getTable(data));
              initialQuestions();
            });
        });
    });
};

const addQuestions = () => {
  inquirer
    .prompt({
      type: "list",
      name: "type",
      message: "What type of information would you like to create/change?",
      choices: [
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee's Role",
        "Update an Employee's Manager",
        "Return to Main Menu",
      ],
    })
    .then(({ type }) => {
      switch (type) {
        case "Add a Department":
          addDepartment();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an Employee's Role":
          updateInformation("role");
          break;
        case "Update an Employee's Manager":
          updateInformation("manager");
          break;
        default:
          initialQuestions();
          break;
      }
    });
};

const deleteQuestions = () => {
  inquirer
    .prompt({
      type: "list",
      name: "type",
      message: "What type of information would you like to remove?",
      choices: [
        "Remove a Department",
        "Remove a Role",
        "Remove an Employee",
        "Return to Main Menu",
      ],
    })
    .then(({ type }) => {
      switch (type) {
        case "Remove a Department":
          deleteInformation(department);
          break;
        case "Remove a Role":
          deleteInformation(role);
          break;
        case "Remove an Employee":
          deleteInformation(employee);
          break;
        default:
          initialQuestions();
          break;
      }
    });
};

const addEmployee = () => {
  let role = [];
  const choicesUrl = "http://localhost:3001/api/role";
  fetch(choicesUrl)
    .then((response) => {
      if (!response.ok) {
        return alert("Error: " + response.statusText);
      }
      return response.json();
    })
    .then(({ data }) => {
      role = data;
      const choices2Url = "http://localhost:3001/api/employee";

      fetch(choices2Url)
        .then((response) => {
          if (!response.ok) {
            return;
          }
          return response.json();
        })
        .then(({ data }) => {
          inquirer
            .prompt([
              {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name:",
                validate: (nameInput) => {
                  if (nameInput) {
                    return true;
                  } else {
                    console.log("\nPlease enter a name!");
                    return false;
                  }
                },
              },
              {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name:",
                validate: (nameInput) => {
                  if (nameInput) {
                    return true;
                  } else {
                    console.log("\nPlease enter a name!");
                    return false;
                  }
                },
              },
              {
                type: "list",
                name: "role_id",
                message: `What role will the employee have:`,
                choices: role,
              },
              {
                type: "list",
                name: "manager_id",
                message: `Who is this employee's manager:`,
                choices: data,
              },
            ])
            .then(({ first_name, last_name, role_id, manager_id }) => {
              const body = {
                first_name: first_name,
                last_name: last_name,
                role_id: role_id,
                manager_id: manager_id,
              };
              const queryUrl = "http://localhost:3001/api/employee";
              fetch(queryUrl, {
                method: "post",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
              })
                .then((response) => {
                  if (!response.ok) {
                    return alert("Error: " + response.statusText);
                  }
                  return response.json();
                })
                .then(({ data }) => {
                  console.log(
                    `You added a new employee: ${data.first_name} ${data.last_name}`
                  );
                  initialQuestions();
                });
            });
        });
    });
};

const addRole = () => {
  const choicesUrl = "http://localhost:3001/api/department";
  fetch(choicesUrl)
    .then((response) => {
      if (!response.ok) {
        return alert("Error: " + response.statusText);
      }
      return response.json();
    })
    .then(({ data }) => {
      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "What is the job title:",
            validate: (nameInput) => {
              if (nameInput) {
                return true;
              } else {
                console.log("\nPlease enter a title!");
                return false;
              }
            },
          },
          {
            type: "input",
            name: "salary",
            message: "What is the positions salary:",
            validate: (nameInput) => {
              if (nameInput) {
                return true;
              } else {
                console.log("\nPlease enter the salary!");
                return false;
              }
            },
          },
          {
            type: "list",
            name: "department_id",
            message: `What department is this position located:`,
            choices: data,
          },
        ])
        .then(({ title, salary, department_id }) => {
          const body = {
            title: title,
            salary: salary,
            department_id: department_id,
          };
          const queryUrl = "http://localhost:3001/api/role";
          fetch(queryUrl, {
            method: "post",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => {
              if (!response.ok) {
                return alert("Error: " + response.statusText);
              }
              return response.json();
            })
            .then(({ data }) => {
              console.log(`You added a new position: ${title}`);
              initialQuestions();
            });
        });
    });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department:",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("\nPlease enter a name!");
            return false;
          }
        },
      },
    ])
    .then(({ name }) => {
      const body = { name };
      const queryUrl = "http://localhost:3001/api/department";
      fetch(queryUrl, {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (!response.ok) {
            return alert("Error: " + response.statusText);
          }
          return response.json();
        })
        .then(({ data }) => {
          console.log(`You added a new department: ${name}`);
          initialQuestions();
        });
    });
};

const updateInformation = (type) => {
  console.log(type);
  const queryUrl = "http://localhost:3001/api/employee";
  let putUrl = `http://localhost:3001/api/employee/${type}/`;
  let choicesUrl = "http://localhost:3001/api/";
  console.log(putUrl);
  fetch(queryUrl)
    .then((response) => {
      if (!response.ok) {
        return alert("Error: " + response.statusText);
      }
      return response.json();
    })
    .then(({ data }) => {
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee_id",
            message: "Which employee would you like to update:",
            choices: data,
          },
        ])
        .then(({ employee_id }) => {
          putUrl += employee_id;
          if (type === "role") {
            choicesUrl += "role";
          } else {
            choicesUrl += `employees/${employee_id}`;
          }
          fetch(choicesUrl)
            .then((response) => {
              if (!response.ok) {
                return alert("Error: " + response.statusText);
              }
              return response.json();
            })
            .then(({ data }) => {
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "id",
                    message: "Choose what you would like to update:",
                    choices: data,
                  },
                ])
                .then(({ id }) => {
                  const body = { id };
                  console.log(putUrl);
                  fetch(putUrl, {
                    method: "put",
                    body: JSON.stringify(body),
                    headers: { "Content-Type": "application/json" },
                  })
                    .then((response) => {
                      if (!response.ok) {
                        return console.log("Error: " + response.statusText);
                      }
                      return response.json();
                    })
                    .then(() => {
                      console.log(`You updated a ${type}`);
                      initialQuestions();
                    });
                });
            });
        });
    });
};

const deleteInformation = (type) => {};
