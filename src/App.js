import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { PropostasProvider } from './context/PropostasContext';
import { ItensProvider } from './context/ItensContext';
import { ConfigProvider } from './context/ConfigContext';

import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Propostas from './pages/Propostas';
import Clientes from './pages/Clientes';
import AdicionarProposta from './pages/AdicionarProposta';
import Configuracoes from './pages/Configuracoes';
import Login from './pages/Login';
import PrivateRoute from './routes/PrivateRoute';

function Layout() {
  const location = useLocation();
  const isAuth = localStorage.getItem('auth');
  const hideSidebarOnLogin = location.pathname === '/login';

  return (
    <>
      {isAuth && !hideSidebarOnLogin && <Sidebar />}
      <Toaster position="top-right" />
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/propostas" element={<PrivateRoute><Propostas /></PrivateRoute>} />
          <Route path="/clientes" element={<PrivateRoute><Clientes /></PrivateRoute>} />
          <Route path="/adicionar-proposta" element={<PrivateRoute><AdicionarProposta /></PrivateRoute>} />
          <Route path="/configuracoes" element={<PrivateRoute><Configuracoes /></PrivateRoute>} />
        </Routes>
      </div>
    </>
  );
}

function App() {
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

export default App;
