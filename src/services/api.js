// Centralized API Service

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Add a new product
 * @param {Object} productData 
 * @returns {Promise<Response>}
 */
export const addProduct = async (productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    return response;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

/**
 * Delete a product by ID
 * @param {number|string} productId 
 * @returns {Promise<Response>}
 */
export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: 'DELETE',
    });
    return response;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
