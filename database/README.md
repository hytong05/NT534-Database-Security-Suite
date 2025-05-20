# Database Setup for Acra Application

## 1. Introduction

<p align="center">
  <img src="../src/postgresql.png" alt="PostgreSQL_Logo" width="500"/>
</p>

[PostgreSQL](https://www.postgresql.org/) is a powerful, open-source object-relational database system. It is renowned for its robustness, extensibility, and standards compliance. PostgreSQL supports advanced data types, complex queries, transactional integrity, and full ACID compliance. It is suitable for both small applications and large-scale enterprise solutions, making it an excellent choice for e-commerce platforms that require reliability, security, and scalability.

The database for this e-commerce application consists of four main tables:

- **`users`**: Stores user account information.
- **`products`**: Stores product details.
- **`orders`**: Stores order transactions.
- **`order_details`**: Stores detailed items within each order.

The schema also includes indexes to optimize query performance.

---

## 2. PostgreSQL Setup

### 2.1. Install PostgreSQL

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

### 2.2. Start PostgreSQL Service

```bash
sudo systemctl start postgresql
```

### 2.3. Access PostgreSQL Prompt

```bash
sudo -u postgres psql
```
or, if you have a user with database privileges:
```bash
psql -U <your_db_user>
```

---

## 3. Create and Initialize the Database

### 3.1. Create Database and User

```sql
-- Create the database user
CREATE USER acra_user WITH PASSWORD 'your_secure_password';

-- Create the database
CREATE DATABASE acra_application OWNER acra_user;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE acra_application TO acra_user;
```

### 3.2. Connect to the Database

```bash
psql -U acra_user -d acra_application
```

---

## 4. Create Tables and Indexes

```bash
psql -U <username> -d <database_name> -f create_database.sql
```

---

## 5. Insert Sample Data

```bash
psql -U <username> -d <database_name> -f samples.sql
```

---

## 6. Notes

- All monetary values are in VND.
- Change usernames, passwords, and database names as appropriate for your environment.
- The schema and sample data are for demonstration and development purposes. Adjust as needed for production use.

---

## 7. TLS Connection Setup

To enhance the security of database communications, it is recommended to enable TLS (SSL) connections between your application (or Acra components) and PostgreSQL.

### 7.1. Get TLS Certificates

The required TLS certificates and private keys have already been generated and are stored in the `acra_tls_certs` folder.

The folder contains the following files:
- `ca.crt.pem` – Root Certificate Authority (CA) certificate
- `database.key.pem` – PostgreSQL server private key
- `database.crt.pem` – PostgreSQL server certificate
- `database.csr.pem` – Certificate Signing Request (CSR) for the database server

You can use these certificates for secure connections between your application (or AcraServer) and PostgreSQL.

### 7.2. Configure PostgreSQL for TLS

Edit your `postgresql.conf`:

```
ssl = on
ssl_cert_file = 'database.crt.pem'
ssl_key_file = 'database.key.pem'
```

Copy the relevant certificate and key files from `acra_tls_certs` to the PostgreSQL data directory and set proper permissions:

```bash
cp acra_tls_certs/database.crt.pem acra_tls_certs/database.key.pem /var/lib/postgresql/data/
chown postgres:postgres /var/lib/postgresql/data/database.*
chmod 600 /var/lib/postgresql/data/database.key.pem
```

Restart PostgreSQL:

```bash
sudo systemctl restart postgresql
```

### 7.3. Configure Client to Use TLS

When connecting with `psql` or other clients, use the `sslmode` parameter and point to the CA certificate if needed:

```bash
psql "host=localhost dbname=acra_application user=acra_user sslmode=require sslrootcert=acra_tls_certs/ca.crt.pem"
```

- For production, use certificates signed by a trusted CA and set up client certificate authentication if required.
- Update your application's database connection string to require or verify TLS, depending on your security policies.

## 8. Directory Structure

Below is the structure of the `database` folder and its key contents:

```text
database/
├── acra_tls_certs/          # Folder containing TLS certificates and keys for PostgreSQL
│   ├── ca.crt.pem           # Root CA certificate
│   ├── database.crt.pem     # PostgreSQL server certificate
│   ├── database.csr.pem     # Certificate Signing Request for the database
│   └── database.key.pem     # PostgreSQL server private key
├── create_database.sql      # SQL script to create tables and indexes
├── samples.sql              # SQL script to insert sample data
└── README.md                # This documentation file
```
---
