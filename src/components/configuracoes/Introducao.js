import React, { useState, useEffect } from "react";
import { Button } from "../ui/button"; // Supondo que o Button seja um componente reutilizável
import ReactQuill from "react-quill"; // Importando o ReactQuill
import "react-quill/dist/quill.snow.css"; // Importando os estilos do ReactQuill
import "./Introducao.css"; // Importando o CSS

const MODELO_INTRODUCAO_PADRAO =
  "Prezados, \n\nEstamos enviando a proposta conforme solicitado. Fique à vontade para analisar e entrar em contato para quaisquer dúvidas.";

const Introducao = ({ introducoes, setIntroducoes }) => {
  const [novaIntroducao, setNovaIntroducao] = useState(""); // Campo de entrada para nova introdução
  const [selecionado, setSelecionado] = useState(""); // Estado para armazenar a introdução selecionada

  // Adicionando o texto padrão ao iniciar, se necessário
  useEffect(() => {
    if (!introducoes.includes(MODELO_INTRODUCAO_PADRAO)) {
      setIntroducoes((prev) => [MODELO_INTRODUCAO_PADRAO, ...prev]); // Adiciona o texto padrão apenas uma vez
    }
  }, [introducoes, setIntroducoes]);

  // Função para adicionar nova introdução
  const handleAdicionarIntroducao = () => {
    const texto = novaIntroducao.trim();
    if (!texto) return; // Evitar adicionar texto vazio
    setIntroducoes((prev) => [...prev, texto]); // Adiciona a nova introdução ao select
    setNovaIntroducao(""); // Limpa o campo após adicionar
  };

  // Função para editar a introdução selecionada
  const handleSelecaoIntroducao = (e) => {
    const selecionado = e.target.value;
    setSelecionado(selecionado); // Carrega a introdução selecionada no campo de edição
    setNovaIntroducao(selecionado); // Atualiza a caixa de texto com o valor da introdução selecionada
  };

  // Função para salvar as alterações na introdução
  const handleSalvarAlteracoes = () => {
    setIntroducoes(
      introducoes.map((item) => (item === selecionado ? novaIntroducao : item))
    ); // Atualiza a introdução na lista
    setSelecionado(""); // Limpa o item selecionado
    setNovaIntroducao(""); // Limpa o campo de texto
  };

  // Função para excluir a introdução
  const handleExcluirIntroducao = () => {
    setIntroducoes(introducoes.filter((item) => item !== selecionado)); // Remove a introdução da lista
    setSelecionado(""); // Limpa o item selecionado
    setNovaIntroducao(""); // Limpa o campo de texto
  };

  return (
    <div className="container">
      <h3>Introdução</h3>

      {/* Caixa de texto maior para dados que podem ser editados */}
      <ReactQuill
        value={novaIntroducao} // Atualiza o texto conforme o usuário digita
        onChange={setNovaIntroducao} // Atualiza o texto conforme o usuário digita
        placeholder="Escreva sua introdução aqui..."
        theme="snow"
        style={{ minHeight: "150px", marginBottom: "15px" }} // Aumenta a altura da caixa de texto
      />

      {/* Botões de Salvar ou Excluir */}
      <div className="flex justify-end mt-4">
        {selecionado ? (
          <>
            <Button onClick={handleSalvarAlteracoes} className="save-button">
              Salvar alterações
            </Button>
            <Button onClick={handleExcluirIntroducao} className="remove-button">
              Excluir
            </Button>
          </>
        ) : (
          <Button onClick={handleAdicionarIntroducao} className="add-button">
            Adicionar
          </Button>
        )}
      </div>

      {/* Exibindo o Select com as introduções */}
      <div className="mt-6">
        <select
          className="select-input"
          onChange={handleSelecaoIntroducao}
          value={selecionado}
        >
          <option value="">Selecione uma introdução</option>
          {introducoes.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Introducao;
