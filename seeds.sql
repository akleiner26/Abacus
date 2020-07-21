INSERT INTO teachers (first_name, last_name, email, password, createdAt, updatedAt) VALUES ("Vince", "Gubitosi", "vince@email.com", "password1", "2020-07-20 00:00:00", "2020-07-20 00:00:00");

INSERT INTO students (first_name, last_name, email, teacher_id, password, createdAt, updatedAt) VALUES ("Studenthy", "Studentson", "student@email.com", 1, "password1", "2020-07-20 00:00:00", "2020-07-20 00:00:00");
 

INSERT INTO assignments (title, description, assignment_date, due_date, subject, createdAt, updatedAt) VALUES ("Assignment 1", "This is the first assignment of the year!", "2020-07-20", "0000-01-01", "Math! English! Science!", "2020-07-20 00:00:00", "2020-07-20 00:00:00");

INSERT INTO grades (Assignmentid, StudentId, gradeVal, createdAt, updatedAt) VALUES (1, 1, 100, "2020-07-20 00:00:00", "2020-07-20 00:00:00");
