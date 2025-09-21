import React, { useState, useContext } from "react";
import { Lock, User, ArrowLeft } from "lucide-react";

const Login = ({ onClose, onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { register, login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccessMessage("");

        setTimeout(() => {
            if (isLogin) {
                const result = login(email, password);
                if (result.success) {
                    onLoginSuccess();
                    onClose();
                } else {
                    setError(result.message);
                }
            } else {
                const result = register(email, password, name);
                if (result.success) {
                    setSuccessMessage(result.message);
                    setIsLogin(true);
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

export default Login;