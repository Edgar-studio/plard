
import './App.css'
import Pages from "./Pages/Pages.jsx";
import Header from "./Components/Header.jsx";

function App() {
  const token = localStorage.getItem('token');

  return (
    <>
      {token &&  <Header />}
    <Pages />
    </>
  )
}

export default App
