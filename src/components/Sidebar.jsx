import React, { useState, useRef, useEffect } from 'react';
import styles from './Sidebar.module.css';
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiPlusCircle,
  FiMoreVertical,
  FiSettings,
  FiLogOut,
  FiMenu,
} from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';

function Sidebar({ isOpen, toggleSidebar }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Fecha menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleConfigClick = () => {
    setMenuOpen(false);
    navigate('/configuracoes');
  };

  const handleLogoutClick = () => {
    setMenuOpen(false);
    localStorage.removeItem('auth');
    navigate('/login');
  };

  // Dados fictícios de usuário (substitua pelo real via props/context)
  const user = {
    name: 'João Silva',
    email: 'joao.silva@email.com',
    photoURL: '/default-user.png',
  };

  return (
    <nav className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <header className={styles.sidebarHeader}>
        <button
          className={styles.toggleButton}
          onClick={toggleSidebar}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <FiMenu size={24} />
        </button>
      </header>

      <ul className={styles.navList}>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            <FiHome size={20} />
            {isOpen && <span className={styles.linkText}>Dashboard</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clientes"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            <FiUsers size={20} />
            {isOpen && <span className={styles.linkText}>Clientes</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/propostas"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            <FiFileText size={20} />
            {isOpen && <span className={styles.linkText}>Propostas</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/adicionar-proposta"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            <FiPlusCircle size={20} />
            {isOpen && <span className={styles.linkText}>Nova Proposta</span>}
          </NavLink>
        </li>
      </ul>

      <footer className={styles.sidebarFooter}>
        {isOpen && (
          <div className={styles.userInfo}>
            <img
              src={user.photoURL}
              alt="Foto do usuário"
              className={styles.userPhoto}
            />
            <div className={styles.userText}>
              <span className={styles.userName}>{user.name}</span>
              <span className={styles.userEmail}>{user.email}</span>
            </div>
          </div>
        )}

        <div className={styles.menuWrapper} ref={menuRef}>
          <button
            className={styles.menuButton}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Abrir menu de usuário"
          >
            <FiMoreVertical size={20} />
          </button>

          {menuOpen && (
            <ul className={styles.menuDropdown} role="menu">
              <li
                role="menuitem"
                tabIndex={0}
                onClick={handleConfigClick}
                onKeyDown={(e) => e.key === 'Enter' && handleConfigClick()}
                className={styles.menuItem}
              >
                <FiSettings size={16} style={{ marginRight: 8 }} />
                Configurações
              </li>
              <li
                role="menuitem"
                tabIndex={0}
                onClick={handleLogoutClick}
                onKeyDown={(e) => e.key === 'Enter' && handleLogoutClick()}
                className={styles.menuItem}
              >
                <FiLogOut size={16} style={{ marginRight: 8 }} />
                Sair
              </li>
            </ul>
          )}
        </div>
      </footer>
    </nav>
  );
}

export default Sidebar;
