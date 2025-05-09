import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTh, FaFileInvoice, FaUser, FaPlusCircle, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? <FaBars /> : <FaTh />}
        </button>
      </div>

      <div className="sidebar-content">
        <ul className="sidebar-menu">
          <li>
            <Link to="/adicionar-proposta" className="sidebar-item nova-proposta">
              <FaPlusCircle className="sidebar-icon" />
              {isOpen && 'Nova Proposta'}
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="sidebar-item">
              <FaTh className="sidebar-icon" />
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

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="sidebar-item" style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}>
          <FaSignOutAlt className="sidebar-icon" />
          {isOpen && 'Sair'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
