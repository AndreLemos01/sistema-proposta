// src/components/configuracoes/PrazoValidade.js
import React, { useState } from "react";
import { Input } from "../ui/input"; // Supondo que o Input seja um componente reutilizável
import { Button } from "../ui/button"; // Supondo que o Button seja um componente reutilizável

const PrazoValidade = ({ prazosValidade, setPrazosValidade }) => {
  const [novoPrazo, setNovoPrazo] = useState("");

  // Função para adicionar um novo prazo de validade
  const handleAdicionarPrazo = () => {
    if (!novoPrazo.trim()) return;  // Evitar adicionar prazo vazio
    setPrazosValidade([...prazosValidade, novoPrazo]);  // Adiciona o novo prazo de validade
    setNovoPrazo("");  // Limpa o campo de entrada após adicionar
  };

  // Função para remover um prazo de validade
  const handleRemoverPrazo = (item) => {
    const updatedList = prazosValidade.filter((i) => i !== item);  // Remove o prazo de validade da lista
    setPrazosValidade(updatedList);  // Atualiza o estado com a lista sem o prazo removido
  };

  return (
    <div>
      <h3>Validade da Proposta</h3>
      <Input
        value={novoPrazo}
        onChange={(e) => setNovoPrazo(e.target.value)}  // Atualiza o valor do campo
        placeholder="Adicionar novo prazo de validade"
      />
      <Button onClick={handleAdicionarPrazo}>Adicionar</Button>  {/* Botão para adicionar o prazo de validade */}
      
      <ul>
        {prazosValidade.map((item, index) => (
          <li key={index}>
            {item}{" "}
            <Button onClick={() => handleRemoverPrazo(item)}>Remover</Button>  {/* Botão para remover o prazo de validade */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrazoValidade;
