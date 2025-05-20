# Frontend Setup Guide

---

## 1. Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [pm2](https://pm2.keymetrics.io/) process manager for Node.js

---

## 2. Install Dependencies

Navigate to the `frontend` directory and install the required packages:

```bash
cd frontend
npm install
```

---

## 3. Running the Frontend with pm2

### 3.1. Install pm2 (if not already installed)

```bash
npm install -g pm2
```

### 3.2. Start the Frontend Application

```bash
pm2 start npm --name "frontend" -- run start
```
- This command starts the frontend using pm2 and names the process `frontend`.

### 3.3. Monitor and Manage the Frontend Process

- To see running pm2 processes:
  ```bash
  pm2 list
  ```
- To view logs:
  ```bash
  pm2 logs frontend
  ```
- To stop the frontend:
  ```bash
  pm2 stop frontend
  ```
- To restart the frontend:
  ```bash
  pm2 restart frontend
  ```

---

## 4. Access the Frontend

By default, the frontend will be available at [http://localhost:8000](http://localhost:8000) unless configured otherwise.

---

## 5. Additional Notes

- Make sure that any required backend services or APIs are running and accessible.
- For development, you can also run the frontend directly with:
  ```bash
  npm start
  ```
- To automatically start the frontend on system boot with pm2, use:
  ```bash
  pm2 startup
  pm2 save
  ```

---

## 6. Troubleshooting

- If you encounter errors, ensure all dependencies are installed and the correct Node.js version is being used.
- Check the pm2 logs for more details:
  ```bash
  pm2 logs frontend
  ```
- If ports are in use, update the port in your project's configuration.

---

## 7. Apache2 Configuration for Frontend Deployment

You can serve the built frontend application using [Apache2](https://httpd.apache.org/) as a static web server. Below are the general steps to configure Apache2 to serve your frontend:

### 7.1. Build the Frontend

First, build your frontend application for production:

```bash
npm run build
```
This will create a `build` directory containing static files for deployment.

### 7.2. Install Apache2

For Ubuntu/Debian:

```bash
sudo apt update
sudo apt install apache2
```

### 7.3. Configure Apache2 to Serve the Frontend

- Copy the contents of the `build` directory to Apache's web root (default is `/var/www/html`):

  ```bash
  sudo cp -r build/* /var/www/html/
  ```

- (Optional) Set correct permissions:

  ```bash
  sudo chown -R www-data:www-data /var/www/html/
  ```

- Restart Apache2 to apply changes:

  ```bash
  sudo systemctl restart apache2
  ```

### 7.4. (Optional) Customizing the VirtualHost

If you want to serve the frontend from a custom domain or subdomain, edit or create a new virtual host file (e.g., `/etc/apache2/sites-available/frontend.conf`):

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    DocumentRoot /var/www/html

    <Directory /var/www/html>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/frontend_error.log
    CustomLog ${APACHE_LOG_DIR}/frontend_access.log combined
</VirtualHost>
```

Then enable the site and reload Apache2:

```bash
sudo a2ensite frontend.conf
sudo systemctl reload apache2
```

---

## 8. Port Configuration

By default, the frontend runs on port **8000**.  
If you want Apache2 to reverse proxy to the running frontend (instead of serving static files), you can use the following configuration in your VirtualHost:

```apache
<VirtualHost *:80>
    ServerName yourdomain.com

    ProxyPreserveHost On
    ProxyPass / http://localhost:8000/
    ProxyPassReverse / http://localhost:8000/

    ErrorLog ${APACHE_LOG_DIR}/frontend_error.log
    CustomLog ${APACHE_LOG_DIR}/frontend_access.log combined
</VirtualHost>
```

Enable required Apache modules and site, then reload:

```bash
sudo a2enmod proxy proxy_http
sudo a2ensite frontend.conf
sudo systemctl reload apache2
```
---
