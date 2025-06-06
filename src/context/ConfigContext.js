import React, { createContext, useState, useEffect } from "react";

export const ConfigContext = createContext();

const FORMAS_PAGAMENTO_PADRAO = [
  { id: "1", nome: "Dinheiro", iconeId: "dinheiro" },
  { id: "2", nome: "Crédito", iconeId: "credito" },
  { id: "3", nome: "Débito", iconeId: "debito" },
  { id: "4", nome: "Boleto", iconeId: "pix" },
  { id: "5", nome: "Pix", iconeId: "pix" },
];

const MODELO_INTRODUCAO_PADRAO = {
  id: "padrao",
  texto: "Prezados, \n\nEstamos enviando a proposta conforme solicitado. Fique à vontade para analisar e entrar em contato para quaisquer dúvidas.",
};

const MODELO_TEXTO_PADRAO = {
  id: "padrao",
  texto: "Este é um modelo de proposta. Insira aqui os detalhes da proposta, condições, e outros pontos importantes.",
};

export const ConfigProvider = ({ children }) => {

  const [formasPagamento, setFormasPagamento] = useState(FORMAS_PAGAMENTO_PADRAO);


  const [modelosTexto, setModelosTexto] = useState([MODELO_TEXTO_PADRAO]);
  const [introducoes, setIntroducoes] = useState([MODELO_INTRODUCAO_PADRAO]);

  const [clientes, setClientes] = useState([]);
  

  const [prazosValidade, setPrazosValidade] = useState(["7 Dias", "15 Dias", "30 Dias"]);

  // Itens Disponíveis: Similarmente, podem ser hardcoded.
  const [itensDisponiveis, setItensDisponiveis] = useState([
    { titulo: "Serviço Básico", valor: 100 },
    { titulo: "Consultoria Premium", valor: 500 },
    { titulo: "Manutenção Anual", valor: 1200 },
  ]);

  // Papel Timbrado: Pode ser uma constante ou removido se não for essencial.
  const [papeisTimbrados, setPapeisTimbrados] = useState(["Padrão Empresa", "Timbrado Cliente"]);

  return (
    <ConfigContext.Provider
      value={{
        formasPagamento,
        setFormasPagamento,
        modelosTexto,
        setModelosTexto,
        introducoes,
        setIntroducoes,
        clientes, // Apenas para compatibilidade, o gerenciamento de clientes será em Clientes.js
        setClientes, // Apenas para compatibilidade
        prazosValidade,
        setPrazosValidade,
        itensDisponiveis,
        setItensDisponiveis,
        papeisTimbrados,
        setPapeisTimbrados,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};