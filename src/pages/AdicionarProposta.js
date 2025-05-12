import React, { useState, useContext } from "react";
import { FaCog, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";
import { ConfigContext } from "../context/ConfigContext";
import "./AdicionarProposta.css";

const AdicionarProposta = () => {
  const [tipo, setTipo] = useState("");
  const [cliente, setCliente] = useState("");  // Cliente selecionado
  const [modeloTexto, setModeloTexto] = useState("");
  const [validoPor, setValidoPor] = useState("");
  const [condicoesPagamento, setCondicoesPagamento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [itensSelecionados, setItensSelecionados] = useState([]);
  const [introducao, setIntroducao] = useState("");
  const [textoIntroducaoSelecionado, setTextoIntroducaoSelecionado] = useState("");  // Armazena o texto da introdução
  const [textoModeloSelecionado, setTextoModeloSelecionado] = useState("");
  const [quantidadeItem, setQuantidadeItem] = useState("");
  const [valorItem, setValorItem] = useState("");
  const [searchCliente, setSearchCliente] = useState(""); // Estado para pesquisa de cliente
  const [clientesEncontrados, setClientesEncontrados] = useState([]); // Estado para armazenar os clientes filtrados

  const navigate = useNavigate();
  const irParaConfiguracoes = () => navigate("/configuracoes");

  const { clientes = [], modelosTexto = [], formasPagamento = [], prazosValidade = [], itensDisponiveis = [], introducoes = [] } = useContext(ConfigContext);

  // Função para buscar clientes com base no texto da pesquisa
  const handlePesquisarCliente = (e) => {
    setSearchCliente(e.target.value);

    // Se o usuário começar a digitar, mostramos as opções de clientes
    if (e.target.value.trim()) {
      const filteredClientes = clientes.filter(cliente =>
        cliente.nome.toLowerCase().startsWith(e.target.value.toLowerCase()) // Busca por clientes que começam com o que é digitado
      );
      setClientesEncontrados(filteredClientes);
    } else {
      setClientesEncontrados([]); // Limpa a lista de clientes encontrados quando não há pesquisa
    }
  };

  const handleAddItem = (titulo) => {
    if (!titulo || itensSelecionados.includes(titulo)) return;
    setItensSelecionados([...itensSelecionados, titulo]);
  };

  const handleRemoveItem = (index) => {
    const novos = [...itensSelecionados];
    novos.splice(index, 1);
    setItensSelecionados(novos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tipo || !cliente || !modeloTexto) {
      toast.error("Preencha todos os campos obrigatórios!");
      return;
    }

    toast.success("Proposta salva com sucesso! (simulação)");
  };

  // Funções para seleção de Introdução e Modelo de Texto
  const handleSelecionarIntroducao = (texto) => {
    setIntroducao(texto);  // Carrega a introdução selecionada
    setTextoIntroducaoSelecionado(texto);  // Preenche a caixa de texto com o conteúdo da introdução
  };

  const handleSelecionarModeloTexto = (texto) => {
    setModeloTexto(texto);  // Carrega o modelo de texto selecionado
    setTextoModeloSelecionado(texto);  // Preenche a caixa de texto com o conteúdo do modelo de texto
  };

  // Função para adicionar item e valor na proposta
  const handleAdicionarItemProposta = () => {
    if (!quantidadeItem || !valorItem) return;
    const novoItem = { quantidade: quantidadeItem, valor: valorItem };
    setItensSelecionados([...itensSelecionados, novoItem]);
    setQuantidadeItem("");
    setValorItem("");
  };

  // Função para gerar o PDF da proposta
  const handleBaixarProposta = () => {
    const doc = new jsPDF();

    // Adicionando título e detalhes da proposta
    doc.setFont("helvetica", "normal");
    doc.text(`Proposta para ${cliente}`, 20, 20);
    doc.text(`Tipo: ${tipo}`, 20, 30);
    doc.text(`Modelo de Texto: ${modeloTexto}`, 20, 40);
    doc.text(`Validade: ${validoPor}`, 20, 50);
    doc.text(`Condições de Pagamento: ${condicoesPagamento}`, 20, 60);
    doc.text(`Descrição: ${descricao}`, 20, 70);

    // Adicionando os itens da proposta
    doc.text("Itens da Proposta:", 20, 90);
    itensSelecionados.forEach((item, index) => {
      doc.text(`${index + 1}. Quantidade: ${item.quantidade}, Valor: ${item.valor}`, 20, 100 + index * 10);
    });

    // Salvando o PDF com o nome da proposta
    doc.save(`Proposta_${cliente}.pdf`);
  };

  // Funções de Enviar e Visualizar Proposta
  const handleEnviarProposta = () => {
    alert("Proposta enviada!");
  };

  const handleVisualizarProposta = () => {
    alert("Visualizando proposta!");
  };

  return (
    <div className="adicionar-proposta">
      <div className="top-bar">
        <h2>Adicionar Nova Proposta</h2>
        <FaCog className="config-icon" onClick={irParaConfiguracoes} />
      </div>

      <form onSubmit={handleSubmit} className="form-proposta">
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
          <label>Cliente *</label>
          <input
            type="text"
            value={searchCliente}
            onChange={handlePesquisarCliente}
            placeholder="Pesquisar cliente"
          />
          {/* Exibe o dropdown de clientes encontrados */}
          {clientesEncontrados.length > 0 && (
            <div className="cliente-dropdown">
              {clientesEncontrados.map((cliente, idx) => (
                <div
                  key={idx}
                  className="cliente-option"
                  onClick={() => {
                    setCliente(cliente.nome);
                    setSearchCliente(cliente.nome); // Preenche o campo com o cliente selecionado
                    setClientesEncontrados([]); // Fecha o dropdown
                  }}
                >
                  {cliente.nome}
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="form-section">
          <label>Introdução</label>
          <select value={introducao} onChange={(e) => handleSelecionarIntroducao(e.target.value)}>
            <option value="">Selecione a introdução</option>
            {introducoes.map((item, idx) => (
              <option key={idx} value={item}>{item}</option>
            ))}
          </select>
        </section>

        <section className="form-section">
          <textarea
            value={textoIntroducaoSelecionado}
            onChange={(e) => setTextoIntroducaoSelecionado(e.target.value)}
            placeholder="Edite a introdução aqui..."
            rows="5"
          />
        </section>

        <section className="form-section">
          <label>Itens da Proposta</label>
          <select defaultValue="" onChange={(e) => handleAddItem(e.target.value)}>
            <option value="" disabled>Selecione um item</option>
            {itensDisponiveis.map((item, idx) => (
              <option key={idx} value={item.titulo}>{item.titulo}</option>
            ))}
          </select>

          <ul className="selected-items">
            {itensSelecionados.map((item, idx) => (
              <li key={idx}>
                Quantidade: {item.quantidade}, Valor: {item.valor} {/* Renderizando as propriedades corretamente */}
                <button type="button" onClick={() => handleRemoveItem(idx)}>Remover</button>
                <div>
                  <input
                    type="number"
                    value={quantidadeItem}
                    onChange={(e) => setQuantidadeItem(e.target.value)}
                    placeholder="Quantidade"
                  />
                  <input
                    type="number"
                    value={valorItem}
                    onChange={(e) => setValorItem(e.target.value)}
                    placeholder="Valor"
                  />
                  <button type="button" onClick={handleAdicionarItemProposta}>Adicionar</button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="form-section">
          <label>Modelo de Texto</label>
          <select value={modeloTexto} onChange={(e) => handleSelecionarModeloTexto(e.target.value)}>
            <option value="">Selecione</option>
            {modelosTexto.map((m, i) => (
              <option key={i} value={m}>{m}</option>
            ))}
          </select>
        </section>

        <section className="form-section">
          <textarea
            value={textoModeloSelecionado}
            onChange={(e) => setTextoModeloSelecionado(e.target.value)}
            placeholder="Edite o modelo de texto aqui..."
            rows="5"
          />
        </section>

        <section className="form-section">
          <label>Validade da Proposta</label>
          <select value={validoPor} onChange={(e) => setValidoPor(e.target.value)}>
            <option value="">Selecione</option>
            {prazosValidade.map((p, i) => (
              <option key={i} value={p}>{p}</option>
            ))}
          </select>
        </section>

        <section className="form-section">
          <label>Forma de Pagamento</label>
          <select value={condicoesPagamento} onChange={(e) => setCondicoesPagamento(e.target.value)}>
            <option value="">Selecione</option>
            {formasPagamento.map((f, i) => (
              <option key={i} value={f}>{f}</option>
            ))}
          </select>
        </section>

        <section className="form-section">
          <label>Observações da Proposta</label>
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Escreva observações adicionais da proposta." />
        </section>

        <div className="button-group">
          <button type="submit" className="btn-submit">Salvar Proposta</button>
          <button type="button" onClick={handleEnviarProposta} className="btn-submit">Enviar Proposta</button>
          <button type="button" onClick={handleVisualizarProposta} className="btn-submit">Visualizar Proposta</button>
          {/* Ícone de download */} 
          <button type="button" onClick={handleBaixarProposta} className="btn-submit">
            <FaDownload /> Baixar Proposta
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdicionarProposta;
