-- Data for mySQL 

INSERT INTO department (department_name) VALUES ('Finance');
INSERT INTO department (department_name) VALUES ('Human Resources');
INSERT INTO department (department_name) VALUES ('Legal');
INSERT INTO department (department_name) VALUES ('Operations');
INSERT INTO department (department_name) VALUES ('Sales');
INSERT INTO role (role_title, role_salary, department_id) VALUES ('Accountant', 50000 , 1);
INSERT INTO role (role_title, role_salary, department_id) VALUES ('Employee Engagement', 50000, 2);
INSERT INTO role (role_title, role_salary, department_id) VALUES ('Lawyer',75000 , 3);
INSERT INTO role (role_title, role_salary, department_id) VALUES ('Director', 100000, 4);
INSERT INTO role (role_title, role_salary, department_id) VALUES ('Sales Lead', 75000 , 5);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Harry', 'Potter', 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Hermione', 'Granger', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Ronald', 'Weasley', 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Albus', 'Dumbledore', 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Lord', 'Voldemort', 5);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Minerva', 'McGonagall', 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Severus', 'Snape', 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Draco', 'Malfoy', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Neville', 'Longbottom', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Rubeus', 'Hagrid', 1);