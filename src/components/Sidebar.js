import React from 'react';
import { Link } from 'react-router-dom';
import { HiMiniBars3, HiOutlineUsers } from "react-icons/hi2";
import { TiDocumentAdd } from "react-icons/ti";
import { LuFileText } from "react-icons/lu";
import { TbLayoutDashboard } from "react-icons/tb";
import { MdOutlineLogout } from "react-icons/md";
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <HiMiniBars3 />
        </button>
      </div>

      <ul className="sidebar-menu">
        <li>
          <Link to="/adicionar-proposta" className="sidebar-item">
            <TiDocumentAdd className="sidebar-icon" />
            {isOpen && 'Nova Proposta'}
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="sidebar-item">
            <TbLayoutDashboard className="sidebar-icon" />
            {isOpen && 'Dashboard'}
          </Link>
        </li>
        <li>
          <Link to="/propostas" className="sidebar-item">
            <LuFileText className="sidebar-icon" />
            {isOpen && 'Propostas'}
          </Link>
        </li>
        <li>
          <Link to="/clientes" className="sidebar-item">
            <HiOutlineUsers className="sidebar-icon" />
            {isOpen && 'Clientes'}
          </Link>
        </li>
      </ul>

      <div className="sidebar-footer">
        <Link to="/login" className="logout-btn">
          <MdOutlineLogout className="sidebar-icon" />
          {isOpen && 'Sair'}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
