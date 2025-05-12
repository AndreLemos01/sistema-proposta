import React from "react";
import { FaSearch, FaUserPlus, FaFileExport } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Importar o useNavigate

const HeaderActions = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate(); // Hook para navegação

  const handleNewClientClick = () => {
    navigate("/novo-cliente"); // Redireciona para a rota /novo-cliente
  };

  return (
    <div className="actions">
      <button className="button new-client-btn" onClick={handleNewClientClick}>
        <FaUserPlus /> Novo Cliente
      </button>
      <input
        className="search-input"
        type="text"
        placeholder="Pesquisar por..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="button search-btn">
        <FaSearch /> Pesquisar
      </button>
      <button className="button export-btn">
        <FaFileExport /> Exportar
      </button>
      <span className="total-clientes">360 clientes</span>
    </div>
  );
};

export default HeaderActions;
