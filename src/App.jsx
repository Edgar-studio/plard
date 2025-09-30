import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, memo } from 'react'
import Pages from "./Pages/Pages.jsx";
import Header from "./Components/Header.jsx";
import { checkAdminStatus } from './store/slices/authSlice'

const App = memo(() => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        // Check admin status on app load
        dispatch(checkAdminStatus());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/20 to-blue-50/20">
            {/* Global background blur overlay */}
            <div className="fixed inset-0 bg-gradient-to-br from-purple-100/10 via-pink-100/10 to-blue-100/10 backdrop-blur-xs pointer-events-none" />
            
            <div className="relative z-10">
                {isAuthenticated && <Header />}
                <Pages />
            </div>
        </div>
    )
});

App.displayName = 'App';

export default App;
