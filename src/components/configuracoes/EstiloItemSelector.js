import React from 'react';

const EstiloItemSelector = ({ estilo, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">Selecione o estilo:</label>
      <select
        className="border rounded p-2 w-full"
        value={estilo}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="agrupado">Agrupável por Tipo</option>
        <option value="tecnico">Com Detalhamento Técnico</option>
        <option value="simples">Simples</option>
      </select>
    </div>
  );
};

export default EstiloItemSelector;
