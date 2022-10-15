/* ==== SEED FILE ==== */
/* ==== SEED FILE ==== */
USE employee_tracker;

INSERT INTO department
(name)
VALUES
("Technology"),
("Operations"),
("Human Resources"),
("Finance");

INSERT INTO role 
(title, salary, department_id)
VALUES
("Manager", 50000, 1),
("Manager", 50000, 2),
("Manager", 50000, 3),
("Manager", 50000, 4),
("Employee", 25000, 1),
("Employee", 25000, 2),
("Employee", 25000, 3),
("Employee", 25000, 4);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
("Joe", "Shoulak", 1, null),
("Judy", "Shoulak", 2, null),
("Sarah", "Shoulak", 3, null),
("Jake", "Shoulak", 4, null),

("Alice", "Armstrong", 5, 1),
("Bob", "Barker", 5, 1),
("Chloe", "Clinton", 6, 2),
("Don", "Davidson", 6, 2),
("Ed", "Eckerson", 7, 3),
("Frank", "Fitzwater", 7, 3),
("Geroge", "van Geoth", 8, 4),
("Harry", "Hayes", 8, 4);
