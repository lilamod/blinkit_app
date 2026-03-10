// Use environment variable for API URL
// Vite requires VITE_ prefix for client-side environment variables
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "https://blinkit-app.onrender.com/api";

// Add error handling helper
const handleError = (error, context = 'API') => {
  console.error(`${context} Error:`, error);
  throw new Error(error.message || `${context} failed`);
};

export const api = {
  // Get all products with pagination, search, and filter
  getProducts: async (page = 1, limit = 12, search = '', category = '') => {
    try {
      const params = new URLSearchParams({ page, limit, search, category });
      const res = await fetch(`${API_BASE_URL}/products?${params}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await res.json();
      
      // Handle backend response format: { data, totalPages, currentPage, ... }
      return {
        products: data.data || data.products || [],
        totalPages: data.totalPages || 1,
        currentPage: data.currentPage || 1,
        totalItems: data.totalProducts || data.count || 0
      };
    } catch (error) {
      handleError(error, 'Products API');
      return {
        products: [],
        totalPages: 0,
        currentPage: 1,
        totalItems: 0
      };
    }
  },

  // Get single product by ID
  getProductById: async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`);
      
      if (!res.ok) {
        throw new Error('Product not found');
      }
      
      const data = await res.json();
      // Handle both formats: { data: {...} } or { ... }
      return data.data || data;
    } catch (error) {
      handleError(error, 'Product API');
      throw error;
    }
  },

  // Get all categories
  getCategories: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products/categories`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      const data = await res.json();
      // Handle different response formats
      if (Array.isArray(data)) {
        return data;
      } else if (data.data && Array.isArray(data.data)) {
        return data.data;
      } else if (data.categories && Array.isArray(data.categories)) {
        return data.categories;
      }
      return [];
    } catch (error) {
      handleError(error, 'Categories API');
      return [];
    }
  },

  // Create new product (Admin)
  createProduct: async (productData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      
      if (!res.ok) {
        throw new Error('Failed to create product');
      }
      
      const data = await res.json();
      return data.data || data;
    } catch (error) {
      handleError(error, 'Create Product API');
      throw error;
    }
  },

  // Update product (Admin)
  updateProduct: async (id, productData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      
      if (!res.ok) {
        throw new Error('Failed to update product');
      }
      
      const data = await res.json();
      return data.data || data;
    } catch (error) {
      handleError(error, 'Update Product API');
      throw error;
    }
  },

  // Delete product (Admin)
  deleteProduct: async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE'
      });
      
      if (!res.ok) {
        throw new Error('Failed to delete product');
      }
      
      return await res.json();
    } catch (error) {
      handleError(error, 'Delete Product API');
      throw error;
    }
  },

  // Create new order
  placeOrder: async (items, totalAmount, deliveryAddress, paymentMethod) => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          totalAmount,
          deliveryAddress,
          paymentMethod
        })
      });
      
      if (!res.ok) {
        throw new Error('Failed to create order');
      }
      
      const data = await res.json();
      return data.data || data;
    } catch (error) {
      handleError(error, 'Order API');
      throw error;
    }
  },

  // Get all orders (Admin)
  getOrders: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const data = await res.json();
      return data.data || data;
    } catch (error) {
      handleError(error, 'Orders API');
      throw error;
    }
  },

  // Get single order by ID
  getOrderById: async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${id}`);
      
      if (!res.ok) {
        throw new Error('Order not found');
      }
      
      const data = await res.json();
      return data.data || data;
    } catch (error) {
      handleError(error, 'Order API');
      throw error;
    }
  },

  // Update order status (Admin)
  updateOrderStatus: async (id, status) => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      if (!res.ok) {
        throw new Error('Failed to update order status');
      }
      
      const data = await res.json();
      return data.data || data;
    } catch (error) {
      handleError(error, 'Order Status API');
      throw error;
    }
  }
};

// Export API URL for debugging (optional)
export const getAPIBaseUrl = () => API_BASE_URL;