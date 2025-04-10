-- Tạo cơ sở dữ liệu
CREATE DATABASE IF NOT EXISTS product_management;
USE product_management;

-- Bảng danh mục sản phẩm
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    parent_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Bảng sản phẩm
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    discount INT,
    category_id INT,
    stock INT NOT NULL DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0,
    review_count INT DEFAULT 0,
    sales_count INT DEFAULT 0,
    status ENUM('active', 'inactive', 'out_of_stock', 'discontinued') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Bảng hình ảnh sản phẩm
CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Bảng thông số kỹ thuật sản phẩm
CREATE TABLE product_specifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    spec_name VARCHAR(100) NOT NULL,
    spec_value TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Bảng tính năng sản phẩm
CREATE TABLE product_features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    feature_name VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Bảng người dùng
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role ENUM('admin', 'manager', 'staff', 'customer') DEFAULT 'customer',
    status ENUM('active', 'inactive', 'banned') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng đánh giá sản phẩm
CREATE TABLE product_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    content TEXT,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng hình ảnh đánh giá
CREATE TABLE review_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    review_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (review_id) REFERENCES product_reviews(id) ON DELETE CASCADE
);

-- Bảng giỏ hàng
CREATE TABLE carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng chi tiết giỏ hàng
CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Bảng danh sách yêu thích
CREATE TABLE wishlists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_wishlist (user_id, product_id)
);

-- Bảng đơn hàng
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    shipping_address TEXT NOT NULL,
    shipping_phone VARCHAR(20) NOT NULL,
    shipping_name VARCHAR(100) NOT NULL,
    payment_method ENUM('cash', 'credit_card', 'bank_transfer', 'e_wallet') NOT NULL,
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    order_status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng chi tiết đơn hàng
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Thêm dữ liệu mẫu cho danh mục
INSERT INTO categories (name, description, icon) VALUES
('Điện tử', 'Các sản phẩm điện tử và công nghệ', '🔌'),
('Thời trang', 'Quần áo và phụ kiện thời trang', '👕'),
('Nhà bếp', 'Đồ dùng và thiết bị nhà bếp', '🏠'),
('Làm đẹp', 'Mỹ phẩm và sản phẩm làm đẹp', '💄'),
('Thể thao', 'Đồ dùng và trang phục thể thao', '⚽'),
('Đồ chơi', 'Đồ chơi và trò chơi', '🎮'),
('Sách', 'Sách và tài liệu', '📚'),
('Ô tô', 'Phụ tùng và phụ kiện ô tô', '🚗');

-- Thêm dữ liệu mẫu cho sản phẩm
INSERT INTO products (name, description, price, original_price, discount, category_id, stock, rating, review_count, sales_count) VALUES
('Tai nghe không dây Pro', 'Tai nghe không dây cao cấp với công nghệ chống ồn và thời lượng pin dài. Sản phẩm được thiết kế với công nghệ tiên tiến, mang đến trải nghiệm âm thanh tuyệt vời cho người dùng.', 49.99, 79.99, 37, 1, 100, 4.8, 1250, 12500),
('Đồng hồ thông minh Series 5', 'Đồng hồ thông minh với nhiều tính năng theo dõi sức khỏe và thông báo thông minh.', 129.99, 199.99, 35, 1, 50, 4.6, 890, 8900),
('Pin sạc dự phòng 20000mAh', 'Pin sạc dự phòng dung lượng cao, sạc nhanh cho nhiều thiết bị.', 29.99, 49.99, 40, 1, 200, 4.7, 1560, 15600),
('Loa Bluetooth', 'Loa Bluetooth chất lượng cao với âm thanh sống động.', 39.99, 69.99, 43, 1, 75, 4.5, 1020, 10200),
('Đèn LED dải', 'Đèn LED dải trang trí với nhiều màu sắc và hiệu ứng.', 19.99, 39.99, 50, 1, 150, 4.9, 2340, 23400),
('Máy chiếu mini', 'Máy chiếu mini cầm tay với độ phân giải HD.', 89.99, 159.99, 44, 1, 30, 4.7, 780, 7800),
('Sạc không dây', 'Sạc không dây nhanh cho điện thoại thông minh.', 24.99, 39.99, 38, 1, 120, 4.6, 1120, 11200),
('Camera thông minh', 'Camera thông minh với khả năng nhận diện chuyển động và thông báo.', 34.99, 59.99, 42, 1, 80, 4.5, 890, 8900);

-- Thêm dữ liệu mẫu cho hình ảnh sản phẩm
INSERT INTO product_images (product_id, image_url, is_primary, display_order) VALUES
(1, 'https://via.placeholder.com/600x600?text=Tai+nghe+1', TRUE, 1),
(1, 'https://via.placeholder.com/600x600?text=Tai+nghe+2', FALSE, 2),
(1, 'https://via.placeholder.com/600x600?text=Tai+nghe+3', FALSE, 3),
(1, 'https://via.placeholder.com/600x600?text=Tai+nghe+4', FALSE, 4),
(2, 'https://via.placeholder.com/600x600?text=Dong+ho+1', TRUE, 1),
(2, 'https://via.placeholder.com/600x600?text=Dong+ho+2', FALSE, 2),
(3, 'https://via.placeholder.com/600x600?text=Pin+sac+1', TRUE, 1),
(4, 'https://via.placeholder.com/600x600?text=Loa+Bluetooth+1', TRUE, 1),
(5, 'https://via.placeholder.com/600x600?text=Den+LED+1', TRUE, 1),
(6, 'https://via.placeholder.com/600x600?text=May+chieu+1', TRUE, 1),
(7, 'https://via.placeholder.com/600x600?text=Sac+khong+day+1', TRUE, 1),
(8, 'https://via.placeholder.com/600x600?text=Camera+1', TRUE, 1);

