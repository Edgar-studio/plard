import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Sparkles, Diamond, Crown } from "lucide-react";

const Login = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (form.username === "admin" && form.password === "password") {
                // Mock successful login
                alert("Успешный вход! (В реальном приложении здесь был бы переход на главную страницу)");
                setForm({ username: "", password: "" });
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (err) {
            setError("Ошибка входа. Попробуйте admin/password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Dynamic Background */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`
                }}
            />

            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    >
                        <Sparkles className="w-2 h-2 text-purple-300/20" />
                    </div>
                ))}
            </div>

            {/* Floating Geometric Shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-purple-400/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-blue-400/20 rotate-45 animate-pulse" />
                <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border border-pink-400/20 rounded-lg animate-bounce" style={{ animationDuration: '3s' }} />
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <div className="w-full max-w-md">
                    {/* Glassmorphism Card */}
                    <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                        {/* Premium Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-3xl blur-xl" />

                        <div className="relative">
                            {/* Header with Animated Icons */}
                            <div className="text-center mb-8">
                                <div className="flex justify-center items-center gap-3 mb-4">
                                    <Diamond className="w-8 h-8 text-purple-300 animate-pulse" />
                                    <Crown className="w-10 h-10 text-yellow-300 animate-bounce" style={{ animationDuration: '2s' }} />
                                    <Diamond className="w-8 h-8 text-blue-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
                                </div>

                                <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent mb-2">
                                    Добро пожаловать
                                </h2>
                                <p className="text-white/70 text-sm">
                                    Войдите в мир роскошных украшений
                                </p>
                            </div>

                            <div className="space-y-6">
                                {/* Username Field */}
                                <div className="relative group">
                                    <label className="block text-sm font-medium text-white/80 mb-2">
                                        Имя пользователя
                                    </label>
                                    <div className="relative">
                                        <input
                                            name="username"
                                            type="text"
                                            value={form.username}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 backdrop-blur-sm"
                                            placeholder="Введите имя пользователя"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/0 to-purple-400/0 group-focus-within:from-purple-400/10 group-focus-within:via-transparent group-focus-within:to-purple-400/10 rounded-2xl transition-all duration-300 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="relative group">
                                    <label className="block text-sm font-medium text-white/80 mb-2">
                                        Пароль
                                    </label>
                                    <div className="relative">
                                        <input
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            value={form.password}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-4 pr-12 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 backdrop-blur-sm"
                                            placeholder="Введите пароль"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/0 to-purple-400/0 group-focus-within:from-purple-400/10 group-focus-within:via-transparent group-focus-within:to-purple-400/10 rounded-2xl transition-all duration-300 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-sm backdrop-blur-sm animate-pulse">
                                        {error}
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    onClick={handleLogin}
                                    disabled={loading}
                                    className="w-full relative overflow-hidden py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl font-semibold text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-70 group transform hover:scale-105"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="relative flex items-center justify-center gap-2">
                                        {loading && (
                                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        )}
                                        <span>{loading ? "Входим..." : "Войти в систему"}</span>
                                        {!loading && <Sparkles className="w-4 h-4 animate-pulse" />}
                                    </div>
                                </button>
                            </div>

                            {/* Demo Credentials */}
                            <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                                <p className="text-white/60 text-xs text-center mb-2">💡 Демо данные для входа:</p>
                                <div className="text-center text-sm text-white/80 space-y-1">
                                    <div>Логин: <span className="text-purple-300 font-mono bg-white/10 px-2 py-1 rounded">admin</span></div>
                                    <div>Пароль: <span className="text-purple-300 font-mono bg-white/10 px-2 py-1 rounded">password</span></div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="mt-6 flex justify-center space-x-4">
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;