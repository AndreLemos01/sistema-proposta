import React, { createContext, useState } from 'react';

export const PropostasContext = createContext();

export const PropostasProvider = ({ children }) => {
  const [propostas, setPropostas] = useState([]); // Estado das propostas

  return (
    <PropostasContext.Provider value={{ propostas, setPropostas }}>
      {children}
    </PropostasContext.Provider>
  );
};
