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
('ownerJane',    'jane@example.com',   'hashedpassword123', 'owner'),
('walkerMike',   'mike@example.com',     'hashedpassword456', 'walker'),
('ownerBob',    'bob@example.com',   'hashedpassword789', 'owner'),
('walkerDavid', 'david@example.com',   'hashed101', 'walker'),
('ownerEmma',     'emma@example.com',    'hashed202', 'owner');

INSERT INTO Dogs (name, size, owner_id) VALUES
('Buddy', 'medium', (SELECT user_id FROM Users WHERE username = 'ownerJane')),
('Lucy', 'small', (SELECT user_id FROM Users WHERE username = 'ownerJane')),
('Rocky', 'large', (SELECT user_id FROM Users WHERE username = 'ownerBob')),
('Daisy', 'medium', (SELECT user_id FROM Users WHERE username = 'ownerBob')),
('Milo', 'small', (SELECT user_id FROM Users WHERE username = 'ownerBob'));

INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
((SELECT dog_id FROM Dogs WHERE name = 'Buddy'), '2025-06-10 08:00:00', 30, 'Parklands', 'open'),
((SELECT dog_id FROM Dogs WHERE name = 'Lucy'), '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted'),
((SELECT dog_id FROM Dogs WHERE name = 'Rocky'), '2025-06-11 14:00:00', 60, 'Mountain Trail', 'open'),
((SELECT dog_id FROM Dogs WHERE name = 'Daisy'), '2025-06-12 10:15:00', 40, 'Downtown Park', 'completed'),
((SELECT dog_id FROM Dogs WHERE name = 'Milo'), '2025-06-13 16:30:00', 50, 'Riverside Walk', 'cancelled');

-- Insert Test Data for WalkRatings
INSERT INTO WalkRatings (request_id, rating, comments, walker_id, owner_id) VALUES
((SELECT request_id FROM WalkRequests WHERE status = 'completed' LIMIT 1), 5, 'Great service, very professional!',
 (SELECT user_id FROM Users WHERE username = 'walkerDavid'),
 (SELECT user_id FROM Users WHERE username = 'ownerJane'));