--Query One
INSERT INTO account (account_firstname, account_lastname, account_email, account_password) VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

--Query Two
UPDATE account SET account_type = "Admin" WHERE account_lastname = 'Stark';

--Query Three
DELETE account WHERE account_firstname = 'Tony';

--Query Four
SELECT * FROM inventory
Replace ("Do you have 6 kids and like to go offroading? The Hummer gives you the small interiors with an engine to get you out of any muddy or rocky situation", "small", "huge");

--Query Five
SELECT inv_model, inv_make, classification_name
FROM inventory i
INNER JOIN classification ON i.classification_id = classification.classification_id
WHERE classification_name = 'Sport';

--Query Six
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/image', '/image/vehicles');
UPDATE inventory
SET inv_thumbnail = REPLACE(inv_thumbnail, '/image', '/image/vehicles');