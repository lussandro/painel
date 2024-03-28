import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Menu from "./components/Menu/Menu";
import Home from "./pages/Home";
import Cpf from "./pages/Cpf";
import Placas from "./pages/Placas";
import Cnpj from "./pages/Cnpj";
import Telefones from "./pages/Telefones";
import Cep from "./pages/Cep";
import Cns from "./pages/Cns";
import Emails from "./pages/Email";
import LoginForm from "./pages/LoginForm";
import UserPanel from "./pages/UserPanel";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  const [error, setError] = useState('');

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('https://baserow.falacomigo.cloud/api/auth/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      if (!response.ok) {
        throw new Error('Email ou senha incorretos.');
      }
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
      setError('');
    } catch (error) {
      setError(error.message);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cpf" element={<Cpf />} />
          <Route path="/placas" element={<Placas />} />            
          <Route path="/cnpj" element={<Cnpj />} />     
          <Route path="/telefone" element={<Telefones />} /> 
          <Route path="/cep" element={<Cep />} />        
          <Route path="/cns" element={<Cns />} />                    
          <Route path="/email" element={<Emails />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} error={error} />} />
          {isLoggedIn ? (
            <Route path="/user" element={<UserPanel onLogout={handleLogout} />} />
          ) : (
            <Navigate to="/login" />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
