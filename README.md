# Employee Database

## Description

The employee database is a command prompt driven application that can be used to organize a business based on the organization's employees, roles, and departments.  When the application is started the following question branches are displayed:
 - View Information
    - View All Departments
        - Displays the departments table
        - Returns to Main Menu
    - View All Roles
        - Displays the roles table
        - Returns to Main Menu
    - View All Employees
        - Displays the employees table
        - Returns to Main Menu
    - View Employees by a Manager
        - Choose a manager
            - Displays employees table filtered for the chosen manager
            - Returns to Main Menu 
    - View Employees by Department
        - Choose a department
            - Displays employees table filtered for the chosen department
            - Returns to Main Menu 
    - View Department's Utilized Budget
        - Displays department table grouped by department with total salary displayed
        - Returns to Main Menu 
    - Return to Main Menu        
        - Returns to Main Menu 
 - Add or Change Information
    - Add a department
        - Questions to receive information (department name)
        - Adds information to department table
        - Returns to Main Menu
    - Add a role
        - Questions to receive information (title,salary,department)
        - Adds information to role table
        - Returns to Main Menu
    - Add an employee
        - Questions to receive information (first_name,last_name,role,manager)
        - Adds information to employee table
        - Returns to Main Menu
    - Update an employee's role 
        - Choose an employee to update information
            - Choose new role
            - Role is update for selected employee
            - Returns to Main Menu
    - Update an employee's manager  
        - Choose an employee to update information
            - Choose new manager (or no manager)
            - Manager is update for selected employee
            - Returns to Main Menu  
    - Return to Main Menu        
       - Returns to Main Menu
 - Delete Information
    - Remove a department
        - Choose a department
            - Selected department is removed from table
            - Returns to Main Menu
    - Remove a role
        - Choose a role
            - Selected role is removed from table
            - Returns to Main Menu
    - Remove an employee    
        - Choose aan employee
            - Selected employee is removed from table
            - Returns to Main Menu
    - Return to Main Menu        
      - Returns to Main Menu 
 - Quit
    - End questions


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Questions](#questions)

## Installation

In order to run the program, you can download or clone the program from my GitHub site. In the root directory of the program, ensure all packages are available by typing 'npm init' and 'npm install' in the command line. You will also have to MySQL which can be downloaded at [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/) and create a file named .env with the following two lines:<br />
DB_USER='your-mysql-username'<br />
DB_PW='your-mysql-password'<br />
Then the program should be available to execute with "node server.js" or "npm start".  

## Usage

The employee database can be used to create a departments, roles and employee profiles for a business layout based on command line prompts. A video of how the program operates can be seen [here](https://drive.google.com/file/d/1pgGr1_5AQ7ZiWHgzSK3CGL2xa327lhWm/view
).

Screenshot showing sample output of database questions:
![Employee Database Screenshot](/img/Screenshot_sample_questions.png "Employee Database Screenshot")


## Questions

The Employee Database can be found on the following [GitHub page](https://github.com/kunkelkevin/employee-database).<br />If you have any additional questions, you can email me [here](mailto:kunkelkevin@yahoo.com)
