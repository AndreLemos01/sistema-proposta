import React, { useState, useContext } from "react";
import { ConfigContext } from "../context/ConfigContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Configuracoes = () => {
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

  const [novoModeloTexto, setNovoModeloTexto] = useState("");
  const [novaFormaPagamento, setNovaFormaPagamento] = useState("");
  const [novoPrazo, setNovoPrazo] = useState("");
  const [novaIntroducao, setNovaIntroducao] = useState("");
  const [novoPapelTimbrado, setNovoPapelTimbrado] = useState("");

  // Funções para adicionar e remover itens
  const handleAdicionarIntroducao = () => {
    if (!novaIntroducao.trim()) return;
    setIntroducoes([...introducoes, novaIntroducao]);
    setNovaIntroducao("");
  };

  const handleAdicionarModeloTexto = () => {
    if (!novoModeloTexto.trim()) return;
    setModelosTexto([...modelosTexto, novoModeloTexto]);
    setNovoModeloTexto("");
  };

  const handleAdicionarFormaPagamento = () => {
    if (!novaFormaPagamento.trim()) return;
    setFormasPagamento([...formasPagamento, novaFormaPagamento]);
    setNovaFormaPagamento("");
  };

  const handleAdicionarPrazo = () => {
    if (!novoPrazo.trim()) return;
    setPrazosValidade([...prazosValidade, novoPrazo]);
    setNovoPrazo("");
  };

  const handleAdicionarPapelTimbrado = () => {
    if (!novoPapelTimbrado.trim()) return;
    setPapeisTimbrados([...papeisTimbrados, novoPapelTimbrado]);
    setNovoPapelTimbrado("");
  };

  // Função para remover itens
  const handleRemoverItem = (item, setItemFunc, list) => {
    const updatedList = list.filter((i) => i !== item);
    setItemFunc(updatedList);
  };

  return (
    <div>
      <h2>Configurações da Proposta</h2>

      {/* Introdução */}
      <div>
        <h3>Introdução</h3>
        <Input
          value={novaIntroducao}
          onChange={(e) => setNovaIntroducao(e.target.value)}
          placeholder="Adicionar nova introdução"
        />
        <Button onClick={handleAdicionarIntroducao}>Adicionar</Button>
        <ul>
          {introducoes.map((item, index) => (
            <li key={index}>
              {item}{" "}
              <Button onClick={() => handleRemoverItem(item, setIntroducoes, introducoes)}>Remover</Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modelo de Texto */}
      <div>
        <h3>Modelo de Texto</h3>
        <Input
          value={novoModeloTexto}
          onChange={(e) => setNovoModeloTexto(e.target.value)}
          placeholder="Adicionar novo modelo de texto"
        />
        <Button onClick={handleAdicionarModeloTexto}>Adicionar</Button>
        <ul>
          {modelosTexto.map((item, index) => (
            <li key={index}>
              {item}{" "}
              <Button onClick={() => handleRemoverItem(item, setModelosTexto, modelosTexto)}>Remover</Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Forma de Pagamento */}
      <div>
        <h3>Forma de Pagamento</h3>
        <Input
          value={novaFormaPagamento}
          onChange={(e) => setNovaFormaPagamento(e.target.value)}
          placeholder="Adicionar nova forma de pagamento"
        />
        <Button onClick={handleAdicionarFormaPagamento}>Adicionar</Button>
        <ul>
          {formasPagamento.map((item, index) => (
            <li key={index}>
              {item}{" "}
              <Button onClick={() => handleRemoverItem(item, setFormasPagamento, formasPagamento)}>Remover</Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Validade da Proposta */}
      <div>
        <h3>Validade da Proposta</h3>
        <Input
          value={novoPrazo}
          onChange={(e) => setNovoPrazo(e.target.value)}
          placeholder="Adicionar novo prazo de validade"
        />
        <Button onClick={handleAdicionarPrazo}>Adicionar</Button>
        <ul>
          {prazosValidade.map((item, index) => (
            <li key={index}>
              {item}{" "}
              <Button onClick={() => handleRemoverItem(item, setPrazosValidade, prazosValidade)}>Remover</Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modelos de Papel Timbrado */}
      <div>
        <h3>Modelos de Papel Timbrado</h3>
        <Input
          value={novoPapelTimbrado}
          onChange={(e) => setNovoPapelTimbrado(e.target.value)}
          placeholder="Adicionar novo modelo de papel timbrado"
        />
        <Button onClick={handleAdicionarPapelTimbrado}>Adicionar</Button>
        <ul>
          {papeisTimbrados.map((item, index) => (
            <li key={index}>
              {item}{" "}
              <Button onClick={() => handleRemoverItem(item, setPapeisTimbrados, papeisTimbrados)}>Remover</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Configuracoes;
