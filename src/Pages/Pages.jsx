import React from 'react';
import { useSelector } from 'react-redux';
import { useRoutes } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../utils/routes.jsx";

const Pages = () => {
    const { isAuthenticated } = useSelector(state => state.auth);
    
    return (
        <div>
            {useRoutes(isAuthenticated ? PrivateRoutes : PublicRoutes)}
        </div>
    );
};

export default Pages;