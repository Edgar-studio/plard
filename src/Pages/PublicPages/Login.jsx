import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4000/login", {
                username,
                password,
            });
            localStorage.setItem("token", res.data.token);
            window.location.reload();
        } catch (err) {
            setError("Ошибка входа. Проверьте данные.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Вход</h2>
                <p className="text-sm text-gray-500 text-center mt-1 mb-6">
                    Введите логин и пароль для входа
                </p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-600">Имя пользователя</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-3 mt-1 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Пароль</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 mt-1 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow hover:shadow-lg transition-all"
                    >
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
