-- Insert sample data into the ecommerce database
USE acra_application;

-- Insert sample data into users table
INSERT INTO users (username, email, password_hash, full_name, address, phone_number) VALUES
('user1', 'user1@example.com', 'hashed_password1', 'Nguyen Van A', '123 Le Loi, Hanoi', '0912345678'),
('user2', 'user2@example.com', 'hashed_password2', 'Tran Thi B', '456 Tran Phu, HCMC', '0987654321'),
('user3', 'user3@example.com', 'hashed_password3', 'Le Van C', '789 Nguyen Trai, Da Nang', '0901234567'),
('user4', 'user4@example.com', 'hashed_password4', 'Pham Thi D', '101 Vo Van Tan, Hanoi', '0934567890'),
('user5', 'user5@example.com', 'hashed_password5', 'Hoang Van E', '202 Ba Trieu, HCMC', '0945678901'),
('user6', 'user6@example.com', 'hashed_password6', 'Vo Thi F', '303 Ly Thuong Kiet, Da Nang', '0956789012'),
('user7', 'user7@example.com', 'hashed_password7', 'Dang Van G', '404 Nguyen Hue, Hanoi', '0967890123'),
('user8', 'user8@example.com', 'hashed_password8', 'Bui Thi H', '505 Tran Hung Dao, HCMC', '0978901234'),
('user9', 'user9@example.com', 'hashed_password9', 'Nguyen Van I', '606 Le Duan, Da Nang', '0989012345'),
('user10', 'user10@example.com', 'hashed_password10', 'Tran Thi K', '707 Pham Van Dong, Hanoi', '0990123456');

-- Insert sample data into products table
INSERT INTO products (name, description, price, stock_quantity) VALUES
('Laptop Dell XPS 13', 'Laptop cao cấp, i7, 16GB RAM', 25000000.00, 50),
('iPhone 14 Pro', 'Smartphone cao cấp, 128GB', 30000000.00, 100),
('Tai nghe Sony WH-1000XM5', 'Tai nghe không dây chống ồn', 8000000.00, 200),
('Máy ảnh Canon EOS R6', 'Máy ảnh mirrorless chuyên nghiệp', 60000000.00, 30),
('Tivi Samsung 4K 55 inch', 'Tivi thông minh 4K', 15000000.00, 80),
('Máy giặt LG 10kg', 'Máy giặt cửa trước thông minh', 12000000.00,70),
('Tủ lạnh Samsung 300L', 'Tủ lạnh inverter tiết kiệm điện', 10000000.00, 60),
('Bàn phím cơ Keychron K8', 'Bàn phím cơ không dây', 2000000.00, 150),
('Chuột Logitech MX Master 3', 'Chuột văn phòng cao cấp', 2500000.00, 120),
('Loa Bluetooth JBL Flip 5', 'Loa di động chống nước', 3000000.00, 90);

-- Insert sample data into orders table
INSERT INTO orders (user_id, total_amount, status) VALUES
(1, 33000000.00, 'delivered'),
(2, 8000000.00, 'processing'),
(3, 60000000.00, 'shipped'),
(4, 27000000.00, 'pending'),
(5, 15000000.00, 'delivered'),
(6, 12000000.00, 'cancelled'),
(7, 10000000.00, 'processing'),
(8, 5000000.00, 'shipped'),
(9, 30000000.00, 'delivered'),
(10, 25000000.00, 'pending');

-- Insert sample data into order_details table
INSERT INTO order_details (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 25000000.00),
(1, 3, 1, 8000000.00),
(2, 3, 1, 8000000.00),
(3, 4, 1, 60000000.00),
(4, 2, 1, 30000000.00),
(5, 5, 1, 15000000.00),
(6, 6, 1, 12000000.00),
(7, 7, 1, 10000000.00),
(8, 8, 1, 2000000.00),
(8, 10, 1, 3000000.00),
(9, 2, 1, 30000000.00),
(10, 1, 1, 25000000.00);
