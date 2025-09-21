import './App.css'
import Pages from "./Pages/Pages.jsx";

function App() {
    const token = localStorage.getItem('token');

    return (
        <>
            {/* If you want Header always visible, uncomment this */}
            {/* {token && <Header />} */}
            <Pages />
        </>
    )
}

export default App;
