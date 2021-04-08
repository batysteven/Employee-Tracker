INSERT INTO departments (name)
VALUES
    ('Customer Service'),
    ('Technology'),
    ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Customer Service Rep', 35000, 1),
    ('Technology Rep', 60000, 2),
    ('Sales Rep', 70000, 3),
    ('Customer Service Manager', 50000, 1),
    ('Technology Manager', 75000, 2),
    ('Sales Manager', 90000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('James', 'Fraser', 4, null),
  ('Jack', 'London', 5, null),
  ('Robert', 'Bruce', 6, null),
  ('Peter', 'Greenaway', 2, 2),
  ('Derek', 'Jarman', 2, 2),
  ('Paolo', 'Pasolini', 2, 2),
  ('Heathcote', 'Williams', 1, 1),
  ('Sandy', 'Powell', 1, 1),
  ('Emil', 'Zola', 1, 1),
  ('Sissy', 'Coalpits', 1, 1),
  ('Antoinette', 'Capet', 1, 1),
  ('Samuel', 'Delany', 1, 1),
  ('Tony', 'Duvert', 1, 1),
  ('Dennis', 'Cooper', 3, 3),
  ('Monica', 'Bellucci', 3, 3),
  ('Samuel', 'Johnson', 3, 3),
  ('John', 'Dryden', 3, 3),
  ('Alexander', 'Pope', 3, 3),
  ('Lionel', 'Johnson', 3, 3),
  ('Wilkie', 'Collins', 3, 3);