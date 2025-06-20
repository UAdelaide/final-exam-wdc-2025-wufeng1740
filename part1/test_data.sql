INSERT INTO users (username, avatar, password, date_of_birth, address, email, isAdmin)
VALUES
  ('admin',    'img/logo_light-mode.png','admin',   '1991-04-14', '123 Main St',        'alice@example.com',  TRUE),
  ('alice',    '/avatars/default.png',   'pass123', '1990-01-01', '123 Main St',        'alice@example.com',  FALSE),
  ('bob',      '/avatars/default.png',   'pass123', '1985-05-12', '456 Oak Ave',        'bob@example.com',    FALSE);