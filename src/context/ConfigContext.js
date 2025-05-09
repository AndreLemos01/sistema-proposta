import React, { createContext, useState, useEffect } from 'react';

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  // Definindo modelos padrão para introdução e modelos de texto
  const modeloIntroducaoPadrao = "Prezados, \n\nEstamos enviando a proposta conforme solicitado. Fique à vontade para analisar e entrar em contato para quaisquer dúvidas.";
  const modeloTextoPadrao = "Este é um modelo de proposta. Insira aqui os detalhes da proposta, condições, e outros pontos importantes.";

  // Inicializando estados com valores do localStorage
  const [clientes, setClientes] = useState(() => {
    const saved = localStorage.getItem('clientes');
    return saved ? JSON.parse(saved) : [];  // Não usar clientes fictícios, somente os salvos
  });

  const [modelosTexto, setModelosTexto] = useState(() => {
    const saved = localStorage.getItem('modelosTexto');
    return saved ? JSON.parse(saved) : [modeloTextoPadrao];
  });

  const [formasPagamento, setFormasPagamento] = useState(() => {
    const saved = localStorage.getItem('formasPagamento');
    return saved ? JSON.parse(saved) : ['30 dias', '60 dias', '90 dias'];
  });

  const [prazosValidade, setPrazosValidade] = useState(() => {
    const saved = localStorage.getItem('prazosValidade');
    return saved ? JSON.parse(saved) : ['7 dias', '15 dias', '30 dias'];
  });

  const [itensDisponiveis, setItensDisponiveis] = useState(() => {
    const saved = localStorage.getItem('itensDisponiveis');
    return saved ? JSON.parse(saved) : [];
  });

  const [papeisTimbrados, setPapeisTimbrados] = useState(() => {
    const saved = localStorage.getItem('papeisTimbrados');
    return saved ? JSON.parse(saved) : [];
  });

  const [introducoes, setIntroducoes] = useState(() => {
    const saved = localStorage.getItem('introducoes');
    return saved ? JSON.parse(saved) : [modeloIntroducaoPadrao];
  });

  // Função para carregar os dados do localStorage
  const loadFromLocalStorage = (key, setter) => {
    const savedData = localStorage.getItem(key);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setter(Array.isArray(parsedData) ? parsedData : []); // Garantir que seja um array
      } catch (e) {
        console.error(`Erro ao carregar dados para ${key}:`, e);
        setter([]); // Inicializa com um array vazio em caso de erro
      }
    } else {
      setter([]); // Se não houver dados no localStorage, inicialize como array vazio
    }
  };

  // Salvar no localStorage sempre que o estado mudar
  useEffect(() => {
    localStorage.setItem('clientes', JSON.stringify(clientes));
  }, [clientes]);

  useEffect(() => {
    localStorage.setItem('modelosTexto', JSON.stringify(modelosTexto));
  }, [modelosTexto]);

  useEffect(() => {
    localStorage.setItem('formasPagamento', JSON.stringify(formasPagamento));
  }, [formasPagamento]);

  useEffect(() => {
    localStorage.setItem('prazosValidade', JSON.stringify(prazosValidade));
  }, [prazosValidade]);

  useEffect(() => {
    localStorage.setItem('itensDisponiveis', JSON.stringify(itensDisponiveis));
  }, [itensDisponiveis]);

  useEffect(() => {
    localStorage.setItem('papeisTimbrados', JSON.stringify(papeisTimbrados));
  }, [papeisTimbrados]);

  useEffect(() => {
    localStorage.setItem('introducoes', JSON.stringify(introducoes));  // Salvar introduções
  }, [introducoes]);

  return (
    <ConfigContext.Provider value={{
      clientes, setClientes,
      modelosTexto, setModelosTexto,
      formasPagamento, setFormasPagamento,
      prazosValidade, setPrazosValidade,
      itensDisponiveis, setItensDisponiveis,
      papeisTimbrados, setPapeisTimbrados,
      introducoes, setIntroducoes
    }}>
      {children}
    </ConfigContext.Provider>
  );
};
