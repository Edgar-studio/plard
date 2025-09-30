import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, Heart, Crown, LogOut, Settings } from "lucide-react";
import { setSearchQuery } from "../store/slices/productsSlice";
import { logout } from "../store/slices/authSlice";

const Header = memo(() => {
    const dispatch = useDispatch();
    const { searchQuery } = useSelector(state => state.products);
    const { totalItems, totalPrice } = useSelector(state => state.cart);
    const { favorites } = useSelector(state => state.favorites);
    const { isAdmin } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl shadow-2xl shadow-purple-500/10 border-b border-white/20">
            <div className="max-w-7xl mx-auto flex items-center gap-6 py-4 px-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Crown className="text-white w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                            LuxeGems
                        </h1>
                        <p className="text-xs text-gray-500 font-medium">Premium Jewelry</p>
                    </div>
                </div>
                
                <div className="flex-1 max-w-2xl">
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                        placeholder="Поиск эксклюзивных украшений..."
                        className="w-full rounded-full border-2 border-gray-200/50 py-4 px-6 text-sm focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-md bg-white/90 shadow-lg"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Heart className="w-5 h-5" />
                        <span className="text-sm font-medium">{favorites.size}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                        <ShoppingCart className="w-5 h-5" />
                        <span className="text-sm font-medium">{totalItems}</span>
                        <span className="text-sm font-bold text-purple-600">
                            {totalPrice.toLocaleString()}₽
                        </span>
                    </div>

                    {isAdmin && (
                        <a
                            href="/admin"
                            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors duration-300"
                        >
                            <Settings className="w-4 h-4" />
                            <span className="text-sm font-medium">Админ</span>
                        </a>
                    )}

                    {/* Debug info - remove in production */}
                    <div className="text-xs text-gray-500">
                        Admin: {isAdmin ? 'Yes' : 'No'}
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-300"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Выйти</span>
                    </button>
                </div>
            </div>
        </header>
    );
});

Header.displayName = 'Header';

export default Header;