CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (product_name, brand, category, price, stock_quantity, description) VALUES
('iPhone 15', 'Apple', 'Phone', 999.99, 25, 'Latest Apple smartphone'),
('Galaxy S24', 'Samsung', 'Phone', 849.00, 40, 'Flagship Android phone'),
('MacBook Air M3', 'Apple', 'Laptop', 1299.00, 15, 'Lightweight laptop'),
('ThinkPad X1', 'Lenovo', 'Laptop', 1450.50, 10, 'Business ultrabook'),
('iPad Pro 11', 'Apple', 'Tablet', 799.00, 30, 'Professional tablet'),
('Surface Pro 9', 'Microsoft', 'Tablet', 1099.00, 12, '2-in-1 tablet'),
('AirPods Pro', 'Apple', 'Audio', 249.00, 60, 'Noise-cancelling earbuds'),
('Sony WH-1000XM5', 'Sony', 'Audio', 399.99, 22, 'Premium headphones'),
('Logitech MX Master 3', 'Logitech', 'Accessory', 99.99, 75, 'Wireless mouse'),
('Dell 27" Monitor', 'Dell', 'Display', 349.00, 18, '4K UHD monitor');