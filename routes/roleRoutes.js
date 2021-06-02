const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// Get all employees and related information
router.get("/roles", (req, res) => {
  const sql = `SELECT role.id, role.title, role.salary,
                  department.name AS department
                  FROM role 
                  LEFT JOIN department
                  ON role.department_id = department.id`;

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

// Get roles for choices
router.get("/role", (req, res) => {
  const sql = `SELECT DISTINCT role.id AS value, role.title AS name FROM role`;

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

// Create a role
router.post("/role", ({ body }, res) => {
  const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
  params = [body.title, body.salary, body.department_id];

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

// Delete a role
router.delete("/role/:id", (req, res) => {
  const sql = `DELETE FROM role WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Job title not found",
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
