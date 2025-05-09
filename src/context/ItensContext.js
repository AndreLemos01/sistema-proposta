import React, { createContext, useState } from "react";

export const ItensContext = createContext();

export const ItensProvider = ({ children }) => {
  const [itens, setItens] = useState([]);

  const adicionarItem = (novoItem) => {
    setItens((prev) => [...prev, novoItem]);
  };

  const atualizarItem = (itemAtualizado) => {
    setItens((prev) =>
      prev.map((item) => (item.id === itemAtualizado.id ? itemAtualizado : item))
    );
  };

  const removerItem = (id) => {
    setItens((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ItensContext.Provider value={{ itens, adicionarItem, atualizarItem, removerItem }}>
      {children}
    </ItensContext.Provider>
  );
};
