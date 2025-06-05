// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !senha) {
      toast.error('Preencha todos os campos.');
      return;
    }

    // Simulação de login básico
    if (email === 'admin@demo.com' && senha === '123456') {
      localStorage.setItem('auth', JSON.stringify({ email }));
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } else {
      toast.error('E-mail ou senha inválidos.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Entrar no Sistema</h2>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
