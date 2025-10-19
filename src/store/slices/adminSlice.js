import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for admin operations
export const fetchCategoriesAdmin = createAsyncThunk(
  'admin/fetchCategories',
  async () => {
    const response = await fetch('http://localhost:4000/categories');
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  }
);

export const fetchProductsAdmin = createAsyncThunk(
  'admin/fetchProducts',
  async () => {
    const response = await fetch('http://localhost:4000/products');
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  }
);

export const createCategory = createAsyncThunk(
  'admin/createCategory',
  async (categoryData) => {
    const response = await fetch('http://localhost:4000/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryData)
    });
    if (!response.ok) throw new Error('Failed to create category');
    return response.json();
  }
);

export const updateCategory = createAsyncThunk(
  'admin/updateCategory',
  async ({ id, data }) => {
    const response = await fetch(`http://localhost:4000/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update category');
    return response.json();
  }
);

export const deleteCategory = createAsyncThunk(
  'admin/deleteCategory',
  async (id) => {
    const response = await fetch(`http://localhost:4000/categories/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete category');
    return id;
  }
);

export const createProduct = createAsyncThunk(
  'admin/createProduct',
  async (productData) => {
    const response = await fetch('http://localhost:4000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  }
);

export const updateProduct = createAsyncThunk(
  'admin/updateProduct',
  async ({ id, data }) => {
    const response = await fetch(`http://localhost:4000/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  }
);

export const deleteProduct = createAsyncThunk(
  'admin/deleteProduct',
  async (id) => {
    const response = await fetch(`http://localhost:4000/products/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return id;
  }
);

const initialState = {
  categories: [],
  products: [],
  activeTab: 'products',
  isLoading: false,
  error: null
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch categories
    builder
      .addCase(fetchCategoriesAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Fetch products
    builder
      .addCase(fetchProductsAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Create category
    builder
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Update category
    builder
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.categories.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Delete category
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = state.categories.filter(cat => cat.id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Create product
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Update product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(prod => prod.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Delete product
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter(prod => prod.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { setActiveTab, clearError } = adminSlice.actions;
export default adminSlice.reducer;

