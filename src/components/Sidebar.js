import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTh, FaFileInvoice, FaUser, FaPlusCircle } from 'react-icons/fa'; // FaTh é o ícone com contornos
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Controla o estado da sidebar (aberta ou fechada)

  const toggleSidebar = () => setIsOpen(!isOpen); // Função para alternar o estado

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        {/* Header com o ícone de alternar */}
        <div className="sidebar-header">
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isOpen ? <FaBars /> : <FaTh />}
          </button>
        </div>

        {/* Conteúdo da Sidebar */}
        <div className="sidebar-content">
          <ul className="sidebar-menu">
            {/* Nova Proposta como primeiro item */}
            <li>
              <Link to="/adicionar-proposta" className="sidebar-item nova-proposta">
                <FaPlusCircle className="sidebar-icon" />
                {isOpen && 'Nova Proposta'}
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="sidebar-item">
                <FaTh className="sidebar-icon" /> {/* Ícone moderno com contornos */}
                {isOpen && 'Dashboard'}
              </Link>
            </li>
            <li>
              <Link to="/propostas" className="sidebar-item">
                <FaFileInvoice className="sidebar-icon" />
                {isOpen && 'Propostas'}
              </Link>
            </li>
            <li>
              <Link to="/clientes" className="sidebar-item">
                <FaUser className="sidebar-icon" />
                {isOpen && 'Clientes'}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main content area */}
      <div className={`main-content ${isOpen ? 'shifted' : 'shifted-closed'}`}>
        {/* O conteúdo da aplicação vai aqui */}
      </div>
    </>
  );
};

export default Sidebar;
