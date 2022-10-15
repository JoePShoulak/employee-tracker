/* ==== SEED FILE ==== */

/* == DEPARTMENT == */
DROP TABLE department;
CREATE TABLE department (
    id int primary key,
    name VARCHAR(30)
);

INSERT INTO department (id, name) VALUES (1, "Technology");
INSERT INTO department (id, name) VALUES (2, "Operations");
INSERT INTO department (id, name) VALUES (3, "Human Resources");
INSERT INTO department (id, name) VALUES (4, "Finance");

/* == ROLE == */
DROP TABLE role;
CREATE TABLE role (
    id int primary key,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
);

INSERT INTO role (id, title, salary, department_id) VALUES (1, "Manager", 50000, 1);
INSERT INTO role (id, title, salary, department_id) VALUES (2, "Manager", 50000, 2);
INSERT INTO role (id, title, salary, department_id) VALUES (3, "Manager", 50000, 3);
INSERT INTO role (id, title, salary, department_id) VALUES (4, "Manager", 50000, 4);
INSERT INTO role (id, title, salary, department_id) VALUES (5, "Employee", 25000, 1);
INSERT INTO role (id, title, salary, department_id) VALUES (6, "Employee", 25000, 2);
INSERT INTO role (id, title, salary, department_id) VALUES (7, "Employee", 25000, 3);
INSERT INTO role (id, title, salary, department_id) VALUES (8, "Employee", 25000, 4);

/* == EMPLOYEE == */
DROP TABLE employee;
CREATE TABLE employee (
    id int primary key,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);

/* Managers */
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1, "Joe", "Shoulak", 1, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (2, "Judy", "Shoulak", 2, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (3, "Sarah", "Shoulak", 3, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (4, "Jake", "Shoulak", 4, null);

/* Employees */
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (5, "Alice", "Armstrong", 5, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (6, "Bob", "Barker", 5, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (7, "Chloe", "Clinton", 6, 2);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (8, "Don", "Davidson", 6, 2);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (9, "Ed", "Eckerson", 7, 3);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (10, "Frank", "Fitzwater", 7, 3);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (11, "Geroge", "van Geoth", 8, 4);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (12, "Harry", "Hayes", 8, 4);
