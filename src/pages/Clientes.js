import React, { useState, useEffect } from "react";

const Clientes = () => {
  const [nomeCliente, setNomeCliente] = useState("");  // Estado para o nome do cliente
  const [clientes, setClientes] = useState([]);  // Estado para armazenar os clientes

  // Carregar os clientes do localStorage ao iniciar a página
  useEffect(() => {
    const clientesSalvos = localStorage.getItem("clientes");
    if (clientesSalvos) {
      setClientes(JSON.parse(clientesSalvos));
    }
  }, []);

  // Função para adicionar um cliente
  const handleAdicionarCliente = () => {
    if (!nomeCliente) {
      alert("Por favor, insira o nome do cliente!");
      return;
    }

    // Criar novo cliente
    const novoCliente = { id: Date.now(), nome: nomeCliente };

    // Atualizar o estado de clientes
    const novosClientes = [...clientes, novoCliente];
    setClientes(novosClientes);

    // Salvar no localStorage
    localStorage.setItem("clientes", JSON.stringify(novosClientes));

    // Limpar o campo de entrada
    setNomeCliente("");
  };

  return (
    <div>
      <h1>Clientes</h1>
      <input
        type="text"
        value={nomeCliente}
        onChange={(e) => setNomeCliente(e.target.value)}
        placeholder="Digite o nome do cliente"
      />
      <button onClick={handleAdicionarCliente}>Adicionar Cliente</button>

      <h2>Clientes Cadastrados</h2>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>{cliente.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default Clientes;
