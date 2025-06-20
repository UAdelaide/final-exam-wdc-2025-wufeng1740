INSERT INTO Users (username, email, password_hash, role) VALUES
('alice123',    'alice@example.com',   'hashed123', 'owner'),
('bobwalker',   'bob@example.com',     'hashed456', 'walker'),
('carol123',    'carol@example.com',   'hashed789', 'owner'),
('davidwalker', 'david@example.com',   'hashed101', 'walker'),
('emma123',     'emma@example.com',    'hashed202', 'owner');

INSERT INTO Dogs (name, size, owner_id) VALUES
('Max', 'medium', (SELECT id FROM users WHERE username = 'alice123')),
('Bella', 'small', (SELECT id FROM users WHERE username = 'carol123')),
('Rocky', 'large', (SELECT id FROM users WHERE username = 'emma123')),
('Charlie', 'medium', (SELECT id FROM users WHERE username = 'alice123')),
('Luna', 'small', (SELECT id FROM users WHERE username = 'carol123'));

INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
