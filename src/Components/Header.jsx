import React from 'react';

const Header = () => {

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <div className="w-full h-[10vh] bg-blue-400 ">
            Header
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Header;