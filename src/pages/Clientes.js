import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa"; // Importando os ícones de seta
import "./Clientes.css";
import HeaderActions from "../components/clientes/HeaderActions"; // Componente HeaderActions para gerenciar pesquisa e filtro

const Clientes = () => {
  const [activeTab, setActiveTab] = useState("todos"); // Controle de qual aba está ativa (Ativo, Inativo, Todos)
  const [clientes, setClientes] = useState([]); // Lista de clientes
  const [selectedClient, setSelectedClient] = useState(null); // Cliente selecionado
  const [modalShow, setModalShow] = useState(false); // Controle para mostrar o modal

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // Função para adicionar um novo cliente à lista
  const adicionarCliente = (cliente) => {
    setClientes((prevClientes) => [...prevClientes, cliente]);
    setModalShow(false); // Fecha o modal após adicionar o cliente
  };

  // Função para selecionar um cliente
  const selecionarCliente = (cliente) => {
    setSelectedClient(cliente);
  };

  // Função para excluir um cliente
  const excluirCliente = () => {
    if (selectedClient) {
      const confirmDelete = window.confirm("Deseja excluir este cliente?");
      if (confirmDelete) {
        setClientes((prevClientes) =>
          prevClientes.filter((client) => client !== selectedClient)
        );
        setSelectedClient(null); // Limpar seleção após exclusão
      }
    }
  };

  // Função para inativar um cliente
  const inativarCliente = () => {
    if (selectedClient) {
      setClientes((prevClientes) =>
        prevClientes.map((client) =>
          client === selectedClient
            ? { ...client, situacao: "Inativo" }
            : client
        )
      );
      setSelectedClient(null); // Limpar seleção após inativar
    }
  };

  // Função para filtrar clientes com base no status
  const filterClients = (status) => {
    if (!Array.isArray(clientes)) return []; // Garantir que seja um array
    if (status === "todos") return clientes;
    return clientes.filter((client) => client.situacao === status);
  };

  // Função para ordenar os clientes
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });

    const sortedClients = [...clientes].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setClientes(sortedClients);
  };

  return (
    <div className="clientes-container">
      <div className="header">
        <h1>Cadastro de Clientes</h1>
        {/* Componente HeaderActions gerencia pesquisa e filtro */}
        <HeaderActions setModalShow={setModalShow} />
      </div>

      {/* Exibe as abas Ativo, Inativo e Todos */}
      <div className="tabs">
        <div
          className={`tab ativo ${activeTab === "Ativo" ? "active" : ""}`}
          onClick={() => setActiveTab("Ativo")}
        >
          <h2>Ativo</h2>
          <span>{filterClients("Ativo").length}</span>
          <div className="bar"></div>
        </div>
        <div
          className={`tab inativo ${activeTab === "Inativo" ? "active" : ""}`}
          onClick={() => setActiveTab("Inativo")}
        >
          <h2>Inativo</h2>
          <span>{filterClients("Inativo").length}</span>
          <div className="bar"></div>
        </div>
        <div
          className={`tab todos ${activeTab === "todos" ? "active" : ""}`}
          onClick={() => setActiveTab("todos")}
        >
          <h2>Todos</h2>
          <span>{clientes.length}</span>
          <div className="bar"></div>
        </div>
      </div>

      {/* Tabela de clientes com base na aba ativa */}
      <div className="clientes-table">
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort("nome")}>
                Nome/Nome Fantasia
                {sortConfig.key === "nome" && (
                  <span>
                    {sortConfig.direction === "ascending" ? <FaArrowUp /> : <FaArrowDown />}
                  </span>
                )}
              </th>
              <th onClick={() => requestSort("cnpj")}>
                CPF / CNPJ
                {sortConfig.key === "cnpj" && (
                  <span>
                    {sortConfig.direction === "ascending" ? <FaArrowUp /> : <FaArrowDown />}
                  </span>
                )}
              </th>
              <th onClick={() => requestSort("email")}>
                E-mail
                {sortConfig.key === "email" && (
                  <span>
                    {sortConfig.direction === "ascending" ? <FaArrowUp /> : <FaArrowDown />}
                  </span>
                )}
              </th>
              <th onClick={() => requestSort("telefone")}>
                Telefone
                {sortConfig.key === "telefone" && (
                  <span>
                    {sortConfig.direction === "ascending" ? <FaArrowUp /> : <FaArrowDown />}
                  </span>
                )}
              </th>
              <th onClick={() => requestSort("situacao")}>
                Status
                {sortConfig.key === "situacao" && (
                  <span>
                    {sortConfig.direction === "ascending" ? <FaArrowUp /> : <FaArrowDown />}
                  </span>
                )}
              </th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filterClients(activeTab).map((client, index) => (
              <tr
                key={index}
                onClick={() => selecionarCliente(client)}
                className={selectedClient === client ? "selected" : ""}
              >
                <td>{client.nome} / {client.nomeFantasia}</td> {/* Exibindo Nome/Nome Fantasia na mesma célula */}
                <td>{client.cnpj}</td>
                <td>{client.email}</td>
                <td>{client.telefone}</td>
                <td>{client.situacao}</td>
                <td>
                  <button onClick={excluirCliente}>Excluir</button>
                  <button onClick={inativarCliente}>Inativar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;
