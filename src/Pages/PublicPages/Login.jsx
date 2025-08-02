import React from "react";

const Login = () => {
    const handleLogin = () => {
        localStorage.setItem("token", "uygbgiuhb");
        window.location.reload();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600">
            <div className="bg-white bg-opacity-90 p-10 rounded-2xl shadow-lg w-full max-w-sm">
                <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
                    Welcome Back
                </h1>
                <button
                    onClick={handleLogin}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-300"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
