-- Exercise 1 (done for you): Selecting all columns
SELECT * FROM users;



-- Exercise 2 (done for you): Selecting some columns
SELECT id, first_name, last_name 
FROM users;



-- Exercise 3: Sorting
SELECT * FROM users
ORDER BY last_name ASC;

SELECT * FROM users
ORDER BY id DESC;



-- Exercise 4: Filtering
SELECT * FROM users
WHERE first_name = 'Alice';

SELECT * FROM users
WHERE id > 5;



-- Exercise 5: Filtering with logical operators

SELECT * FROM users
WHERE first_name = 'Alice' OR last_name = 'Smith';

SELECT * FROM users
WHERE id > 5 AND first_name LIKE 'A%';


-- Exercise 6: Using functions in a select statement

SELECT COUNT(*) AS total_users FROM users;

SELECT first_name, LENGTH(first_name) AS name_length FROM users;


-- Exercise 7: Aggregating data

SELECT SUM(amount) AS total_amount FROM orders;

SELECT AVG(amount) AS average_amount FROM orders;


-- Exercise 8: Joining: two tables

SELECT u.first_name, u.last_name, o.amount
FROM users u
JOIN orders o ON u.id = o.user_id;



-- Exercise 9: More joining practice: two tables

SELECT u.first_name, u.last_name, o.amount, o.order_date
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.first_name = 'Alice';



-- Exercise 10: More joining practice: three tables (Optional)




-- Exercise 11: Inserting records

INSERT INTO users (first_name, last_name, email)
VALUES ('Charlie', 'Brown', 'charlie.brown@example.com');

INSERT INTO orders (user_id, order_date, amount)
VALUES (1, '2024-11-21', 150.00);


-- Exercise 12: Deleting records

DELETE FROM users
WHERE id = 5;

DELETE FROM orders
WHERE amount < 50;


-- Exercise 13: Updating records

UPDATE users
SET last_name = 'Johnson'
WHERE id = 2;

UPDATE orders
SET amount = 200.00
WHERE id = 3;


-- Exercise 14: More Querying Practice (Optional)
