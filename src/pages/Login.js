import React, { useState } from 'react';
import ContentPage from "../components/Content/ContentPage";

const LoginForm = ({ onLogin, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="emailInput">Email:</label>
        <input type="email" id="emailInput" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="passwordInput">Senha:</label>
        <input type="password" id="passwordInput" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
