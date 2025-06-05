import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import { FaArrowDown, FaArrowUp, FaTrash, FaUserPlus } from "react-icons/fa";
import NovoCliente from "./NovoCliente"; // Ajuste o caminho conforme seu projeto
import styles from "./Clientes.module.css";

const Clientes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [clientes, setClientes] = useState([
    { nome: "André Luiz Lemos", cpfCnpj: "123.456.789-00", email: "andre@example.com", telefone: "(11) 99999-9999", situacao: "Ativo" },
  ]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [selectedClient, setSelectedClient] = useState(null);

  // Adiciona cliente vindo de NovoCliente via navegação
  useEffect(() => {
    if (location.state?.novoCliente) {
      setClientes((prev) => [location.state.novoCliente, ...prev]);
      // Limpa o state para evitar duplicação se voltar para essa página
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    const sorted = [...clientes].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setClientes(sorted);
  };

  const excluirCliente = (index) => {
    if (window.confirm("Deseja realmente excluir este cliente?")) {
      setClientes((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className={styles.clientesContainer}>
      <header className={styles.header}>
        <h1>Cadastro de Clientes</h1>
        <button
          className={styles.btnNovoCliente}
          onClick={() => navigate("novo-cliente")}
          aria-label="Adicionar novo cliente"
        >
          <FaUserPlus /> Novo Cliente
        </button>
      </header>

      <table className={styles.table}>
        <thead>
          <tr>
            {["nome", "cpfCnpj", "email", "telefone", "situacao"].map((col) => (
              <th key={col} onClick={() => requestSort(col)} className={styles.th}>
                {col === "nome" && "Nome"}
                {col === "cpfCnpj" && "CPF / CNPJ"}
                {col === "email" && "E-mail"}
                {col === "telefone" && "Telefone"}
                {col === "situacao" && "Status"}
                {sortConfig.key === col && (
                  <span>
                    {sortConfig.direction === "ascending" ? <FaArrowUp /> : <FaArrowDown />}
                  </span>
                )}
              </th>
            ))}
            <th className={styles.thActions}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length === 0 ? (
            <tr>
              <td colSpan="6" className={styles.emptyMessage}>
                Nenhum cliente cadastrado. Clique em "Novo Cliente" para adicionar.
              </td>
            </tr>
          ) : (
            clientes.map((cliente, index) => (
              <tr
                key={index}
                className={selectedClient === cliente ? styles.selectedRow : ""}
                onClick={() => setSelectedClient(cliente)}
              >
                <td>{cliente.nome}</td>
                <td>{cliente.cpfCnpj}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.situacao}</td>
                <td className={styles.actions}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      excluirCliente(index);
                    }}
                    aria-label={`Excluir cliente ${cliente.nome}`}
                    className={styles.btnDelete}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Sub-rotas internas para abrir NovoCliente */}
      <Routes>
        <Route
          path="novo-cliente"
          element={
            <NovoCliente
              onClose={(novoCliente) => {
                if (novoCliente) {
                  setClientes((prev) => [novoCliente, ...prev]);
                }
                navigate("/clientes");
              }}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Clientes;
