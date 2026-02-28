-- insert all data into the tables
INSERT INTO authors VALUES (1, 'john', 'description 1'); --id,name,description

--insert few details
INSERT INTO authors (name, description) VALUES ('J. R. R. Tolkien', 'description 2'); -- no id

-- insert data into tables with foreign key constraints
INSERT INTO books VALUES (123, 'book title', 'description', 1); -- book_id, title, description, author_id

INSERT INTO books (book_id, title, description, author_id) VALUE (456, 'The Random Book', 'This book is so random', 4); -- This fails because the author_id does not exist in the authors table.

INSERT INTO reviews (book_id, rating, review) VALUES (123, 5, 'This is a great book!'), (234, 5, 'This is an awesome book!'), (234, 5, 'This is an awesome book!');
INSERT INTO reviews (book_id, rating, review) VALUES (123, 4, 'This is a good book!'), (234, 4, 'This is okay!'), (234, 1, 'Boring!');

INSERT INTO employees VALUES (1, 'Peter Parker', NULL, '123456789V');

INSERT INTO employees (name, supervisor_id, nic) VALUES ('Mary Jane', 1, '987654321V');

INSERT INTO member_cards (issued_date) VALUES ('2018-01-01');
INSERT INTO member_cards (issued_date) VALUES ('2020-01-01');
INSERT INTO member_cards (issued_date) VALUES ('2022-01-01');

INSERT INTO members VALUES (1, 'Sirisena', '1960-04-01', '123 Main Street', 'Colombo', '00100', 1);

INSERT INTO members (name, date_of_birth, street, city, postal_code, card_id) VALUES ('Guna Pala', '1990-01-01', '123 Main Street', 'Colombo', '00100', 2);

INSERT INTO members (name, date_of_birth, street, city, postal_code, card_id) VALUES ('Nandasena', '1970-04-01', '123 Main Street', 'Mirihana', '00200', 3);

INSERT INTO telephone_numbers VALUES ('0111234567', 1);
INSERT INTO telephone_numbers VALUES ('0111234568', 1);
INSERT INTO telephone_numbers VALUES ('0111234569', 2);


INSERT INTO borrowings VALUES (1, 1, 1, '2018-01-01', '2018-01-08', 1);

INSERT INTO borrowings (book_id, member_id, issued_at, due_date) VALUES (234, 1, '2018-01-01', '2018-01-08'); -- This fails because the member_id does not exist in the members table.

INSERT INTO borrowings (book_id, member_id, issued_at, due_date, employee_id) VALUES (123, 1, '2018-01-01', '2018-01-08', 2);

INSERT INTO borrowings (book_id, member_id, issued_at, due_date, employee_id) VALUES (234, 3, '2019-01-01', '2019-01-08', 2);