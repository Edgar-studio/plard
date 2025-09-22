import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Pages from "./Pages/Pages.jsx";
import Header from "./Components/Header.jsx";
import { checkAdminStatus } from './store/slices/authSlice'

function App() {
    const dispatch = useDispatch();
    const { isAuthenticated, isAdmin } = useSelector(state => state.auth);

    useEffect(() => {
        // Check admin status on app load
        dispatch(checkAdminStatus());
    }, [dispatch]);

    return (
        <>
            {isAuthenticated && <Header />}
            <Pages />
        </>
    )
}

export default App;
