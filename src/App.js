import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { PropostasProvider } from './context/PropostasContext';
import { ItensProvider } from './context/ItensContext';
import { ConfigProvider } from './context/ConfigContext';

// Importando o ThemeProvider do Material Tailwind
import { ThemeProvider } from '@material-tailwind/react';

import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Propostas from './pages/Propostas';
import Clientes from './pages/Clientes';
import AdicionarProposta from './pages/AdicionarProposta';
import Configuracoes from './pages/Configuracoes';
import Login from './pages/Login';
import PrivateRoute from './routes/PrivateRoute';
import NovoCliente from './components/clientes/NovoCliente'; // Importe a página de NovoCliente
import 'bootstrap/dist/css/bootstrap.min.css';


function Layout() {
  const location = useLocation();
  const isAuth = localStorage.getItem('auth');
  const hideSidebarOnLogin = location.pathname === '/login';
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      {isAuth && !hideSidebarOnLogin && <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
      <Toaster position="top-right" />
      <div className={`main-content ${sidebarOpen ? 'shifted' : 'shifted-closed'}`}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/propostas" element={<PrivateRoute><Propostas /></PrivateRoute>} />
          <Route path="/clientes" element={<PrivateRoute><Clientes /></PrivateRoute>} />
          <Route path="/adicionar-proposta" element={<PrivateRoute><AdicionarProposta /></PrivateRoute>} />
          <Route path="/configuracoes" element={<PrivateRoute><Configuracoes /></PrivateRoute>} />
          
          {/* Rota para o Novo Cliente */}
          <Route path="/novo-cliente" element={<PrivateRoute><NovoCliente /></PrivateRoute>} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    // Envolvendo toda a aplicação com o ThemeProvider para garantir que o contexto seja disponibilizado
    <ThemeProvider>
      <Router>
        <ConfigProvider>
          <ItensProvider>
            <PropostasProvider>
              <Layout />
            </PropostasProvider>
          </ItensProvider>
        </ConfigProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
