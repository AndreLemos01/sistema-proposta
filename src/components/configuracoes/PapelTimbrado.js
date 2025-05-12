// src/components/configuracoes/PapelTimbrado.js
import React, { useState } from "react";
import { Input } from "../ui/input"; // Supondo que o Input seja um componente reutilizável
import { Button } from "../ui/button"; // Supondo que o Button seja um componente reutilizável

const PapelTimbrado = ({ papeisTimbrados, setPapeisTimbrados }) => {
  const [novoPapelTimbrado, setNovoPapelTimbrado] = useState("");

  // Função para adicionar um novo modelo de papel timbrado
  const handleAdicionarPapelTimbrado = () => {
    if (!novoPapelTimbrado.trim()) return;  // Evitar adicionar modelo vazio
    setPapeisTimbrados([...papeisTimbrados, novoPapelTimbrado]);  // Adiciona o novo modelo de papel timbrado
    setNovoPapelTimbrado("");  // Limpa o campo de entrada após adicionar
  };

  // Função para remover um modelo de papel timbrado
  const handleRemoverPapelTimbrado = (item) => {
    const updatedList = papeisTimbrados.filter((i) => i !== item);  // Remove o papel timbrado da lista
    setPapeisTimbrados(updatedList);  // Atualiza o estado com a lista sem o papel removido
  };

  return (
    <div>
      <h3>Modelos de Papel Timbrado</h3>
      <Input
        value={novoPapelTimbrado}
        onChange={(e) => setNovoPapelTimbrado(e.target.value)}  // Atualiza o valor do campo
        placeholder="Adicionar novo modelo de papel timbrado"
      />
      <Button onClick={handleAdicionarPapelTimbrado}>Adicionar</Button>  {/* Botão para adicionar o modelo de papel timbrado */}
      
      <ul>
        {papeisTimbrados.map((item, index) => (
          <li key={index}>
            {item}{" "}
            <Button onClick={() => handleRemoverPapelTimbrado(item)}>Remover</Button>  {/* Botão para remover o papel timbrado */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PapelTimbrado;
