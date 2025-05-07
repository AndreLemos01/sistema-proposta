import React, { useContext } from "react";
import { PropostasContext } from "../context/PropostasContext"; // Importe o contexto

const Propostas = () => {
  const { propostas } = useContext(PropostasContext); // Usando o contexto para acessar as propostas

  return (
    <div className="propostas-container">
      <h1>Gerenciar Propostas</h1>

      {/* Lista de propostas */}
      <h2>Propostas Existentes</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {propostas.map((proposta) => (
            <tr key={proposta.id}>
              <td>{proposta.id}</td>
              <td>{proposta.cliente}</td>
              <td>{proposta.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Propostas;
