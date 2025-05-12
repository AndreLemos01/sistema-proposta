// src/components/configuracoes/ModeloTexto.js
import React, { useState } from "react";
import { Input } from "../ui/input"; // Supondo que o Input seja um componente reutilizável
import { Button } from "../ui/button"; // Supondo que o Button seja um componente reutilizável

const ModeloTexto = ({ modelosTexto, setModelosTexto }) => {
  const [novoModeloTexto, setNovoModeloTexto] = useState("");

  // Função para adicionar um novo modelo de texto
  const handleAdicionarModeloTexto = () => {
    if (!novoModeloTexto.trim()) return;  // Evitar adicionar texto vazio
    setModelosTexto([...modelosTexto, novoModeloTexto]);  // Adiciona o novo modelo de texto
    setNovoModeloTexto("");  // Limpa o campo de entrada após adicionar
  };

  // Função para remover um modelo de texto
  const handleRemoverModeloTexto = (item) => {
    const updatedList = modelosTexto.filter((i) => i !== item);  // Remove o modelo de texto da lista
    setModelosTexto(updatedList);  // Atualiza o estado com a lista sem o modelo removido
  };

  return (
    <div>
      <h3>Modelo de Texto</h3>
      <Input
        value={novoModeloTexto}
        onChange={(e) => setNovoModeloTexto(e.target.value)}  // Atualiza o valor do campo
        placeholder="Adicionar novo modelo de texto"
      />
      <Button onClick={handleAdicionarModeloTexto}>Adicionar</Button>  {/* Botão para adicionar o modelo de texto */}
      
      <ul>
        {modelosTexto.map((item, index) => (
          <li key={index}>
            {item}{" "}
            <Button onClick={() => handleRemoverModeloTexto(item)}>Remover</Button>  {/* Botão para remover o modelo de texto */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModeloTexto;
