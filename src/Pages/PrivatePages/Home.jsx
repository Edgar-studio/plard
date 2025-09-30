import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Categories from "../../Components/Categories.jsx";
import ProductCard from "../../Components/ProductCard.jsx";
import { Sparkles, Diamond, Crown, Zap, Star } from 'lucide-react';
import { fetchProducts, fetchCategories, setActiveCategory } from '../../store/slices/productsSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { toggleFavorite } from '../../store/slices/favoritesSlice';

const Home = () => {
    const dispatch = useDispatch();
    const { items, categories, filteredItems, activeCategory, isLoading, error } = useSelector(state => state.products);
    const { favorites } = useSelector(state => state.favorites);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleAddToCart = useCallback((item) => {
        dispatch(addToCart(item));
    }, [dispatch]);

    const handleToggleFavorite = useCallback((itemId) => {
        dispatch(toggleFavorite(itemId));
    }, [dispatch]);

    const handleCategoryChange = useCallback((categoryId) => {
        dispatch(setActiveCategory(categoryId));
    }, [dispatch]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="text-red-500 text-xl font-medium mb-4">Ошибка загрузки данных</div>
                <div className="text-gray-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 relative">
            {/* Animated background with blur */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none backdrop-blur-sm">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 5}s`
                        }}
                    >
                        <Sparkles className="w-3 h-3 text-purple-300/20" />
                    </div>
                ))}
            </div>

            <Categories
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={handleCategoryChange}
            />

            <div className="max-w-7xl mx-auto px-4 pb-12">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-6"></div>
                        <p className="text-xl text-gray-600 font-medium">Загружаем роскошные украшения...</p>
                        <div className="flex gap-2 mt-4">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                />
                            ))}
                        </div>
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="text-center py-20">
                        <Diamond className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                        <p className="text-2xl text-gray-500 font-medium mb-4">Украшения не найдены</p>
                        <p className="text-gray-400">Попробуйте изменить фильтры поиска</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredItems.map((item, index) => (
                            <ProductCard
                                key={item.id}
                                item={item}
                                index={index}
                                favorites={favorites}
                                onToggleFavorite={handleToggleFavorite}
                                onAddToCart={handleAddToCart}
                            />
                        ))}
                    </div>
                )}

                {/* Premium features section */}
                {!isLoading && filteredItems.length > 0 && (
                    <div className="mt-16 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-8 text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                                    <Crown className="w-8 h-8 animate-bounce" />
                                    Почему выбирают LuxeGems?
                                    <Diamond className="w-8 h-8 animate-pulse" />
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 text-center">
                                <div className="space-y-3">
                                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
                                        <Zap className="w-8 h-8 text-yellow-300" />
                                    </div>
                                    <h3 className="font-bold text-xl">Быстрая доставка</h3>
                                    <p className="text-white/80">Доставим в течение 24 часов по Москве</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
                                        <Star className="w-8 h-8 text-yellow-300 fill-current" />
                                    </div>
                                    <h3 className="font-bold text-xl">Гарантия качества</h3>
                                    <p className="text-white/80">Пожизненная гарантия на все изделия</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
                                        <Diamond className="w-8 h-8 text-yellow-300" />
                                    </div>
                                    <h3 className="font-bold text-xl">Эксклюзивность</h3>
                                    <p className="text-white/80">Уникальные дизайны от ведущих мастеров</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Home;
