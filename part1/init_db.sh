#!/bin/bash

# Set database username and password (modify as needed)
DB_USER="admin"
DB_PASS="admin123"
DB_NAME="marketplace"
SQL_FILE="database/db_init.sql"
USER_SQL_FILE="database/create_user.sql"

# set user and password file
echo "🔧 Generating SQL for creating DB user..."
cat > $USER_SQL_FILE <<EOF
DROP USER IF EXISTS '$DB_USER'@'localhost';
DROP USER IF EXISTS '$DB_USER'@'127.0.0.1';
DROP USER IF EXISTS '$DB_USER'@'%';
FLUSH PRIVILEGES;
CREATE USER '$DB_USER'@'localhost' IDENTIFIED WITH mysql_native_password BY '$DB_PASS';
CREATE USER '$DB_USER'@'127.0.0.1' IDENTIFIED WITH mysql_native_password BY '$DB_PASS';
CREATE USER '$DB_USER'@'%' IDENTIFIED WITH mysql_native_password BY '$DB_PASS';
GRANT ALL PRIVILEGES ON *.* TO '$DB_USER'@'localhost' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON *.* TO '$DB_USER'@'127.0.0.1' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON *.* TO '$DB_USER'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EOF

# Create .env file with database configuration
echo "🔧 Creating .env file with database configuration..."
cat > .env <<EOL
DB_USER=$DB_USER
DB_PASS=$DB_PASS
DB_NAME=$DB_NAME
EOL
echo "✅ .env file created in current directory."