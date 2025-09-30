import React, { memo } from 'react';
import { Sparkles } from 'lucide-react';

const Categories = memo(({ activeCategory, setActiveCategory, categories }) => {
    const categoryIcons = {
        'ring': '💍',
        'wedding': '📿',
        'cocktail': '✨',
        'engagement': '🔗'
    };

    const categoryColors = {
        'ring': 'from-purple-500 to-pink-500',
        'wedding': 'from-blue-500 to-cyan-500',
        'cocktail': 'from-yellow-500 to-orange-500',
        'engagement': 'from-green-500 to-emerald-500'
    };

    return (
        <nav className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
                <button
                    onClick={() => setActiveCategory('all')}
                    className={`group relative whitespace-nowrap rounded-3xl px-8 py-4 text-sm font-medium transition-all duration-500 transform hover:scale-110 ${
                        activeCategory === 'all'
                            ? 'bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-2xl shadow-purple-500/30'
                            : "bg-white/90 text-gray-700 hover:bg-white hover:shadow-xl backdrop-blur-md border border-white/20"
                    }`}
                >
                    <div className="relative flex items-center gap-3">
                        <span className="text-lg">💎</span>
                        <span className="font-semibold">Все товары</span>
                        {activeCategory === 'all' && (
                            <Sparkles className="w-4 h-4 animate-spin ml-2" />
                        )}
                    </div>
                </button>

                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`group relative whitespace-nowrap rounded-3xl px-8 py-4 text-sm font-medium transition-all duration-500 transform hover:scale-110 ${
                            activeCategory === category.id
                                ? `bg-gradient-to-r ${categoryColors[category.id] || 'from-purple-500 to-pink-500'} text-white shadow-2xl shadow-purple-500/30`
                                : "bg-white/90 text-gray-700 hover:bg-white hover:shadow-xl backdrop-blur-md border border-white/20"
                        }`}
                    >
                        <div className="relative flex items-center gap-3">
                            <span className="text-lg">{categoryIcons[category.id] || '💎'}</span>
                            <span className="font-semibold">{category.name}</span>
                            {activeCategory === category.id && (
                                <Sparkles className="w-4 h-4 animate-spin ml-2" />
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </nav>
    );
});

Categories.displayName = 'Categories';

export default Categories;