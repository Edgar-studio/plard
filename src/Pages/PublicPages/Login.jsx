import React from 'react';

const Login = () => {
    const handleLogin = () => {
        localStorage.setItem('token', 'uygbgiuhb');
        window.location.reload();
    }
    return (
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;