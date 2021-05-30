INSERT INTO department
  (name)
VALUES
  ('Operations'),
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Employee Development');

  INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Manager',210000,1),
  ('Engineering Lead',150000,3),
  ('Sales Lead',130000,2),
  ('Financial Officer Senior',140000,4),
  ('Trainee',50000,5),
  ('Engineer',95000,3),
  ('Sales Person',75000,2),
  ('Sales Assistant',60000,2),
  ('Financial Officer',80000,4);

INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Kevin', 'Kunkel', 1, NULL),
  ('Holden', 'Cawfield', 2, 1),
  ('Stephanie', 'Little', 3, 1),
  ('Callum', 'Richards', 4, 1),
  ('Asher', 'Doe', 5, 2),
  ('John', 'Johnson', 6, 2),
  ('Jane', 'Carmicheal', 6, 2),
  ('Brandon', 'Fraser', 5, 3),
  ('Melissa', 'Firbank', 7, 3),
  ('Ronald', 'Styles', 7, 3),
  ('Mary', 'Jordan', 8, 3),
  ('Ginger', 'Francis', 5, 4),
  ('Marley', 'Chestnut', 9, 4);