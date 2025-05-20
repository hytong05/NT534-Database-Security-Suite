# Backend Setup Guide

---

## 1. Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [pm2](https://pm2.keymetrics.io/) process manager for Node.js

---

## 2. Install Dependencies

Navigate to the `backend` directory and install the required packages:

```bash
cd backend
npm install
```

---

## 3. Running the Backend with pm2

### 3.1. Install pm2 (if not already installed)

```bash
npm install -g pm2
```

### 3.2. Start the Backend Application

```bash
pm2 start npm --name "backend" -- run start
```
- This command starts the backend using pm2 and names the process `backend`.

### 3.3. Monitor and Manage the Backend Process

- To see running pm2 processes:
  ```bash
  pm2 list
  ```
- To view logs:
  ```bash
  pm2 logs backend
  ```
- To stop the backend:
  ```bash
  pm2 stop backend
  ```
- To restart the backend:
  ```bash
  pm2 restart backend
  ```

---

## 4. Configuration

- Ensure your environment variables (such as database connection strings, ports, secrets, etc.) are set up as required by your application.
- You may use a `.env` file in the backend directory to manage environment variables. Refer to the project documentation or `.env.example` (if available) for variable names and descriptions.

---

## 5. Access the Backend

- By default, the backend will be available at [http://localhost:5000](http://localhost:5000) unless configured otherwise in your environment variables or configuration files.

---

## 6. Additional Notes

- Ensure that your database service and any dependencies (such as AcraServer, if used for security) are running and accessible.
- For development, you can also run the backend directly with:
  ```bash
  npm start
  ```
- To automatically start the backend on system boot with pm2, use:
  ```bash
  pm2 startup
  pm2 save
  ```

---

## 7. Troubleshooting

- If you encounter errors, ensure all dependencies are installed and the correct Node.js version is being used.
- Check the pm2 logs for more details:
  ```bash
  pm2 logs backend
  ```
- If ports are in use, update the port in your project's configuration or environment variables.

---
