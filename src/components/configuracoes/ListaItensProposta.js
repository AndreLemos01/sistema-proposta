import React, { useState } from 'react';

const ListaItensProposta = ({ itens, onAdd }) => {
  const [novoItem, setNovoItem] = useState('');

  const handleAdicionar = () => {
    if (novoItem.trim() !== '') {
      onAdd(novoItem);
      setNovoItem('');
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nome do novo item"
          className="flex-1 border rounded p-2"
          value={novoItem}
          onChange={(e) => setNovoItem(e.target.value)}
        />
        <button
          className="bg-[#F39C12] text-white px-4 rounded"
          onClick={handleAdicionar}
        >
          Adicionar
        </button>
      </div>

      <ul className="list-disc ml-5">
        {itens.map((item, idx) => (
          <li key={idx} className="mb-1">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListaItensProposta;
