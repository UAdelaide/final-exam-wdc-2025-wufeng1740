INSERT INTO users (username, email, password_hash, role) VALUES
('alice123',    'alice@example.com',   'hashed123', 'owner'),
('bobwalker',   'bob@example.com',     'hashed456', 'walker'),
('carol123',    'carol@example.com',   'hashed789', 'owner'),
('davidwalker', 'david@example.com',   'hashed101', 'walker'),
('emma123',     'emma@example.com',    'hashed202', 'owner');

INSERT INTO dogs (name, size, owner_id) VALUES
