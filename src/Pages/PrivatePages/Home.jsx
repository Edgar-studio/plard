import React, { useEffect, useState, useCallback } from "react";
import { ShoppingCart, Heart, Star, Eye, Sparkles, Diamond, Crown, Zap, LogOut, User, Lock, Mail, ArrowLeft } from "lucide-react";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem('luxegems_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const register = (email, password, name) => {
        if (email && password && name) {
            const users = JSON.parse(localStorage.getItem('luxegems_users') || '[]');

            // Check if user already exists
            if (users.find(u => u.email === email)) {
                return { success: false, message: "User already exists" };
            }

            // Add new user
            users.push({ email, password, name });
            localStorage.setItem('luxegems_users', JSON.stringify(users));

            return { success: true, message: "Registration successful" };
        }
        return { success: false, message: "Please fill all fields" };
    };

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('luxegems_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            const userData = {
                email: user.email,
                name: user.name,
                token: 'mock-jwt-token-' + Date.now()
            };
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem('luxegems_user', JSON.stringify(userData));
            return { success: true };
        }
        return { success: false, message: "Invalid email or password" };
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('luxegems_user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const AuthModal = ({ onClose, onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { register, login } = React.useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccessMessage("");

        setTimeout(() => {
            if (isLogin) {
                // Login logic
                const result = login(email, password);
                if (result.success) {
                    onLoginSuccess();
                    onClose();
                } else {
                    setError(result.message);
                }
            } else {
                // Registration logic
                const result = register(email, password, name);
                if (result.success) {
                    setSuccessMessage(result.message);
                    setIsLogin(true); // Switch to login after successful registration
                } else {
                    setError(result.message);
                }
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>

                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        {isLogin ? <Lock className="text-white w-8 h-8" /> : <User className="text-white w-8 h-8" />}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {isLogin ? "Welcome Back to LuxeGems" : "Create Your Account"}
                    </h2>
                    <p className="text-gray-600 mt-2">
                        {isLogin ? "Sign in to your account" : "Register to access exclusive jewelry"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    {successMessage && (
                        <div className="bg-green-50 text-green-600 p-3 rounded-xl text-sm">
                            {successMessage}
                        </div>
                    )}

                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-xl border-2 border-gray-200 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-300"
                                placeholder="Your Name"
                                required={!isLogin}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border-2 border-gray-200 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-300"
                            placeholder="your@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border-2 border-gray-200 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-300"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : isLogin ? (
                            <Lock className="w-4 h-4" />
                        ) : (
                            <User className="w-4 h-4" />
                        )}
                        {isLogin ? "Sign In" : "Create Account"}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center justify-center gap-1 mx-auto"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {isLogin ? "Need to create an account?" : "Already have an account?"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const Header = ({ searchQuery, setSearchQuery, user, onLogout, onLoginClick }) => {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-2xl shadow-2xl shadow-purple-500/10">
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
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Поиск эксклюзивных украшений..."
                        className="w-full rounded-full border-2 border-gray-200/50 py-4 px-6 text-sm focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm bg-white/80 shadow-lg"
                    />
                </div>

                {/* User section */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div className="hidden md:block">
                                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                            <button
                                onClick={onLogout}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-purple-600 transition-colors duration-300 rounded-xl hover:bg-gray-100"
                                title="Logout"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden md:inline">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={onLoginClick}
                            className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                        >
                            <User className="w-4 h-4" />
                            <span>Login</span>
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

const Categories = ({ activeCategory, setActiveCategory, onItemAdded }) => {
    const categories = [
        { id: "rings", name: "Кольца", icon: "💍" },
        { id: "necklaces", name: "Ожерелья", icon: "📿" },
        { id: "earrings", name: "Серьги", icon: "✨" },
        { id: "bracelets", name: "Браслеты", icon: "🔗" },
        { id: "watches", name: "Часы", icon: "⌚" },
        { id: "sets", name: "Наборы", icon: "💎" }
    ];

    return (
        <nav className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`whitespace-nowrap rounded-3xl px-8 py-4 text-sm font-medium transition-all duration-500 transform hover:scale-110 ${
                            activeCategory === category.id
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl shadow-purple-500/30"
                                : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-xl backdrop-blur-sm border border-gray-200/50"
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-lg animate-pulse">{category.icon}</span>
                            <span className="font-semibold">{category.name}</span>
                        </div>
                    </button>
                ))}
            </div>
        </nav>
    );
};

const Home = () => {
    const [items, setItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState("rings");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState(new Set());
    const [hoveredItem, setHoveredItem] = useState(null);
    const [showAuth, setShowAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is logged in on component mount
    useEffect(() => {
        const savedUser = localStorage.getItem('luxegems_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        } else {
            // Show auth modal if not logged in
            setShowAuth(true);
        }
    }, []);

    const handleLogin = () => {
        setShowAuth(true);
    };

    const handleLoginSuccess = () => {
        const savedUser = localStorage.getItem('luxegems_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
    };

    const handleLogout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('luxegems_user');
        setShowAuth(true); // Show auth modal after logout

        // Show logout confirmation
        const logoutAnimation = document.createElement('div');
        logoutAnimation.className = 'fixed top-20 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 animate-bounce';
        logoutAnimation.innerHTML = `👋 Successfully logged out!`;
        document.body.appendChild(logoutAnimation);

        setTimeout(() => document.body.removeChild(logoutAnimation), 3000);
    };

    // Mock data
    const mockItems = [
        {
            id: 1,
            title: "Diamond Eternity Ring",
            price: 45999,
            sku: "DER001",
            category: "rings",
            image: "💍",
            rating: 4.9,
            discount: 15,
            isNew: true,
            description: "Роскошное кольцо с бриллиантами класса VVS"
        },
        {
            id: 2,
            title: "Pearl Choker Necklace",
            price: 28999,
            sku: "PCN002",
            category: "necklaces",
            image: "📿",
            rating: 4.8,
            discount: 0,
            isNew: false,
            description: "Элегантное ожерелье из натурального жемчуга"
        },
        {
            id: 3,
            title: "Gold Drop Earrings",
            price: 18999,
            sku: "GDE003",
            category: "earrings",
            image: "✨",
            rating: 4.7,
            discount: 25,
            isNew: true,
            description: "Изящные золотые серьги с подвесками"
        },
        {
            id: 4,
            title: "Tennis Diamond Bracelet",
            price: 67999,
            sku: "TDB004",
            category: "bracelets",
            image: "🔗",
            rating: 4.9,
            discount: 0,
            isNew: false,
            description: "Классический теннисный браслет с бриллиантами"
        },
        {
            id: 5,
            title: "Swiss Luxury Watch",
            price: 125999,
            sku: "SLW005",
            category: "watches",
            image: "⌚",
            rating: 5.0,
            discount: 10,
            isNew: true,
            description: "Премиальные швейцарские часы с автоподзаводом"
        },
        {
            id: 6,
            title: "Bridal Jewelry Set",
            price: 189999,
            sku: "BJS006",
            category: "sets",
            image: "💎",
            rating: 4.8,
            discount: 20,
            isNew: false,
            description: "Роскошный свадебный комплект украшений"
        }
    ];

    const fetchItems = useCallback(async () => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setItems(mockItems);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const filteredItems = items.filter((item) => {
        const matchCategory = !activeCategory || item.category === activeCategory;
        const matchSearch =
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.sku?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    const toggleFavorite = (itemId) => {
        // Only allow favorites for logged in users
        if (!isAuthenticated) {
            setShowAuth(true);
            return;
        }

        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(itemId)) {
                newFavorites.delete(itemId);
            } else {
                newFavorites.add(itemId);
            }
            return newFavorites;
        });
    };

    const addToCart = (item) => {
        // Only allow adding to cart for logged in users
        if (!isAuthenticated) {
            setShowAuth(true);
            return;
        }

        // Create floating animation
        const cartAnimation = document.createElement('div');
        cartAnimation.className = 'fixed top-20 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 animate-bounce';
        cartAnimation.innerHTML = `🛒 ${item.title} добавлен в корзину!`;
        document.body.appendChild(cartAnimation);

        setTimeout(() => document.body.removeChild(cartAnimation), 3000);
    };

    return (
        <AuthProvider>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30">
                {/* Auth Modal - shown when not authenticated */}
                {showAuth && !isAuthenticated && (
                    <AuthModal
                        onClose={() => setShowAuth(false)}
                        onLoginSuccess={handleLoginSuccess}
                    />
                )}

                {/* Animated background */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
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

                <Header
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    user={user}
                    onLogout={handleLogout}
                    onLoginClick={handleLogin}
                />

                {/* Show content only if authenticated */}
                {isAuthenticated ? (
                    <>
                        <Categories
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                            onItemAdded={fetchItems}
                        />

                        <div className="max-w-7xl mx-auto px-4 pb-12">
                            {loading ? (
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
                                        <div
                                            key={item.id}
                                            className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/50 overflow-hidden"
                                            onMouseEnter={() => setHoveredItem(item.id)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                            style={{
                                                animationDelay: `${index * 100}ms`
                                            }}
                                        >
                                            {/* Premium glow effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                            {/* Badges */}
                                            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                                                {item.isNew && (
                                                    <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                            ✨ NEW
                          </span>
                                                )}
                                                {item.discount > 0 && (
                                                    <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold rounded-full shadow-lg">
                            -{item.discount}% 🔥
                          </span>
                                                )}
                                            </div>

                                            {/* Favorite button */}
                                            <button
                                                onClick={() => toggleFavorite(item.id)}
                                                className={`absolute top-4 right-4 z-20 p-2 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
                                                    favorites.has(item.id)
                                                        ? 'bg-red-500 text-white shadow-lg'
                                                        : 'bg-white/70 text-gray-600 hover:bg-red-50 hover:text-red-500'
                                                }`}
                                            >
                                                <Heart className={`w-4 h-4 ${favorites.has(item.id) ? 'fill-current' : ''}`} />
                                            </button>

                                            {/* Product image */}
                                            <div className="relative p-8 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
                                                <div className="text-6xl transform group-hover:scale-110 transition-transform duration-500">
                                                    {item.image}
                                                </div>

                                                {/* Floating sparkles */}
                                                {hoveredItem === item.id && (
                                                    <div className="absolute inset-0">
                                                        {[...Array(6)].map((_, i) => (
                                                            <Sparkles
                                                                key={i}
                                                                className="absolute w-4 h-4 text-yellow-400 animate-ping"
                                                                style={{
                                                                    top: `${20 + Math.random() * 60}%`,
                                                                    left: `${20 + Math.random() * 60}%`,
                                                                    animationDelay: `${i * 200}ms`
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product details */}
                                            <div className="p-6 space-y-4">
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
                                                    <span className="text-sm text-gray-600 font-medium">
                            {item.rating} ({Math.floor(Math.random() * 200) + 50} отзывов)
                          </span>
                                                </div>

                                                {/* Title */}
                                                <h3 className="font-bold text-lg text-gray-800 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                                                    {item.title}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-sm text-gray-600 line-clamp-2">
                                                    {item.description}
                                                </p>

                                                {/* SKU */}
                                                <p className="text-xs text-gray-500 font-mono bg-gray-100 rounded-lg px-2 py-1 inline-block">
                                                    Артикул: {item.sku}
                                                </p>

                                                {/* Price */}
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-2">
                                                        {item.discount > 0 && (
                                                            <span className="text-lg text-gray-400 line-through font-medium">
                                {item.price.toLocaleString()}₽
                              </span>
                                                        )}
                                                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              {Math.floor(item.price * (1 - item.discount / 100)).toLocaleString()}₽
                            </span>
                                                    </div>
                                                </div>

                                                {/* Action buttons */}
                                                <div className="flex gap-3 pt-2">
                                                    <button
                                                        onClick={() => addToCart(item)}
                                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 group"
                                                    >
                                                        <ShoppingCart className="w-4 h-4 group-hover:animate-bounce" />
                                                        <span>В корзину</span>
                                                    </button>

                                                    <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all duration-300 transform hover:scale-110">
                                                        <Eye className="w-4 h-4 text-gray-600" />
                                                    </button>
                                                </div>

                                                {/* Premium badge */}
                                                <div className="flex items-center justify-center gap-2 pt-2">
                                                    <Crown className="w-4 h-4 text-yellow-500" />
                                                    <span className="text-xs text-gray-600 font-medium">Premium Quality</span>
                                                    <Diamond className="w-4 h-4 text-blue-500 animate-pulse" />
                                                </div>
                                            </div>

                                            {/* Hover overlay */}
                                            {hoveredItem === item.id && (
                                                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 via-transparent to-transparent pointer-events-none"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Premium features section */}
                            {!loading && filteredItems.length > 0 && (
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
                    </>
                ) : (
                    // Show loading or message while not authenticated
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="text-center">
                            <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-6 mx-auto"></div>
                            <p className="text-xl text-gray-600">Please authenticate to continue</p>
                        </div>
                    </div>
                )}

                <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
            </div>
        </AuthProvider>
    );
};

export default Home;