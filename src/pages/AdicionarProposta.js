import React, { useState, useContext } from "react";
import { PropostasContext } from "../context/PropostasContext";
import { FaCog } from "react-icons/fa";
import "./AdicionarProposta.css";
import { useNavigate } from "react-router-dom";


const modelosTextoDisponiveis = {
  padrão: "Prezado cliente, segue proposta conforme solicitado...",
  premium: "Esta proposta segue os mais altos padrões de qualidade...",
};

const itensDisponiveis = ["Controle de pragas", "Limpeza de reservatórios", "Sanitização"];

const tiposDePragas = [
  "Baratas",
  "Ratos",
  "Formigas",
  "Aranhas",
  "Cupins",
  "Mosquitos",
];

const AdicionarProposta = () => {
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState("");
  const [cliente, setCliente] = useState("");
  const [descricao, setDescricao] = useState("");
  const [validoPor, setValidoPor] = useState("7 dias");
  const [modeloSelecionado, setModeloSelecionado] = useState("padrão");
  const [modeloTexto, setModeloTexto] = useState(modelosTextoDisponiveis["padrão"]);
  const [papelTimbrado, setPapelTimbrado] = useState(null);
  const [condicoesPagamento, setCondicoesPagamento] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [itensSelecionados, setItensSelecionados] = useState([]);
  const [pragasSelecionadas, setPragasSelecionadas] = useState([]);
  const [reservatoriosSelecionados, setReservatoriosSelecionados] = useState([]);
  const { propostas, setPropostas } = useContext(PropostasContext);

  const formatarValor = () => {
    const numero = parseFloat(valor.replace(/[^\d]/g, "")) / 100;
    if (!isNaN(numero)) {
      setValor(numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }));
    }
  };

  const handleAddItem = (itemNome) => {
    if (itemNome === "Controle de pragas") {
      setPragasSelecionadas([...pragasSelecionadas, { pragas: [], valor: "", quantidade: 1, agrupado: false }]);
    } else if (itemNome === "Limpeza de reservatórios") {
      setReservatoriosSelecionados([...reservatoriosSelecionados, { tipo: "caixa d'água", litragem: "", valor: "" }]);
    } else {
      setItensSelecionados([...itensSelecionados, { nome: itemNome, quantidade: 1, preco: 0 }]);
    }
  };

  const handlePragaChange = (index, praga) => {
    const novas = [...pragasSelecionadas];
    const pragas = novas[index].pragas.includes(praga)
      ? novas[index].pragas.filter((p) => p !== praga)
      : [...novas[index].pragas, praga];
    novas[index].pragas = pragas;
    setPragasSelecionadas(novas);
  };

  const handlePragaValorChange = (index, field, value) => {
    const novas = [...pragasSelecionadas];
    novas[index][field] = value;
    setPragasSelecionadas(novas);
  };

  const handleReservatorioChange = (index, field, value) => {
    const novos = [...reservatoriosSelecionados];
    novos[index][field] = value;
    setReservatoriosSelecionados(novos);
  };

  const removerPraga = (index) => {
    const novas = [...pragasSelecionadas];
    novas.splice(index, 1);
    setPragasSelecionadas(novas);
  };

  const removerReservatorio = (index) => {
    const novos = [...reservatoriosSelecionados];
    novos.splice(index, 1);
    setReservatoriosSelecionados(novos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tipo || !valor || !cliente) {
      alert("Campos obrigatórios precisam ser preenchidos!");
      return;
    }

    const novaProposta = {
      id: Math.random().toString(36).substr(2, 9),
      tipo,
      valor,
      cliente,
      descricao,
      itens: [...itensSelecionados, ...pragasSelecionadas, ...reservatoriosSelecionados],
      modeloTexto,
      papelTimbrado,
      condicoesPagamento,
      validoPor,
      responsavel,
      status: "enviada",
    };

    setPropostas([...propostas, novaProposta]);
  };

  const navigate = useNavigate();

  const irParaConfiguracoes = () => {
  navigate("/configuracoes");
};


  return (
    <div className="adicionar-proposta">
      <div className="top-bar">
        <h2>Adicionar Nova Proposta</h2>
        <FaCog className="config-icon" onClick={irParaConfiguracoes} style={{ cursor: "pointer" }} />

      </div>
      <form onSubmit={handleSubmit} className="form-proposta">
        {/* Campos principais */}
        <section className="form-section">
          <label>Tipo *</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
            <option value="">Selecione</option>
            <option value="contrato">Contrato</option>
            <option value="avulso">Avulso</option>
            <option value="ambos">Ambos</option>
          </select>
        </section>

        <section className="form-section">
          <label>Valor Total *</label>
          <input
            type="text"
            value={valor}
            onBlur={formatarValor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="R$ 0,00"
            required
          />
        </section>

        <section className="form-section">
          <label>Cliente *</label>
          <input
            type="text"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            required
          />
        </section>

        <section className="form-section">
          <label>Responsável</label>
          <input
            type="text"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
          />
        </section>

        <section className="form-section">
          <label>Validade da Proposta</label>
          <select value={validoPor} onChange={(e) => setValidoPor(e.target.value)}>
            <option value="7 dias">7 dias</option>
            <option value="15 dias">15 dias</option>
            <option value="20 dias">20 dias</option>
            <option value="30 dias">30 dias</option>
          </select>
        </section>

        <section className="form-section">
          <label>Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Observações adicionais"
          />
        </section>

        <section className="form-section">
          <label>Itens da Proposta</label>
          <select onChange={(e) => handleAddItem(e.target.value)} defaultValue="">
            <option value="" disabled>Selecione um item</option>
            {itensDisponiveis.map((item, idx) => (
              <option key={idx} value={item}>{item}</option>
            ))}
          </select>

          {pragasSelecionadas.map((grupo, index) => (
            <div key={index} className="item">
              <strong>Controle de Pragas</strong>
              <div className="checkboxes">
                {tiposDePragas.map((praga, i) => (
                  <label key={i}>
                    <input
                      type="checkbox"
                      checked={grupo.pragas.includes(praga)}
                      onChange={() => handlePragaChange(index, praga)}
                    /> {praga}
                  </label>
                ))}
              </div>
              <input
                type="number"
                value={grupo.quantidade}
                onChange={(e) => handlePragaValorChange(index, "quantidade", e.target.value)}
                placeholder="Quantidade"
              />
              <input
                type="number"
                value={grupo.valor}
                onChange={(e) => handlePragaValorChange(index, "valor", e.target.value)}
                placeholder="Valor (R$)"
              />
              <button type="button" onClick={() => removerPraga(index)}>❌</button>
            </div>
          ))}

          {reservatoriosSelecionados.map((item, index) => (
            <div key={index} className="item">
              <strong>Limpeza de Reservatório</strong>
              <select value={item.tipo} onChange={(e) => handleReservatorioChange(index, "tipo", e.target.value)}>
                <option value="caixa d'água">Caixa d'água</option>
                <option value="cisterna">Cisterna</option>
              </select>
              <input
                type="number"
                value={item.litragem}
                onChange={(e) => handleReservatorioChange(index, "litragem", e.target.value)}
                placeholder="Litragem"
              />
              <input
                type="number"
                value={item.valor}
                onChange={(e) => handleReservatorioChange(index, "valor", e.target.value)}
                placeholder="Valor (R$)"
              />
              <button type="button" onClick={() => removerReservatorio(index)}>❌</button>
            </div>
          ))}
        </section>

        <section className="form-section">
          <label>Modelo de Texto</label>
          <select
            value={modeloSelecionado}
            onChange={(e) => {
              setModeloSelecionado(e.target.value);
              setModeloTexto(modelosTextoDisponiveis[e.target.value]);
            }}
          >
            {Object.keys(modelosTextoDisponiveis).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
          <textarea
            value={modeloTexto}
            onChange={(e) => setModeloTexto(e.target.value)}
            placeholder="Texto da proposta"
          />
        </section>

        <section className="form-section">
          <label>Condições de Pagamento</label>
          <select value={condicoesPagamento} onChange={(e) => setCondicoesPagamento(e.target.value)}>
            <option value="">Selecione</option>
            <option value="crédito">Crédito</option>
            <option value="débito">Débito</option>
            <option value="à vista">À vista</option>
            <option value="pix">Pix</option>
            <option value="boleto">Boleto</option>
          </select>
        </section>

        <section className="form-section">
  <label>Papel Timbrado</label>
  <select value={papelTimbrado || ""} onChange={(e) => setPapelTimbrado(e.target.value)}>
    <option value="">Selecione um modelo</option>
    <option value="modelo1">Modelo 1 - Clássico</option>
    <option value="modelo2">Modelo 2 - Moderno</option>
    <option value="modelo3">Modelo 3 - Luxo</option>
  </select>

      {papelTimbrado && (
        <div className="preview-timbrado">
          <p>Prévia:</p>
          <img
            src={`/imagens/timbrados/${papelTimbrado}.jpg`}
            alt="Prévia do papel timbrado"
            style={{ maxWidth: "300px", marginTop: "10px", border: "1px solid #ccc" }}
          />
        </div>
      )}
    </section>


        <div className="button-group">
          <button type="submit" className="btn-submit">Salvar</button>
          <button type="button" className="btn-email" onClick={() => alert('Função de envio por e-mail em construção')}>Enviar por E-mail</button>
        </div>
      </form>
    </div>
  );
};

export default AdicionarProposta;
