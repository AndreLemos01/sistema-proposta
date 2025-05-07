import React, { useState } from 'react';
import './Clientes.css';

const Clientes = () => {
  // Exemplo de lista de clientes
  const [clientes, setClientes] = useState([
    { id: 1, nome: 'Cliente 1', email: 'cliente1@example.com' },
    { id: 2, nome: 'Cliente 2', email: 'cliente2@example.com' },
  ]);

  return (
    <div className="clientes">
      <h2>Clientes</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>
                <button>Editar</button>
                <button>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clientes;
