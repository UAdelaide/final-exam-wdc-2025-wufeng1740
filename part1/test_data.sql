-- User Setup ------------------------------------------------------------
-- DROP USER IF EXISTS 'admin'@'localhost';
-- DROP USER IF EXISTS 'admin'@'127.0.0.1';
-- DROP USER IF EXISTS 'admin'@'%';
-- FLUSH PRIVILEGES;
-- CREATE USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';
-- CREATE USER 'admin'@'127.0.0.1' IDENTIFIED WITH mysql_native_password BY 'admin123';
-- CREATE USER 'admin'@'%' IDENTIFIED WITH mysql_native_password BY 'admin123';
-- GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;
-- GRANT ALL PRIVILEGES ON *.* TO 'admin'@'127.0.0.1' WITH GRANT OPTION;
-- GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;
-- FLUSH PRIVILEGES;

-- Use Database -------------------------------------------------------
USE DogWalkService;

-- Clean Data ------------------------------------------------------------
SET FOREIGN_KEY_CHECKS = 0;
/* clean data and reset id number*/
TRUNCATE TABLE WalkRequests;
TRUNCATE TABLE Dogs;
TRUNCATE TABLE Users;
SET FOREIGN_KEY_CHECKS = 1;

-- Insert Test Data -------------------------------------------------------
INSERT INTO Users (username, email, password_hash, role) VALUES
('alice123',    'alice@example.com',   'hashed123', 'owner'),
('bobwalker',   'bob@example.com',     'hashed456', 'walker'),
('carol123',    'carol@example.com',   'hashed789', 'owner'),
('davidwalker', 'david@example.com',   'hashed101', 'walker'),
('emma123',     'emma@example.com',    'hashed202', 'owner');

INSERT INTO Dogs (name, size, owner_id) VALUES
('Max', 'medium', (SELECT user_id FROM Users WHERE username = 'alice123')),
('Bella', 'small', (SELECT user_id FROM Users WHERE username = 'carol123')),
('Rocky', 'large', (SELECT user_id FROM Users WHERE username = 'emma123')),
('Charlie', 'medium', (SELECT user_id FROM Users WHERE username = 'alice123')),
('Luna', 'small', (SELECT user_id FROM Users WHERE username = 'carol123'));

INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
((SELECT dog_id FROM Dogs WHERE name = 'Max'), '2025-06-10 08:00:00', 30, 'Parklands', 'open'),
((SELECT dog_id FROM Dogs WHERE name = 'Bella'), '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted'),
((SELECT dog_id FROM Dogs WHERE name = 'Rocky'), '2025-06-11 14:00:00', 60, 'Mountain Trail', 'open'),
((SELECT dog_id FROM Dogs WHERE name = 'Charlie'), '2025-06-12 10:15:00', 40, 'Downtown Park', 'completed'),
((SELECT dog_id FROM Dogs WHERE name = 'Luna'), '2025-06-13 16:30:00', 50, 'Riverside Walk', 'cancelled');

-- Insert Test Data for WalkRatings
INSERT INTO WalkRatings (request_id, rating, comment, rating_date) VALUES
((SELECT walk_request_id FROM WalkRequests WHERE status = 'completed' LIMIT 1), 5, 'Great service, very professional!', '2025-06-12 11:00:00');