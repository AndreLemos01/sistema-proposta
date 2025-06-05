import React, { useState, useContext } from "react";
import { FaCog, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ConfigContext } from "../context/ConfigContext";
import styles from "./AdicionarProposta.module.css";

function htmlToText(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

const AdicionarProposta = () => {
  const [tipo, setTipo] = useState("");
  const [cliente, setCliente] = useState("");
  const [modeloTexto, setModeloTexto] = useState("");
  const [validoPor, setValidoPor] = useState("");
  const [condicoesPagamento, setCondicoesPagamento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [itensSelecionados, setItensSelecionados] = useState([]);
  const [introducao, setIntroducao] = useState("");
  const [textoIntroducaoSelecionado, setTextoIntroducaoSelecionado] = useState("");
  const [textoModeloSelecionado, setTextoModeloSelecionado] = useState("");
  const [searchCliente, setSearchCliente] = useState("");
  const [clientesEncontrados, setClientesEncontrados] = useState([]);

  const navigate = useNavigate();

  const irParaConfiguracoes = () => navigate("/configuracoes");
  const irParaCadastroCliente = () => navigate("/clientes/novo-cliente");

  const {
    clientes = [],
    modelosTexto = [],
    formasPagamento = [],
    prazosValidade = [],
    itensDisponiveis = [],
    introducoes = [],
  } = useContext(ConfigContext);

  const handlePesquisarCliente = (e) => {
    const val = e.target.value;
    setSearchCliente(val);

    const valLower = val.toLowerCase();
    if (val.trim().length > 0) {
      const filtered = clientes.filter((c) =>
        c.nome.toLowerCase().includes(valLower)
      );
      setClientesEncontrados(filtered);
    } else {
      setClientesEncontrados([]);
    }
  };

  const selecionarCliente = (nome) => {
    setCliente(nome);
    setSearchCliente(nome);
    setClientesEncontrados([]);
  };

  const handleAddItem = (titulo) => {
    if (!titulo || itensSelecionados.some((item) => item.titulo === titulo)) return;
    const itemBase = itensDisponiveis.find((item) => item.titulo === titulo);
    const novoItem = {
      titulo,
      quantidade: 1,
      valor: itemBase ? itemBase.valor : 0,
    };
    setItensSelecionados([...itensSelecionados, novoItem]);
  };

  const handleRemoveItem = (index) => {
    const novos = [...itensSelecionados];
    novos.splice(index, 1);
    setItensSelecionados(novos);
  };

  const handleAlterarItem = (index, field, value) => {
    const novos = [...itensSelecionados];
    if (field === "quantidade" || field === "valor") {
      value = Number(value);
      if (isNaN(value) || value < 0) value = 0;
    }
    novos[index][field] = value;
    setItensSelecionados(novos);
  };

  const handleSelecionarIntroducao = (e) => {
    const id = e.target.value;
    const selecionadoObj = introducoes.find((item) => (item.id ? item.id === id : item === id));
    if (selecionadoObj) {
      setIntroducao(id);
      setTextoIntroducaoSelecionado(typeof selecionadoObj === "string" ? selecionadoObj : selecionadoObj.texto);
    } else {
      setIntroducao("");
      setTextoIntroducaoSelecionado("");
    }
  };

  const handleSelecionarModeloTexto = (e) => {
    const id = e.target.value;
    const selecionadoObj = modelosTexto.find((item) => (item.id ? item.id === id : item === id));
    if (selecionadoObj) {
      setModeloTexto(id);
      setTextoModeloSelecionado(typeof selecionadoObj === "string" ? selecionadoObj : selecionadoObj.texto);
    } else {
      setModeloTexto("");
      setTextoModeloSelecionado("");
    }
  };

  const getFormaPagamentoNome = (idOrNome) => {
    const obj = formasPagamento.find((f) => f.id === idOrNome);
    return obj ? obj.nome : idOrNome;
  };

  const handleBaixarProposta = () => {
    if (!cliente) {
      toast.error("Selecione um cliente para baixar a proposta");
      return;
    }
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.text(`Proposta para ${cliente}`, 20, 20);
    doc.text(`Tipo: ${tipo}`, 20, 30);
    doc.text(`Modelo de Texto: ${textoModeloSelecionado.replace(/<[^>]+>/g, "")}`, 20, 40);
    doc.text(`Validade: ${validoPor}`, 20, 50);
    doc.text(`Condições de Pagamento: ${getFormaPagamentoNome(condicoesPagamento)}`, 20, 60);
    doc.text(`Descrição: ${descricao}`, 20, 70);
    doc.text("Itens da Proposta:", 20, 90);
    itensSelecionados.forEach((item, i) => {
      doc.text(`${i + 1}. ${item.titulo} - Quantidade: ${item.quantidade}, Valor: R$ ${item.valor.toFixed(2)}`, 20, 100 + i * 10);
    });
    doc.save(`Proposta_${cliente}.pdf`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tipo || !cliente || !modeloTexto) {
      toast.error("Preencha todos os campos obrigatórios!");
      return;
    }
    toast.success("Proposta salva com sucesso! (simulação)");
    navigate("/proposta", {
      state: {
        tipo,
        cliente,
        modeloTexto: textoModeloSelecionado,
        validoPor,
        condicoesPagamento: getFormaPagamentoNome(condicoesPagamento),
        descricao,
        itensSelecionados,
        introducao: textoIntroducaoSelecionado,
      },
    });
  };

  return (
    <div className={styles["adicionar-proposta"]}>
      <div className={styles["top-bar"]}>
        <h2>Adicionar Nova Proposta</h2>
        <FaCog className={styles["config-icon"]} onClick={irParaConfiguracoes} style={{ cursor: "pointer" }} />
      </div>

      <form onSubmit={handleSubmit} className={styles["form-proposta"]}>
        <section className={styles["form-section"]}>
          <label>Tipo *</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
            <option value="">Selecione</option>
            <option value="contrato">Contrato</option>
            <option value="avulso">Avulso</option>
            <option value="ambos">Ambos</option>
          </select>
        </section>

        <section className={styles["form-section"]} style={{ position: "relative" }}>
          <label>Cliente *</label>
          <input
            type="text"
            value={searchCliente}
            onChange={handlePesquisarCliente}
            placeholder="Digite o nome do cliente"
            autoComplete="off"
          />
          {searchCliente && clientesEncontrados.length > 0 && (
            <div className={styles["cliente-dropdown"]}>
              {clientesEncontrados.map((c, idx) => (
                <div
                  key={idx}
                  className={styles["cliente-option"]}
                  onClick={() => selecionarCliente(c.nome)}
                >
                  {c.nome} — {c.cpfCnpj}
                </div>
              ))}
            </div>
          )}
          {searchCliente.length >= 3 && clientesEncontrados.length === 0 && (
            <div
              className={styles["cliente-cadastrar"]}
              onClick={irParaCadastroCliente}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter") irParaCadastroCliente();
              }}
            >
              + Cadastrar novo cliente: "{searchCliente}"
            </div>
          )}
        </section>

        <section className={styles["form-section"]}>
          <label>Introdução</label>
          <select value={introducao} onChange={handleSelecionarIntroducao}>
            <option value="">Selecione a introdução</option>
            {introducoes.map((item, idx) => (
              <option key={idx} value={item.id || item}>{htmlToText(item.texto || item)}</option>
            ))}
          </select>
        </section>

        <section className={styles["form-section"]}>
          <ReactQuill
            value={textoIntroducaoSelecionado}
            onChange={setTextoIntroducaoSelecionado}
            placeholder="Edite a introdução aqui..."
            theme="snow"
          />
        </section>

        <section className={styles["form-section"]}>
          <label>Itens da Proposta</label>
          <select
            defaultValue=""
            onChange={(e) => {
              handleAddItem(e.target.value);
              e.target.value = "";
            }}
          >
            <option value="" disabled>Selecione um item</option>
            {itensDisponiveis.map((item, idx) => (
              <option key={idx} value={item.titulo}>{item.titulo}</option>
            ))}
          </select>

          <ul className={styles["selected-items"]}>
            {itensSelecionados.map((item, idx) => (
              <li key={idx} className={styles["item-proposta"]}>
                <strong>{item.titulo}</strong>
                <div>
                  <label>
                    Quantidade:
                    <input
                      type="number"
                      min="0"
                      value={item.quantidade}
                      onChange={(e) => handleAlterarItem(idx, "quantidade", e.target.value)}
                    />
                  </label>
                  <label>
                    Valor:
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.valor}
                      onChange={(e) => handleAlterarItem(idx, "valor", e.target.value)}
                    />
                  </label>
                  <button type="button" onClick={() => handleRemoveItem(idx)}>Remover</button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles["form-section"]}>
          <label>Modelo de Texto</label>
          <select value={modeloTexto} onChange={handleSelecionarModeloTexto}>
            <option value="">Selecione</option>
            {modelosTexto.map((item, idx) => (
              <option key={idx} value={item.id || item}>{htmlToText(item.texto || item)}</option>
            ))}
          </select>
        </section>

        <section className={styles["form-section"]}>
          <ReactQuill
            value={textoModeloSelecionado}
            onChange={setTextoModeloSelecionado}
            placeholder="Edite o modelo de texto aqui..."
            theme="snow"
          />
        </section>

        <section className={styles["form-section"]}>
          <label>Validade da Proposta</label>
          <select value={validoPor} onChange={(e) => setValidoPor(e.target.value)}>
            <option value="">Selecione</option>
            {prazosValidade.map((p, idx) => (
              <option key={idx} value={p}>{p}</option>
            ))}
          </select>
        </section>

        <section className={styles["form-section"]}>
          <label>Forma de Pagamento</label>
          <select value={condicoesPagamento} onChange={(e) => setCondicoesPagamento(e.target.value)}>
            <option value="">Selecione</option>
            {formasPagamento.map((f) => (
              <option key={f.id} value={f.id}>{f.nome}</option>
            ))}
          </select>
        </section>

        <section className={styles["form-section"]}>
          <label>Observações da Proposta</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Escreva observações adicionais da proposta."
          />
        </section>

        <div className={styles["button-group"]}>
          <button type="submit" className={styles["btn-submit"]}>Salvar Proposta</button>
          <button type="button" onClick={() => alert("Proposta enviada!")} className={styles["btn-submit"]}>Enviar Proposta</button>
          <button type="button" onClick={() => alert("Visualizando proposta!")} className={styles["btn-submit"]}>Visualizar Proposta</button>
          <button type="button" onClick={handleBaixarProposta} className={styles["btn-submit"]}>
            <FaDownload /> Baixar Proposta
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdicionarProposta;
