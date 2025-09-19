import React, { useEffect, useState } from "react";
import { Plus, X, Sparkles, Diamond, Crown, Star, Gem } from "lucide-react";

const Categories = ({ activeCategory, setActiveCategory, onItemAdded }) => {
    const [categories] = useState([
        { id: "rings", name: "Кольца", icon: "💍", color: "from-purple-500 to-pink-500" },
        { id: "necklaces", name: "Ожерелья", icon: "📿", color: "from-blue-500 to-cyan-500" },
        { id: "earrings", name: "Серьги", icon: "✨", color: "from-yellow-500 to-orange-500" },
        { id: "bracelets", name: "Браслеты", icon: "🔗", color: "from-green-500 to-emerald-500" },
        { id: "watches", name: "Часы", icon: "⌚", color: "from-gray-600 to-gray-800" },
        { id: "sets", name: "Наборы", icon: "💎", color: "from-red-500 to-pink-600" }
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [newItem, setNewItem] = useState({
        title: "",
        price: "",
        sku: "",
        category: activeCategory,
    });
    const [isAnimating, setIsAnimating] = useState(false);

    const handleInputChange = (field, value) => {
        setNewItem((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddItem = async () => {
        setIsAnimating(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setShowAddModal(false);
        setNewItem({
            title: "",
            price: "",
            sku: "",
            category: activeCategory,
        });
        onItemAdded?.();
        setIsAnimating(false);

        // Success animation
        const successMsg = document.createElement('div');
        successMsg.className = 'fixed top-20 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 animate-bounce';
        successMsg.innerHTML = '✅ Товар успешно добавлен!';
        document.body.appendChild(successMsg);

        setTimeout(() => document.body.removeChild(successMsg), 3000);
    };

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
        setNewItem(prev => ({ ...prev, category: categoryId }));
    };

    return (
        <nav className="max-w-7xl mx-auto px-4 py-6">
            {/* Premium background effects */}
            <div className="absolute left-0 right-0 h-32 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 blur-3xl"></div>

            <div className="relative">
                {/* Categories */}
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
                    {categories.map((category, index) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className={`group relative whitespace-nowrap rounded-3xl px-8 py-4 text-sm font-medium transition-all duration-500 transform hover:scale-110 ${
                                activeCategory === category.id
                                    ? `bg-gradient-to-r ${category.color} text-white shadow-2xl shadow-purple-500/30`
                                    : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-xl backdrop-blur-sm border border-gray-200/50"
                            }`}
                            style={{
                                animationDelay: `${index * 100}ms`
                            }}
                        >
                            {/* Background glow effect */}
                            <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${category.color} blur-xl`}></div>

                            <div className="relative flex items-center gap-3">
                                <span className="text-lg animate-pulse">{category.icon}</span>
                                <span className="font-semibold">{category.name}</span>

                                {activeCategory === category.id && (
                                    <Sparkles className="w-4 h-4 animate-spin ml-2" />
                                )}
                            </div>

                            {/* Selection indicator */}
                            {activeCategory === category.id && (
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg animate-bounce"></div>
                            )}
                        </button>
                    ))}

                    {/* Add New Item Button */}
                    <div className="relative">
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-3 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 text-sm font-semibold text-white shadow-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-110 group"
                        >
                            <div className="relative">
                                <Plus className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                            </div>
                            <span>Добавить</span>
                            <Diamond className="w-4 h-4 animate-pulse" />
                        </button>

                        {/* Premium Modal */}
                        {showAddModal && (
                            <>
                                {/* Backdrop */}
                                <div
                                    className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 animate-in fade-in duration-300"
                                    onClick={() => setShowAddModal(false)}
                                />

                                {/* Modal */}
                                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 animate-in zoom-in-95 duration-300">
                                    <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8">
                                        {/* Premium glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>

                                        <div className="relative">
                                            {/* Header */}
                                            <div className="flex justify-between items-center mb-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                                                        <Crown className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                                            Добавить товар
                                                        </h3>
                                                        <p className="text-xs text-gray-500">Создайте новое украшение</p>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => setShowAddModal(false)}
                                                    className="p-2 hover:bg-red-100 rounded-full transition-all duration-200 text-gray-500 hover:text-red-500 transform hover:scale-110"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>

                                            {/* Form */}
                                            <div className="space-y-5">
                                                <div className="relative group">
                                                    <input
                                                        placeholder="Название товара"
                                                        value={newItem.title}
                                                        onChange={(e) => handleInputChange("title", e.target.value)}
                                                        className="w-full p-4 border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500/50 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                                                    />
                                                    <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                                                </div>

                                                <div className="relative group">
                                                    <input
                                                        placeholder="Артикул (SKU)"
                                                        value={newItem.sku}
                                                        onChange={(e) => handleInputChange("sku", e.target.value)}
                                                        className="w-full p-4 border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                                                    />
                                                    <Gem className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                                                </div>

                                                <div className="relative group">
                                                    <input
                                                        placeholder="Цена в рублях"
                                                        type="number"
                                                        value={newItem.price}
                                                        onChange={(e) => handleInputChange("price", e.target.value)}
                                                        className="w-full p-4 border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500/50 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                                                    />
                                                    <Star className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                                                </div>

                                                <div className="relative">
                                                    <select
                                                        value={newItem.category}
                                                        onChange={(e) => handleInputChange("category", e.target.value)}
                                                        className="w-full p-4 border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500/50 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                                                    >
                                                        {categories.map((cat) => (
                                                            <option key={cat.id} value={cat.id}>
                                                                {cat.icon} {cat.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Action buttons */}
                                                <div className="flex gap-4 pt-4">
                                                    <button
                                                        onClick={() => setShowAddModal(false)}
                                                        className="flex-1 px-6 py-3 bg-gray-100/80 text-gray-700 rounded-2xl hover:bg-gray-200/80 transition-all duration-300 font-medium backdrop-blur-sm transform hover:scale-105"
                                                    >
                                                        Отмена
                                                    </button>
                                                    <button
                                                        onClick={handleAddItem}
                                                        disabled={isAnimating}
                                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-70 flex items-center justify-center gap-2"
                                                    >
                                                        {isAnimating ? (
                                                            <>
                                                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                                                Добавляем...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Diamond className="w-4 h-4 animate-pulse" />
                                                                Добавить
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Categories;