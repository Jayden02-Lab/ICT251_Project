const API = 'http://localhost:3000/api/products';
const form = document.getElementById('productForm');
const tableBody = document.getElementById('productTable');
const submitBtn = document.getElementById('submitBtn');

// Load products on page load
async function loadProducts() {
  try {
    const res = await fetch(API);
    const products = await res.json();
    
    tableBody.innerHTML = products.map(p => `
      <tr>
        <td>${p.id}</td>
        <td>${p.product_name}</td>
        <td>${p.brand}</td>
        <td>${p.category}</td>
        <td>$${p.price}</td>
        <td>${p.stock_quantity}</td>
        <td class="actions">
          <button class="edit-btn" onclick="editProduct(${p.id})">Edit</button>
          <button class="delete-btn" onclick="deleteProduct(${p.id})">Delete</button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

// Edit Product
window.editProduct = async (id) => {
  const res = await fetch(`${API}/${id}`);
  const p = await res.json();
  
  document.getElementById('productId').value = p.id;
  document.getElementById('product_name').value = p.product_name;
  document.getElementById('brand').value = p.brand;
  document.getElementById('category').value = p.category;
  document.getElementById('price').value = p.price;
  document.getElementById('stock_quantity').value = p.stock_quantity;
  document.getElementById('description').value = p.description || '';
  
  submitBtn.textContent = 'Update Product';
  submitBtn.style.backgroundColor = '#28a745';
};

// Delete Product
window.deleteProduct = async (id) => {
  if (!confirm('Are you sure you want to delete this product?')) return;
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  loadProducts();
};

// Submit Form (Create or Update)
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const id = document.getElementById('productId').value;
  const payload = {
    product_name: document.getElementById('product_name').value,
    brand: document.getElementById('brand').value,
    category: document.getElementById('category').value,
    price: parseFloat(document.getElementById('price').value),
    stock_quantity: parseInt(document.getElementById('stock_quantity').value) || 0,
    description: document.getElementById('description').value,
  };

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API}/${id}` : API;

  await fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  // Reset form
  form.reset();
  document.getElementById('productId').value = '';
  submitBtn.textContent = 'Create Product';
  submitBtn.style.backgroundColor = '#007bff';
  
  loadProducts();
});

// Initial load
loadProducts();