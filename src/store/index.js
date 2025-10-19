import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';
import favoritesSlice from './slices/favoritesSlice';
import productsSlice from './slices/productsSlice';
import adminSlice from './slices/adminSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    favorites: favoritesSlice,
    products: productsSlice,
    admin: adminSlice,
  },
});

export default store;
