import React, { useState } from 'react';
import './PessoaFisicaForm.css'; // Importe o arquivo CSS para estilização

const PessoaFisicaForm = () => {
  const [dados, setDados] = useState({
    nomeCompleto: "",
    cpf: "",
    dataNascimento: "",
    sexo: "",
    estadoCivil: "",
    profissao: ""
  });

  const formatCpf = (value) =>
    value
      .replace(/\D/g, "") // Remove qualquer caractere que não seja número
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  const handleChange = (field, value) => {
    setDados({ ...dados, [field]: field === "cpf" ? formatCpf(value) : value });
  };

  return (
    <div className="pessoa-fisica-form">
      {/* 1ª Linha: Nome Completo */}
      <div className="form-row">
        <label htmlFor="nomeCompleto">Nome completo*</label> {/* Título acima do campo */}
        <input
          type="text"
          id="nomeCompleto"
          className="input-base nome-completo"
          value={dados.nomeCompleto}
          onChange={(e) => handleChange("nomeCompleto", e.target.value)}
        />
      </div>

    <div className="form-row">
      <div className="input-group cpf">
        <label htmlFor="cpf">CPF*</label>
        <input
          type="text"
          id="cpf"
          className="input-base"
          value={dados.cpf}
          onChange={(e) => handleChange("cpf", e.target.value)}
          maxLength="14"
        />
      </div>

      <div className="input-group data-nascimento">
        <label htmlFor="dataNascimento">Data de nascimento*</label>
        <input
          type="date"
          id="dataNascimento"
          className="input-base"
          value={dados.dataNascimento}
          onChange={(e) => handleChange("dataNascimento", e.target.value)}
        />
      </div>

      <div className="input-group sexo">
        <label htmlFor="sexo">Sexo</label>
        <select
          id="sexo"
          className="input-base"
          value={dados.sexo}
          onChange={(e) => handleChange("sexo", e.target.value)}
        >
          <option value="">Selecione</option>
          <option>Masculino</option>
          <option>Feminino</option>
          <option>Outro</option>
          <option>Prefere não informar</option>
        </select>
      </div>

      <div className="input-group estado-civil">
        <label htmlFor="estadoCivil">Estado civil</label>
        <select
          id="estadoCivil"
          className="input-base"
          value={dados.estadoCivil}
          onChange={(e) => handleChange("estadoCivil", e.target.value)}
        >
          <option value="">Selecione</option>
          <option>Solteiro</option>
          <option>Casado</option>
          <option>Divorciado</option>
          <option>Viúvo</option>
        </select>
      </div>

      <div className="input-group profissao">
        <label htmlFor="profissao">Profissão</label>
        <input
          type="text"
          id="profissao"
          className="input-base"
          value={dados.profissao}
          onChange={(e) => handleChange("profissao", e.target.value)}
        />
      </div>
    </div>

    </div>
  );
};

export default PessoaFisicaForm;
