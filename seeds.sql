INSERT INTO teachers (first_name, last_name, email, password, createdAt, updatedAt) VALUES ("Vince", "Gubitosi", "vince@email.com", "password1", "2020-07-20 00:00:00", "2020-07-20 00:00:00");

INSERT INTO students (first_name, last_name, email, teacher_id, password, createdAt, updatedAt) VALUES ("Studenthy", "Studentson", "student@email.com", 1, "password1", "2020-07-20 00:00:00", "2020-07-20 00:00:00");
 

INSERT INTO assignments (title, description, assignment_date, due_date, subject, createdAt, updatedAt) VALUES ("Assignment 1", "This is the first assignment of the year!", "2020-07-20", "0000-01-01", "Math! English! Science!", "2020-07-20 00:00:00", "2020-07-20 00:00:00");

INSERT INTO grades (studentId, assignment_1, assignment_2, assignment_3, assignment_4, assignment_5, assignment_6, assignment_7, assignment_8, assignment_9, assignment_10, assignment_11, assignment_12, assignment_13, assignment_14, assignment_15, createdAt, updatedAt) VALUES (2, 60, 59, 96, 47, 57, 84, 58, 68, 43, 67, 86, 43, 56, 76, 54, "2020-07-20 00:00:00", "2020-07-20 00:00:00");