-- Thêm dữ liệu mẫu cho thông số kỹ thuật sản phẩm
INSERT INTO product_specifications (product_id, spec_name, spec_value, display_order) VALUES
(1, 'Thương hiệu', 'TechPro', 1),
(1, 'Model', 'WH-1000XM4', 2),
(1, 'Màu sắc', 'Đen', 3),
(1, 'Kích thước', 'One size', 4),
(1, 'Chất liệu', 'Nhựa cao cấp', 5),
(1, 'Trọng lượng', '250g', 6),
(1, 'Bảo hành', '12 tháng', 7),
(2, 'Thương hiệu', 'SmartWatch', 1),
(2, 'Model', 'Series 5', 2),
(2, 'Màu sắc', 'Bạc', 3),
(2, 'Kích thước màn hình', '1.8 inch', 4),
(2, 'Pin', '300mAh', 5),
(2, 'Bảo hành', '12 tháng', 6);

-- Thêm dữ liệu mẫu cho tính năng sản phẩm
INSERT INTO product_features (product_id, feature_name, display_order) VALUES
(1, 'Chống ồn chủ động', 1),
(1, 'Thời lượng pin 30 giờ', 2),
(1, 'Kết nối Bluetooth 5.0', 3),
(1, 'Tương thích với nhiều thiết bị', 4),
(1, 'Điều khiển cảm ứng', 5),
(1, 'Chống nước và mồ hôi', 6),
(2, 'Theo dõi nhịp tim', 1),
(2, 'Theo dõi giấc ngủ', 2),
(2, 'Thông báo tin nhắn và cuộc gọi', 3),
(2, 'Chống nước IP68', 4),
(2, 'Pin dài 7 ngày', 5);

-- Thêm dữ liệu mẫu cho người dùng
INSERT INTO users (username, email, password, full_name, role) VALUES
('admin', 'admin@example.com', '$2a$10$X7UrE2JqX5X5X5X5X5X5X.5X5X5X5X5X5X5X5X5X5X5X5X5X5X', 'Admin User', 'admin'),
('manager', 'manager@example.com', '$2a$10$X7UrE2JqX5X5X5X5X5X5X.5X5X5X5X5X5X5X5X5X5X5X5X5X5X', 'Manager User', 'manager'),
('staff', 'staff@example.com', '$2a$10$X7UrE2JqX5X5X5X5X5X5X.5X5X5X5X5X5X5X5X5X5X5X5X5X5X', 'Staff User', 'staff'),
('customer', 'customer@example.com', '$2a$10$X7UrE2JqX5X5X5X5X5X5X.5X5X5X5X5X5X5X5X5X5X5X5X5X5X', 'Customer User', 'customer');

-- Thêm dữ liệu mẫu cho đánh giá sản phẩm
INSERT INTO product_reviews (product_id, user_id, rating, title, content, status) VALUES
(1, 4, 5, 'Tai nghe tuyệt vời', 'Âm thanh rất tốt, chống ồn hiệu quả. Pin dài và kết nối ổn định.', 'approved'),
(1, 3, 4, 'Sản phẩm tốt', 'Chất lượng tốt nhưng giá hơi cao.', 'approved'),
(2, 4, 5, 'Đồng hồ thông minh rất hữu ích', 'Nhiều tính năng hữu ích, pin dài và thiết kế đẹp.', 'approved'),
(3, 4, 4, 'Pin sạc dự phòng tốt', 'Dung lượng pin lớn, sạc nhanh cho nhiều thiết bị.', 'approved');

-- Thêm dữ liệu mẫu cho giỏ hàng
INSERT INTO carts (user_id) VALUES (4);

-- Thêm dữ liệu mẫu cho chi tiết giỏ hàng
INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (1, 1, 1), (1, 3, 2);

-- Thêm dữ liệu mẫu cho danh sách yêu thích
INSERT INTO wishlists (user_id, product_id) VALUES (4, 2), (4, 5);

-- Thêm dữ liệu mẫu cho đơn hàng
INSERT INTO orders (user_id, total_amount, shipping_address, shipping_phone, shipping_name, payment_method, payment_status, order_status) VALUES
(4, 109.97, '123 Đường ABC, Quận XYZ, TP.HCM', '0123456789', 'Nguyễn Văn A', 'credit_card', 'paid', 'delivered');

-- Thêm dữ liệu mẫu cho chi tiết đơn hàng
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (1, 1, 1, 49.99), (1, 3, 2, 29.99); 