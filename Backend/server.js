require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const db = require('./db');
const fs = require('fs');


// This reads your schema.sql and runs it automatically
try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    if (fs.existsSync(schemaPath)) {
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        db.exec(schemaSql);
        console.log("Database initialized successfully from schema.sql.");
    }
} catch (error) {
    // If the tables already exist, it just skips this instead of crashing
    console.log("Database already initialized or error:", error.message);
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'../frontend')));

app.get('/api/products', (req, res) => {
  const rows = db.prepare('SELECT * FROM products ORDER BY id DESC').all();
  res.json(rows);
});

app.get('/api/products/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

app.post('/api/products', (req, res) => {
  const { product_name, brand, category, price, stock_quantity, description } = req.body;
  const info = db.prepare('INSERT INTO products (product_name, brand, category, price, stock_quantity, description) VALUES (?, ?, ?, ?, ?, ?)').run(product_name, brand, category, price, stock_quantity || 0, description || null);
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(row);
});

app.put('/api/products/:id', (req, res) => {
  const { product_name, brand, category, price, stock_quantity, description } = req.body;
  db.prepare('UPDATE products SET product_name=?, brand=?, category=?, price=?, stock_quantity=?, description=?, updated_at=CURRENT_TIMESTAMP WHERE id=?').run(product_name, brand, category, price, stock_quantity, description, req.params.id);
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  res.json(row);
});

app.delete('/api/products/:id', (req, res) => {
  db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  res.json({ message: 'Deleted' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));