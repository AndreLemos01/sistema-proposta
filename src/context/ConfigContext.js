import React, { createContext, useState, useEffect } from "react";

export const ConfigContext = createContext();

const FORMAS_PAGAMENTO_PADRAO = [
  { id: "1", nome: "Dinheiro", iconeId: "dinheiro" },
  { id: "2", nome: "Crédito", iconeId: "credito" },
  { id: "3", nome: "Débito", iconeId: "debito" },
  { id: "4", nome: "Boleto", iconeId: "boleto" },
  { id: "5", nome: "Pix", iconeId: "pix" },
];

export const ConfigProvider = ({ children }) => {
  const modeloIntroducaoPadrao =
    "Prezados, \n\nEstamos enviando a proposta conforme solicitado. Fique à vontade para analisar e entrar em contato para quaisquer dúvidas.";
  const modeloTextoPadrao =
    "Este é um modelo de proposta. Insira aqui os detalhes da proposta, condições, e outros pontos importantes.";

  const [clientes, setClientes] = useState([]);
  const [modelosTexto, setModelosTexto] = useState([modeloTextoPadrao]);
  const [formasPagamento, setFormasPagamento] = useState(FORMAS_PAGAMENTO_PADRAO);
  const [prazosValidade, setPrazosValidade] = useState([]);
  const [itensDisponiveis, setItensDisponiveis] = useState([]);
  const [papeisTimbrados, setPapeisTimbrados] = useState([]);
  const [introducoes, setIntroducoes] = useState([modeloIntroducaoPadrao]);

  // Função para carregar do localStorage (garantindo array)
  const loadFromLocalStorage = (key, setter, defaultValue) => {
    const savedData = localStorage.getItem(key);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setter(Array.isArray(parsedData) ? parsedData : defaultValue);
      } catch (e) {
        console.error(`Erro ao carregar ${key}:`, e);
        setter(defaultValue);
      }
    } else {
      setter(defaultValue);
    }
  };

  // Carregar dados uma vez no início
  useEffect(() => {
    loadFromLocalStorage("clientes", setClientes, []); // Carrega os clientes ou cria um array vazio
    loadFromLocalStorage("modelosTexto", setModelosTexto, [modeloTextoPadrao]);
    loadFromLocalStorage("formasPagamento", setFormasPagamento, FORMAS_PAGAMENTO_PADRAO);
    loadFromLocalStorage("prazosValidade", setPrazosValidade, []);
    loadFromLocalStorage("itensDisponiveis", setItensDisponiveis, []);
    loadFromLocalStorage("papeisTimbrados", setPapeisTimbrados, []);
    loadFromLocalStorage("introducoes", setIntroducoes, [modeloIntroducaoPadrao]);
  }, []);

  // Salvar no localStorage sempre que mudarem os dados
  useEffect(() => {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }, [clientes]);

  useEffect(() => {
    localStorage.setItem("modelosTexto", JSON.stringify(modelosTexto));
  }, [modelosTexto]);

  useEffect(() => {
    localStorage.setItem("formasPagamento", JSON.stringify(formasPagamento));
  }, [formasPagamento]);

  useEffect(() => {
    localStorage.setItem("prazosValidade", JSON.stringify(prazosValidade));
  }, [prazosValidade]);

  useEffect(() => {
    localStorage.setItem("itensDisponiveis", JSON.stringify(itensDisponiveis));
  }, [itensDisponiveis]);

  useEffect(() => {
    localStorage.setItem("papeisTimbrados", JSON.stringify(papeisTimbrados));
  }, [papeisTimbrados]);

  useEffect(() => {
    localStorage.setItem("introducoes", JSON.stringify(introducoes));
  }, [introducoes]);

  return (
    <ConfigContext.Provider
      value={{
        clientes,
        setClientes,
        modelosTexto,
        setModelosTexto,
        formasPagamento,
        setFormasPagamento,
        prazosValidade,
        setPrazosValidade,
        itensDisponiveis,
        setItensDisponiveis,
        papeisTimbrados,
        setPapeisTimbrados,
        introducoes,
        setIntroducoes,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
