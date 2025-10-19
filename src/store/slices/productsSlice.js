import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/items');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/categories');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  categories: [],
  filteredItems: [],
  activeCategory: 'all',
  searchQuery: '',
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
      state.filteredItems = state.items.filter(item => {
        const matchCategory = action.payload === 'all' || item.category === action.payload;
        const matchSearch = !state.searchQuery || 
          item.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          item.sku.toLowerCase().includes(state.searchQuery.toLowerCase());
        return matchCategory && matchSearch;
      });
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredItems = state.items.filter(item => {
        const matchCategory = state.activeCategory === 'all' || item.category === state.activeCategory;
        const matchSearch = !action.payload || 
          item.title.toLowerCase().includes(action.payload.toLowerCase()) ||
          item.description.toLowerCase().includes(action.payload.toLowerCase()) ||
          item.sku.toLowerCase().includes(action.payload.toLowerCase());
        return matchCategory && matchSearch;
      });
    },
    clearFilters: (state) => {
      state.activeCategory = 'all';
      state.searchQuery = '';
      state.filteredItems = state.items;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setActiveCategory, setSearchQuery, clearFilters } = productsSlice.actions;

export default productsSlice.reducer;

