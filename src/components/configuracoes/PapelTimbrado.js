import React, { useState } from "react";

const PapelTimbrado = ({ papeisTimbrados, setPapeisTimbrados }) => {
  const [novoPapelTimbrado, setNovoPapelTimbrado] = useState("");

  const handleAdicionarPapelTimbrado = () => {
    if (!novoPapelTimbrado.trim()) return;
    setPapeisTimbrados([...papeisTimbrados, novoPapelTimbrado]);
    setNovoPapelTimbrado("");
  };

  const handleRemoverPapelTimbrado = (item) => {
    const updatedList = papeisTimbrados.filter((i) => i !== item);
    setPapeisTimbrados(updatedList);
  };

  return (
    <div>
      <h3>Modelos de Papel Timbrado</h3>
      <input
        value={novoPapelTimbrado}
        onChange={(e) => setNovoPapelTimbrado(e.target.value)}
        placeholder="Adicionar novo modelo de papel timbrado"
      />
      <button onClick={handleAdicionarPapelTimbrado} className="add-button">Adicionar</button>
      
      <ul>
        {papeisTimbrados.map((item, index) => (
          <li key={index}>
            {item}{" "}
            <button onClick={() => handleRemoverPapelTimbrado(item)} className="remove-button">Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PapelTimbrado;
;
