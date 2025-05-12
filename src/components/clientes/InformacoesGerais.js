import React, { useState } from "react";

const InformacoesGerais = () => {
  const [comoConheceu, setComoConheceu] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [status, setStatus] = useState("Ativo");
  const responsavelCadastro = "Usuário Logado";
  const dataCadastro = new Date().toLocaleDateString("pt-BR");
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = () => {
    // Aqui você pode fazer a chamada de envio de dados
    setSucesso(true); // Altera o estado para mostrar a mensagem de sucesso
  };

  return (
    <div className="form-section">
      <label htmlFor="comoConheceu">Como nos conheceu?</label>
      <select
        id="comoConheceu"
        className="input-base input-small"
        value={comoConheceu}
        onChange={(e) => setComoConheceu(e.target.value)}
      >
        <option value="">Selecione</option>
        <option value="internet">Internet</option>
        <option value="indicação">Indicação</option>
        <option value="panfleto">Panfleto</option>
        <option value="outro">Outro</option>
      </select>

      <label htmlFor="observacoes">Observações</label>
      <textarea
        id="observacoes"
        className="textarea-observacoes"
        value={observacoes}
        onChange={(e) => setObservacoes(e.target.value)}
      />

      <label htmlFor="status">Status</label>
      <select
        id="status"
        className="input-base input-small"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Ativo</option>
        <option>Inativo</option>
        <option>Pendente</option>
        <option>Bloqueado</option>
      </select>

      <div className="form-row">
        <div className="input-group input-small">
          <label htmlFor="responsavelCadastro">Responsável pelo cadastro</label>
          <input
            id="responsavelCadastro"
            type="text"
            className="input-base"
            value={responsavelCadastro}
            readOnly
          />
        </div>
        <div className="input-group input-small">
          <label htmlFor="dataCadastro">Data do cadastro</label>
          <input
            id="dataCadastro"
            type="text"
            className="input-base"
            value={dataCadastro}
            readOnly
          />
        </div>
      </div>

      {sucesso && <div className="success-message">Cadastro realizado com sucesso!</div>}
      
      <button type="button" onClick={handleSubmit}>Enviar</button>
    </div>
  );
};

export default InformacoesGerais;
