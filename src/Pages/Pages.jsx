import React from 'react';
import {useRoutes} from "react-router-dom";
import {PrivateRoutes, PublicRoutes} from "../utils/routes.jsx";

const Pages = () => {
    const token = localStorage.getItem('token');
    return (
        <div>
            {useRoutes(token ? PrivateRoutes : PublicRoutes)}
        </div>
    );
};

export default Pages;