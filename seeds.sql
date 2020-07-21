INSERT INTO teachers (first_name, last_name, email, password, createdAt, updatedAt) VALUES ("Vince", "Gubitosi", "vince@email.com", "password1", "2020-07-20 00:00:00", "2020-07-20 00:00:00");

INSERT INTO students (first_name, last_name, teacher_id, createdAt, updatedAt) 
VALUES ("Studenthy", "Studentson", 1, "2020-07-20 00:00:00", "2020-07-20 00:00:00"),
("Andrew", "Kleiner", 1, "2020-07-20 00:00:00", "2020-07-20 00:00:00"),
("Tim", "Winters", 2, "2020-07-20 00:00:00", "2020-07-20 00:00:00"),
("Esther", "Min", 2, "2020-07-20 00:00:00", "2020-07-20 00:00:00");
 
INSERT INTO assignments (title, description, assignment_date, due_date, subject, createdAt, updatedAt) 
VALUES ("Assignment 1", "This is the first assignment of the year!", "2020-07-20", "0000-01-01", "Math", "2020-07-20 00:00:00", "2020-07-20 00:00:00"),
("Assignment 2", "This is the second assignment of the year!", "2020-07-20", "0000-01-01", "English", "2020-07-20 00:00:00", "2020-07-20 00:00:00"),
("Assignment 3", "This is the third assignment of the year!", "2020-07-20", "0000-01-01", "Science", "2020-07-20 00:00:00", "2020-07-20 00:00:00"),
("Assignment 4", "This is the fourth assignment of the year!", "2020-07-20", "0000-01-01", "Math", "2020-07-20 00:00:00", "2020-07-20 00:00:00");

INSERT INTO grades (gradeVal, createdAt, updatedAt, AssignmentId, StudentId) 
VALUES (95, "2020-07-20 00:00:00", "2020-07-20 00:00:00", 1, 1),
(80, "2020-07-20 00:00:00", "2020-07-20 00:00:00", 2, 1),
(92, "2020-07-20 00:00:00", "2020-07-20 00:00:00", 3, 1),
(100, "2020-07-20 00:00:00", "2020-07-20 00:00:00", 1, 2),
(95, "2020-07-20 00:00:00", "2020-07-20 00:00:00", 2, 2);
