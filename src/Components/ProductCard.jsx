import React, { memo } from 'react';
import { Heart, ShoppingCart, Star, Sparkles } from 'lucide-react';

const ProductCard = memo(({ item, index, favorites, onToggleFavorite, onAddToCart }) => {
    const isFavorite = favorites.has(item.id);
    
    const handleAddToCart = () => {
        onAddToCart(item);
    };

    const handleToggleFavorite = () => {
        onToggleFavorite(item.id);
    };

    return (
        <div 
            className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-white/20 overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            {/* Background blur effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-blue-50/50 backdrop-blur-sm rounded-3xl" />
            
            {/* Content */}
            <div className="relative z-10">
                {/* Image container with blur background */}
                <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200">
                    <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                    
                    {/* Overlay effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* New badge */}
                    {item.isNew && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            NEW
                        </div>
                    )}
                    
                    {/* Discount badge */}
                    {item.discount > 0 && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            -{item.discount}%
                        </div>
                    )}
                    
                    {/* Favorite button */}
                    <button
                        onClick={handleToggleFavorite}
                        className={`absolute bottom-3 right-3 w-10 h-10 rounded-full backdrop-blur-sm transition-all duration-300 flex items-center justify-center ${
                            isFavorite 
                                ? 'bg-red-500 text-white shadow-lg' 
                                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
                        }`}
                    >
                        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                </div>

                {/* Product info */}
                <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                        {item.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                        {item.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${
                                        i < Math.floor(item.rating) 
                                            ? 'text-yellow-400 fill-current' 
                                            : 'text-gray-300'
                                    }`} 
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-500">({item.rating})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                            {item.discount > 0 && (
                                <span className="text-lg text-gray-400 line-through">
                                    {Math.round(item.price / (1 - item.discount / 100)).toLocaleString()}₽
                                </span>
                            )}
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {item.price.toLocaleString()}₽
                            </span>
                        </div>
                        
                        <button
                            onClick={handleAddToCart}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2 hover:scale-105"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            <span className="text-sm font-medium">В корзину</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
    );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;

