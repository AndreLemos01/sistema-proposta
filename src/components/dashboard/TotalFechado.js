import React from "react";

const TotalFechado = ({ propostas }) => {
  const totalFechado = propostas
    .filter(p => p.status === "aprovada")
    .reduce((acc, curr) => acc + curr.valor, 0)
    .toFixed(2);

  return (
    <div className="card">
      <h3>Total Fechado</h3>
      <p>R$ {totalFechado}</p>
    </div>
  );
};

export default TotalFechado;
