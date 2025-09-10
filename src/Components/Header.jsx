import React from "react";
import { FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";

const Header = ({ searchQuery, setSearchQuery, onLogout }) => {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center gap-6 py-4 px-4">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <FiHeart className="text-white w-4 h-4" />
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Jewelry Store
                    </h1>
                </div>

                {/* Search */}
                <div className="relative flex-1 max-w-lg">
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Найти украшения..."
                        className="w-full rounded-full border border-gray-200 py-3 px-5 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
                        ♥
                    </button>
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full relative">
                        🛒
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
                    </button>
                    <button
                        onClick={onLogout}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
                    >
                        Выйти
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
