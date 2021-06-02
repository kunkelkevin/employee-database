const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// Get all employees
router.get("/employees", (req, res) => {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name,
                    role.title AS job_title,
                    department.name AS department,
                    role.salary AS salary,
                    CONCAT(manager.first_name, " ", manager.last_name) AS manager
                    FROM employee 
                    LEFT JOIN role 
                    ON employee.role_id = role.id
                    LEFT JOIN department
                    ON role.department_id = department.id
                    LEFT JOIN employee manager
                    ON employee.manager_id = manager.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Get all employees for choices
router.get("/employee", (req, res) => {
  const sql = `SELECT employee.id AS value, 
                  CONCAT (employee.first_name, " ", employee.last_name) AS name
                  FROM employee`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Get all but one employee
router.get("/employees/:id", (req, res) => {
  const sql = `SELECT employee.id AS value, 
                    CONCAT (employee.first_name, " ", employee.last_name) AS name
                    FROM employee 
                    WHERE employee.id != ${req.params.id}`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Get employees by manager
router.get("/employees/manager/:id", (req, res) => {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name,
                    role.title AS job_title,
                    department.name AS department,
                    role.salary AS salary,
                    CONCAT(manager.first_name, " ", manager.last_name) AS manager
                    FROM employee 
                    LEFT JOIN role 
                    ON employee.role_id = role.id
                    LEFT JOIN department
                    ON role.department_id = department.id
                    LEFT JOIN employee manager
                    ON employee.manager_id = manager.id
                    WHERE employee.manager_id = ${req.params.id}`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Get employees who are managers
router.get("/manager", (req, res) => {
  const sql = `SELECT DISTINCT manager.id AS value,
                      CONCAT(manager.first_name, " ", manager.last_name) AS name
                      FROM employee 
                      INNER JOIN employee manager
                      ON employee.manager_id = manager.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

router.get("/budget", (req, res) => {
  const sql = `SELECT department.name AS department,
      SUM(role.salary) AS utilized_budget
      FROM employee
      LEFT JOIN role 
      ON employee.role_id = role.id
      LEFT JOIN department
      ON role.department_id = department.id
      GROUP BY role.department_id ORDER BY utilized_budget DESC`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Get employees by department
router.get("/employees/department/:id", (req, res) => {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name,
                    role.title AS job_title,
                    department.name AS department,
                    role.salary AS salary,
                    CONCAT(manager.first_name, " ", manager.last_name) AS manager
                    FROM employee 
                    LEFT JOIN role 
                    ON employee.role_id = role.id
                    LEFT JOIN department
                    ON role.department_id = department.id
                    LEFT JOIN employee manager
                    ON employee.manager_id = manager.id
                    WHERE role.department_id = ${req.params.id}`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Create an employee
router.post("/employee", ({ body }, res) => {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
  params = [body.first_name, body.last_name, body.role_id, body.manager_id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});

// Update a employee's role
router.put("/employee/role/:id", (req, res) => {
  const sql = `UPDATE employee SET role_id = ? 
                 WHERE id = ?`;
  const params = [req.body.role_id, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Employee not found",
      });
    } else {
      res.json({
        message: "success",
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});

// Update a employee's manager
router.put("/employee/manager/:id", (req, res) => {
  const sql = `UPDATE employee SET manager_id = ? 
                   WHERE id = ?`;
  const params = [req.body.manager_id, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Employee not found",
      });
    } else {
      res.json({
        message: "success",
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});

// Delete an employee
router.delete("/employee/:id", (req, res) => {
  const sql = `DELETE FROM employee WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Employee not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

module.exports = router;
