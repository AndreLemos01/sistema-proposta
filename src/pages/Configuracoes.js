import React, { useState, useContext } from "react";
import { ConfigContext } from "../context/ConfigContext";
import { FaEdit, FaFileAlt, FaCreditCard, FaClock, FaFileSignature, FaListAlt } from "react-icons/fa"; // Importando ícones
import Introducao from "../components/configuracoes/Introducao";
import ModeloTexto from "../components/configuracoes/ModeloTexto";
import FormaPagamento from "../components/configuracoes/FormaPagamento";
import PrazoValidade from "../components/configuracoes/PrazoValidade";
import PapelTimbrado from "../components/configuracoes/PapelTimbrado";
import ItensDaProposta from "../components/configuracoes/ItensDaProposta";
import "./Configuracoes.css";  // Esse caminho funciona se o arquivo CSS estiver na mesma pasta


const Configuracoes = () => {
  const [abaAtiva, setAbaAtiva] = useState("introducao");
  const {
    modelosTexto,
    setModelosTexto,
    formasPagamento,
    setFormasPagamento,
    prazosValidade,
    setPrazosValidade,
    introducoes,
    setIntroducoes,
    papeisTimbrados,
    setPapeisTimbrados
  } = useContext(ConfigContext);

  const renderAba = () => {
    switch (abaAtiva) {
      case "introducao":
        return <Introducao introducoes={introducoes} setIntroducoes={setIntroducoes} />;
      case "modeloTexto":
        return <ModeloTexto modelosTexto={modelosTexto} setModelosTexto={setModelosTexto} />;
      case "formaPagamento":
        return <FormaPagamento formasPagamento={formasPagamento} setFormasPagamento={setFormasPagamento} />;
      case "prazoValidade":
        return <PrazoValidade prazosValidade={prazosValidade} setPrazosValidade={setPrazosValidade} />;
      case "papelTimbrado":
        return <PapelTimbrado papeisTimbrados={papeisTimbrados} setPapeisTimbrados={setPapeisTimbrados} />;
      case "itensDaProposta":
        return <ItensDaProposta />;
      default:
        return <Introducao introducoes={introducoes} setIntroducoes={setIntroducoes} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Configurações da Proposta</h2>

      {/* Abas com ícones */}
      <div className="tabs mb-6 flex justify-between">
        <button
          className={`tab-button ${abaAtiva === "introducao" ? "active" : ""}`}
          onClick={() => setAbaAtiva("introducao")}
        >
          <FaEdit className="mr-2" />
          Introdução
        </button>
        <button
          className={`tab-button ${abaAtiva === "modeloTexto" ? "active" : ""}`}
          onClick={() => setAbaAtiva("modeloTexto")}
        >
          <FaFileAlt className="mr-2" />
          Modelo de Texto
        </button>
        <button
          className={`tab-button ${abaAtiva === "formaPagamento" ? "active" : ""}`}
          onClick={() => setAbaAtiva("formaPagamento")}
        >
          <FaCreditCard className="mr-2" />
          Forma de Pagamento
        </button>
        <button
          className={`tab-button ${abaAtiva === "prazoValidade" ? "active" : ""}`}
          onClick={() => setAbaAtiva("prazoValidade")}
        >
          <FaClock className="mr-2" />
          Validade
        </button>
        <button
          className={`tab-button ${abaAtiva === "papelTimbrado" ? "active" : ""}`}
          onClick={() => setAbaAtiva("papelTimbrado")}
        >
          <FaFileSignature className="mr-2" />
          Papel Timbrado
        </button>
        <button
          className={`tab-button ${abaAtiva === "itensDaProposta" ? "active" : ""}`}
          onClick={() => setAbaAtiva("itensDaProposta")}
        >
          <FaListAlt className="mr-2" />
          Itens da Proposta
        </button>
      </div>

      {/* Renderiza a aba ativa */}
      {renderAba()}
    </div>
  );
};

export default Configuracoes;
