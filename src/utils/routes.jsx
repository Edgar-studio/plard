import Home from "../Pages/PrivatePages/Home.jsx";
import AdminDashboard from "../Pages/PrivatePages/AdminDashboard.jsx";
import AdminRoute from "../Components/AdminRoute.jsx";
import {Navigate} from "react-router-dom";
import Login from "../Pages/PublicPages/Login.jsx";

export const LOGIN_PAGE = '/login'
export const HOME_PAGE = '/'
export const ADMIN_PAGE = '/admin'

export const PublicRoutes = [
    {path: LOGIN_PAGE, element: <Login />},
    {path: '*', element: <Navigate to={LOGIN_PAGE} />}
]

export const PrivateRoutes = [
    {path: HOME_PAGE, element: <Home />},
    {path: ADMIN_PAGE, element: <AdminRoute><AdminDashboard /></AdminRoute>},
    {path: '*', element: <Navigate to={HOME_PAGE} />}
]