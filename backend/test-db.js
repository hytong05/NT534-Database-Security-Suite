const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  host: '10.0.2.149',
  port: 9393,
  user: 'acra_app',
  password: 'acra2025',
  database: 'acra_application',
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync('/home/hytong/Documents/Acra/backend/certs/ca.crt').toString(),
    key: fs.readFileSync('/home/hytong/Documents/Acra/backend/certs/backend_client.key').toString(),
    cert: fs.readFileSync('/home/hytong/Documents/Acra/backend/certs/backend_client.crt').toString()
  }
});

pool.connect((err, client, done) => {
  if (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  } else {
    console.log('Database connection successful');
    done();
    process.exit(0);
  }
});
