// src/components/configuracoes/FormaPagamento.js
import React, { useState } from "react";
import { Input } from "../ui/input"; // Supondo que o Input seja um componente reutilizável
import { Button } from "../ui/button"; // Supondo que o Button seja um componente reutilizável

const FormaPagamento = ({ formasPagamento, setFormasPagamento }) => {
  const [novaFormaPagamento, setNovaFormaPagamento] = useState("");

  // Função para adicionar uma nova forma de pagamento
  const handleAdicionarFormaPagamento = () => {
    if (!novaFormaPagamento.trim()) return;  // Evitar adicionar forma de pagamento vazia
    setFormasPagamento([...formasPagamento, novaFormaPagamento]);  // Adiciona a nova forma de pagamento
    setNovaFormaPagamento("");  // Limpa o campo de entrada após adicionar
  };

  // Função para remover uma forma de pagamento
  const handleRemoverFormaPagamento = (item) => {
    const updatedList = formasPagamento.filter((i) => i !== item);  // Remove a forma de pagamento da lista
    setFormasPagamento(updatedList);  // Atualiza o estado com a lista sem a forma removida
  };

  return (
    <div>
      <h3>Forma de Pagamento</h3>
      <Input
        value={novaFormaPagamento}
        onChange={(e) => setNovaFormaPagamento(e.target.value)}  // Atualiza o valor do campo
        placeholder="Adicionar nova forma de pagamento"
      />
      <Button onClick={handleAdicionarFormaPagamento}>Adicionar</Button>  {/* Botão para adicionar a forma de pagamento */}
      
      <ul>
        {formasPagamento.map((item, index) => (
          <li key={index}>
            {item}{" "}
            <Button onClick={() => handleRemoverFormaPagamento(item)}>Remover</Button>  {/* Botão para remover a forma de pagamento */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormaPagamento;
