import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Propostas from './pages/Propostas';
import Clientes from './pages/Clientes';
import AdicionarProposta from './pages/AdicionarProposta'; // Importe a nova página
import { PropostasProvider } from './context/PropostasContext'; // Importe o PropostasProvider
import Configuracoes from './pages/Configuracoes'; // Importe a nova página de configurações
import './App.css';

const App = () => {
  return (
    <PropostasProvider>
      <Router>
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/propostas" element={<Propostas />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/adicionar-proposta" element={<AdicionarProposta />} />
            <Route path="/configuracoes" element={<Configuracoes />} />  {/* Nova Rota */}
          </Routes>

          </div>
        </div>
      </Router>
    </PropostasProvider>
  );
};

export default App;
