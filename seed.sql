  
INSERT INTO department (name)
VALUES ("Admin"), ("Research and Development"), ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 200, 1), ("Engineer", 100, 2), ("Intern", 10, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1, 2), ("Dave", "Lee", 2, 1), ("June", "Carter", 3, 2);

