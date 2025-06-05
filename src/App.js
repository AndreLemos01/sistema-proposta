import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { PropostasProvider } from './context/PropostasContext';
import { ItensProvider } from './context/ItensContext';
import { ConfigProvider } from './context/ConfigContext';

import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Propostas from './pages/Propostas';
import Clientes from './pages/Clientes'; // Importa Clientes que gerencia a sub-rota
import AdicionarProposta from './pages/AdicionarProposta';
import ConfiguracoesProposta from './pages/ConfiguracoesProposta';
import Login from './pages/Login';
import PrivateRoute from './routes/PrivateRoute';

import styles from './App.module.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const isAuth = localStorage.getItem('auth');
  const hideSidebar = location.pathname === '/login';

  return (
    <>
      {isAuth && !hideSidebar && (
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <Toaster position="top-right" />
      <main
        className={`${styles.mainContent} ${
          sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed
        }`}
      >
        <Routes>
          <Route path="/login" element={isAuth ? <Navigate to="/" /> : <Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/propostas"
            element={
              <PrivateRoute>
                <Propostas />
              </PrivateRoute>
            }
          />
          {/* Aqui Clientes gerencia suas sub-rotas, incluindo /clientes/novo-cliente */}
          <Route
            path="/clientes/*"
            element={
              <PrivateRoute>
                <Clientes />
              </PrivateRoute>
            }
          />
          <Route
            path="/adicionar-proposta"
            element={
              <PrivateRoute>
                <AdicionarProposta />
              </PrivateRoute>
            }
          />
          <Route
            path="/configuracoes"
            element={
              <PrivateRoute>
                <ConfiguracoesProposta />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ConfigProvider>
        <ItensProvider>
          <PropostasProvider>
            <Layout />
          </PropostasProvider>
        </ItensProvider>
      </ConfigProvider>
    </Router>
  );
}
