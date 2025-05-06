// server.js - Backend server for SQL query application
const express = require('express');
const https = require('https');
const fs = require('fs');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 9000; // Updated to run on port 9000

const sslCa = fs.readFileSync("certs/ca.crt.pem");
const sslKey = fs.readFileSync('certs/backend.key.pem');
const sslCert = fs.readFileSync('certs/backend.crt.pem');

// Configure PostgreSQL connection pool
const pool = new Pool({
  host: '10.0.2.149',     // Database IP address
  port: 9393,             // Database port
  user: 'acra_app',       // Replace with your database username
  password: 'acra2025',   // Replace with your database password
  database: 'acra_application',   // Replace with your database name
  // If you need SSL, uncomment the line below
  ssl: { 
    rejectUnauthorized: true,
    ca: sslCa,
    key: sslKey,
    cert: sslCert,
    servername: '10.0.2.149'
  }
});

// Middleware
app.use(cors({
  origin: 'http://10.0.2.148:8000', // Cho phép frontend từ port 8000
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Đảm bảo backend phản hồi đúng cho yêu cầu OPTIONS
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  res.sendStatus(200);
});

// Test database connection on startup
pool.connect((err, client, done) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Database connection successful');
    done();
  }
});

// API endpoint to execute SQL queries
app.post('/api/query', async (req, res) => {
  const sqlQuery = req.body.query;
  
  if (!sqlQuery) {
    return res.status(400).json({ error: 'SQL query is required' });
  }

  try {
    console.log('Executing query:', sqlQuery);
    const result = await pool.query(sqlQuery);
    
    return res.json({
      success: true,
      rows: result.rows,
      rowCount: result.rowCount,
      fields: result.fields ? result.fields.map(f => ({
        name: f.name,
        dataTypeID: f.dataTypeID
      })) : []
    });
  } catch (error) {
    console.error('Query error:', error.message);
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Start secure HTTPS server
const serverOptions = {
  key: fs.readFileSync('certs/backend.key.pem'),
  cert: fs.readFileSync('certs/backend.crt.pem')
};

https.createServer(serverOptions, app).listen(port, '0.0.0.0', () => {
  console.log(`Secure server running on https://0.0.0.0:${port}`);
});
