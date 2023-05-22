
-- I write statement 'use database' before a lot of queries just to be able to practice and execute all of them separately,
-- at first, when I tried to write it only once at the beginning it didn't work, hovewer,
-- I figured out the issue, and it was because mysql thought that my comments are wrong commands because I did not include a space after two dashes.
-- Now I think it's fine :)

CREATE DATABASE mealsharing;
USE mealsharing;
CREATE TABLE meal (
    id INT NOT NULL AUTO_INCREMENT, 
    title VARCHAR(255),
    `description` TEXT,
    `location` VARCHAR(255),
    `when` DATETIME,
    max_reservations INT,
    price DECIMAL(3,2),
    created_date DATE,
    PRIMARY KEY(id)
);

CREATE TABLE reservation (
    id INT NOT NULL AUTO_INCREMENT,
    number_of_guests INT,
    meal_id INT,
    created_date DATE,
    contact_phonenumber VARCHAR(255),
    contact_name VARCHAR(255),
    contact_email VARCHAR(255),
    PRIMARY KEY(id),
    FOREIGN KEY (meal_id) REFERENCES meal(id)
);
USE mealsharing;
CREATE TABLE review (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    description TEXT,
    meal_id INT,
    stars INT,
    created_date DATE,
    PRIMARY KEY(id),
    FOREIGN KEY (meal_id) REFERENCES meal(id)
);

USE mealsharing;
ALTER TABLE meal
MODIFY price DECIMAL(5,2);
-- 1.Queries for the 'meal' table
-- Get all meals
USE mealsharing;
SELECT * FROM meal;
-- Add a new meal
USE mealsharing;
INSERT INTO meal 
VALUES (4, 'Cocoa', "Very tasty and smooth hot cocoa", "Aarhus", '2023-03-08 19:55:05', 5, 15.5, '2023-03-07');

USE mealsharing;
INSERT INTO meal 
VALUES (1, 'Smoothie', "Fresh tasty smoothie", "Aarhus", '2023-02-08 19:55:05', 3, 19.5, '2023-03-07');

USE mealsharing;
INSERT INTO meal 
VALUES (2, 'Syrnyky', "Amazing rare dish", "Aarhus", '2023-01-08 19:55:05', 1, 95.5, '2023-03-07');
--

USE mealsharing;
INSERT INTO meal 
VALUES (4, 'Cocoa', "Very tasty and smooth hot cocoa", "Aarhus", '2023-03-08 19:55:05', 5, 15.5, '2023-03-07');
--

USE mealsharing;
INSERT INTO meal 
VALUES (4, 'Borscht', "Very expensive borscht", "Aarhus", '2023-03-08 19:55:05', 5, 50, '2023-03-07');



-- Get a meal with any id
USE mealsharing;
SELECT * FROM meal
WHERE id = 4; 
-- Update a meal with any id
USE mealsharing;
UPDATE meal
SET price = 17.5
WHERE id = 4;
-- Delete a meal with any id
DELETE * FROM meal
WHERE id = 1; 

-- 2.Queries for the 'reservation' table

-- Get all reservations
USE mealsharing;
SELECT * FROM reservation;
-- Add a new reservation 
USE mealsharing;
INSERT INTO reservation 
VALUES (1, 3, 4, '2023-03-07', "+45 5035822", "Tom", "tomg@gmail.com");
-- Get a reservation with any id
USE mealsharing;
SELECT * FROM reservation
WHERE id = 1; 
-- Update a reservation with any id
USE mealsharing;
UPDATE reservation
SET contact_phonenumber = "+45 5035823"
WHERE id = 1;
-- Delete a reservation with any id
DELETE * FROM reservation
WHERE id = 1; 

-- 2.Queries for the 'review' table

-- Get all reviews
USE mealsharing;
SELECT * FROM review;
-- Add a new review
USE mealsharing;
INSERT INTO review
VALUES (1, "Good experience", "Amazing food, highly recommended", 4, 5, '2023-03-07');
-- Get a review with any id
USE mealsharing;
SELECT * FROM review
WHERE id = 1; 
-- Update a review with any id
USE mealsharing;
UPDATE review
SET created_date = '2023-03-05'
WHERE id = 1;
-- Delete a review with any id
DELETE * FROM review
WHERE id = 1; 
