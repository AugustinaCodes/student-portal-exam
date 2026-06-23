-- Student Registration Portal seed data

-- 1. Insert Portal Users (Password for all: my password)
INSERT INTO users (email, password)
VALUES
  (
    'admin@student.com',
    '$2b$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa'
  ),
  (
    'staff@student.com',
    '$2b$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa'
  );

-- 2. Insert Main Courses (Study Programs)
INSERT INTO courses (title)
VALUES
  ('Web Development'),
  ('European History'),
  ('Data Science'),
  ('Graphic Design');

-- 3. Insert Modules / Subjects (with credit hours)
INSERT INTO modules (title, credits)
VALUES
  ('JavaScript Programming', 6),
  ('Introduction to HTML & CSS', 4),
  ('Database Management (SQL)', 5),
  ('The Renaissance Era', 6),
  ('Modern European Politics', 4),
  ('Python for Data Analysis', 6),
  ('UI/UX Design Fundamentals', 5);

-- 4. Insert Students (Linked to their main courses)
-- course_id 1 = Web Development, 2 = European History, 3 = Data Science
INSERT INTO students (first_name, last_name, course_id)
VALUES
  ('John', 'Doe', 1),       -- Web Development
  ('Jane', 'Smith', 1),     -- Web Development
  ('Mantas', 'Petraitis', 2),-- European History
  ('Elena', 'Vasiliūtė', 3);-- Data Science

-- 5. Assign Modules to Students (Enrollments)
-- John Doe (Student 1) taking Web Dev modules
INSERT INTO student_modules (student_id, module_id)
VALUES
  (1, 1), -- JavaScript Programming
  (1, 2), -- Introduction to HTML & CSS
  (1, 3); -- Database Management (SQL)

-- Jane Smith (Student 2) taking Web Dev modules
INSERT INTO student_modules (student_id, module_id)
VALUES
  (2, 1), -- JavaScript Programming
  (2, 2); -- Introduction to HTML & CSS

-- Mantas Petraitis (Student 3) taking History modules
INSERT INTO student_modules (student_id, module_id)
VALUES
  (3, 4), -- The Renaissance Era
  (3, 5); -- Modern European Politics

-- Elena Vasiliūtė (Student 4) taking Data Science & SQL modules
INSERT INTO student_modules (student_id, module_id)
VALUES
  (4, 3), -- Database Management (SQL)
  (4, 6); -- Python for Data Analysis