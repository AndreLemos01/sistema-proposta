import React, { useState, useContext, useEffect } from "react";
import { ConfigContext } from "../../context/ConfigContext";

const estilos = [
  { value: "simples", label: "Simples" },
  { value: "agrupado", label: "Agrupável por Tipo" },
  { value: "detalhado", label: "Com Detalhamento Técnico" },
];

export default function ItensDaProposta() {
  const { itensDisponiveis, setItensDisponiveis } = useContext(ConfigContext);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [estilo, setEstilo] = useState("simples");
  const [variavel, setVariavel] = useState("");
  const [variaveis, setVariaveis] = useState([]);
  const [itemEditando, setItemEditando] = useState(null);

  useEffect(() => {
    if (estilo !== itemEditando?.estilo) {
      setVariaveis([]);
      setTitulo("");
      setDescricao("");
      setItemEditando(null);
    }

    if (itemEditando) {
      setTitulo(itemEditando.titulo);
      setDescricao(itemEditando.descricao);
      setEstilo(itemEditando.estilo);
      setVariaveis(itemEditando.variaveis || []);
    }
  }, [estilo, itemEditando]);

  const handleAdicionarVariavel = () => {
    if (!variavel.trim()) return;
    setVariaveis([...variaveis, variavel]);
    setVariavel("");
  };

  const handleRemoverVariavel = (index) => {
    setVariaveis(variaveis.filter((_, i) => i !== index));
  };

  const handleSalvarItem = () => {
    if (!titulo.trim()) {
      alert("O título é obrigatório.");
      return;
    }

    const novoItem = {
      id: itemEditando ? itemEditando.id : Date.now(),
      titulo,
      descricao,
      estilo,
      variaveis: estilo !== "simples" ? variaveis : [],
    };

    if (itemEditando) {
      const atualizados = itensDisponiveis.map((item) =>
        item.id === itemEditando.id ? novoItem : item
      );
      setItensDisponiveis(atualizados);
    } else {
      setItensDisponiveis([...itensDisponiveis, novoItem]);
    }

    setItemEditando(null);
    setTitulo("");
    setDescricao("");
    setVariaveis([]);
  };

  const handleEditarItem = (item) => {
    setItemEditando(item);
  };

  const handleDeletarItem = (id) => {
    const atualizados = itensDisponiveis.filter(item => item.id !== id);
    setItensDisponiveis(atualizados);
  };

  return (
    <div className="itens-container">
      <div className="form-container">
        <h2>{itemEditando ? "Editar Item" : "Adicionar Novo Item"}</h2>

        <div className="form-card">
          <div className="form-card-content">
            <div className="input-group">
              <label>Tipo do Item</label>
              <select value={estilo} onChange={(e) => setEstilo(e.target.value)}>
                {estilos.map((opcao) => (
                  <option key={opcao.value} value={opcao.value}>
                    {opcao.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Título</label>
              <input 
                value={titulo} 
                onChange={(e) => setTitulo(e.target.value)} 
                placeholder="Nome do item" 
              />
            </div>

            <div className="input-group">
              <label>Descrição (opcional)</label>
              <input 
                value={descricao} 
                onChange={(e) => setDescricao(e.target.value)} 
                placeholder="Descrição do item" 
              />
            </div>

            {estilo !== "simples" && (
              <div className="variavel-container">
                <div className="input-group">
                  <input
                    value={variavel}
                    onChange={(e) => setVariavel(e.target.value)}
                    placeholder="Nova variável"
                  />
                  <button onClick={handleAdicionarVariavel}>Adicionar</button>
                </div>
                {variaveis.length > 0 && (
                  <div className="variaveis-list">
                    {variaveis.map((item, index) => (
                      <span key={index} className="variavel-item">
                        {item} <button onClick={() => handleRemoverVariavel(index)}>❌</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button onClick={handleSalvarItem}>
              {itemEditando ? "Atualizar Item" : "Salvar Item"}
            </button>
          </div>
        </div>
      </div>

      <div className="items-list">
        <h3>Itens Salvos</h3>
        <div className="cards-container">
          {itensDisponiveis.map((item) => (
            <div key={item.id} className="item-card">
              <div className="item-card-content">
                <h4>{item.titulo}</h4>
                <div className="card-actions">
                  <button onClick={() => handleEditarItem(item)} className="edit-button">Editar</button>
                  <button onClick={() => handleDeletarItem(item.id)} className="delete-button">Excluir</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
