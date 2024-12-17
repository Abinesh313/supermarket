import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AddProduct.module.css';
import Navbar from '../Components/Navbar';

import '../Components/Navbar.css';

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    category: '',
    price: '',
    image: ''
  });

  const accessToken = localStorage.getItem('accessToken');

  // Configure axios instance
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  // Fetch products on component mount
  useEffect(() => {
    axiosInstance.get('/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevProduct => ({
      ...prevProduct,
      [name]: value || ''  // Ensure value is never undefined
    }));
  };

  const handleAddProduct = async () => {
    if (newProduct.productName && newProduct.category && newProduct.price && newProduct.image) {
      try {
        // Add new product
        const response = await axiosInstance.post('/products', newProduct, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setProducts([...products, response.data]);
        setNewProduct({ productName: '', category: '', price: '', image: '' }); // Reset form
      } catch (error) {
        console.error('Error adding product:', error.response ? error.response.data : error.message);
        alert('Failed to add product');
      }
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="sbody">
      <Navbar />
      <div className={styles.productFormContainer}>
        <h2 className={styles.productFormTitle}>Add New Product</h2>
        <div className={styles.productForm}>
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={newProduct.productName || ''}  // Ensure value is always a string
            onChange={handleInputChange}
            className={styles.inputField}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category || ''}  // Ensure value is always a string
            onChange={handleInputChange}
            className={styles.inputField}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price || ''}  // Ensure value is always a string
            onChange={handleInputChange}
            className={styles.inputField}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newProduct.image || ''}  // Ensure value is always a string
            onChange={handleInputChange}
            className={styles.inputField}
          />
          <button onClick={handleAddProduct} className={styles.addButton}>
            Add Product
          </button>
        </div>
        <div className={styles.productList}>
          <h3 className={styles.productListTitle}>Product List</h3>
          <div className={styles.products}>
            {products.map((product, index) => (
              <div key={index} className={styles.productCard}>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.productName}
                    className={styles.productImage}  // Updated from imageUrl to image
                  />
                )}
                <h4 className={styles.productName}>{product.productName}</h4>
                <p className={styles.productDetails}>Category: {product.category}</p>
                <p className={styles.productDetails}>Price: ₹{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
