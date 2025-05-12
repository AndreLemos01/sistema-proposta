

// PessoaJuridicaForm.js
import React, { useState } from "react";

const PessoaJuridicaForm = () => {
  const [dados, setDados] = useState({
    razaoSocial: "",
    nomeFantasia: "",
    cnpj: "",
    dataAbertura: "",
    porte: "",
    ramo: "",
    site: "",
    responsavelLegal: "",
    ie: "",
    isentoIe: false
  });

  const formatCnpj = (value) =>
    value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2");

  const handleChange = (field, value) => {
    setDados({
      ...dados,
      [field]: field === "cnpj" ? formatCnpj(value) : value
    });
  };

  const toggleIsentoIe = () => {
    setDados((prev) => ({ ...prev, isentoIe: !prev.isentoIe, ie: "" }));
  };

  return (
    <>
      <div className="form-row">
        <div className="input-group input-large">
          <label htmlFor="razaoSocial">Razão social*</label>
          <input
            type="text"
            id="razaoSocial"
            className="input-base"
            value={dados.razaoSocial}
            onChange={(e) => handleChange("razaoSocial", e.target.value)}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="input-group input-large">
          <label htmlFor="nomeFantasia">Nome fantasia</label>
          <input
            type="text"
            id="nomeFantasia"
            className="input-base"
            value={dados.nomeFantasia}
            onChange={(e) => handleChange("nomeFantasia", e.target.value)}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="input-group input-small">
          <label htmlFor="cnpj">CNPJ*</label>
          <input
            type="text"
            id="cnpj"
            className="input-base"
            value={dados.cnpj}
            onChange={(e) => handleChange("cnpj", e.target.value)}
          />
        </div>
        <div className="input-group input-small">
          <label htmlFor="dataAbertura">Data de abertura</label>
          <input
            type="date"
            id="dataAbertura"
            className="input-base"
            value={dados.dataAbertura}
            onChange={(e) => handleChange("dataAbertura", e.target.value)}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="input-group input-small">
          <label htmlFor="porte">Porte</label>
          <select
            id="porte"
            className="input-base"
            value={dados.porte}
            onChange={(e) => handleChange("porte", e.target.value)}
          >
            <option value="">Selecione</option>
            <option>MEI</option>
            <option>EPP</option>
            <option>LTDA</option>
            <option>SA</option>
          </select>
        </div>
        <div className="input-group input-large">
          <label htmlFor="ramo">Ramo de atividade</label>
          <input
            type="text"
            id="ramo"
            className="input-base"
            value={dados.ramo}
            onChange={(e) => handleChange("ramo", e.target.value)}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="input-group input-small">
          <label htmlFor="responsavelLegal">Responsável legal</label>
          <input
            type="text"
            id="responsavelLegal"
            className="input-base"
            value={dados.responsavelLegal}
            onChange={(e) => handleChange("responsavelLegal", e.target.value)}
          />
        </div>
        <div className="input-group input-small">
          <label htmlFor="site">Site da empresa</label>
          <input
            type="text"
            id="site"
            className="input-base"
            value={dados.site}
            onChange={(e) => handleChange("site", e.target.value)}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="input-group">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              id="ieIsento"
              checked={dados.isentoIe}
              onChange={toggleIsentoIe}
            />
            <label htmlFor="ieIsento" style={{ margin: 0 }}>Isento</label>
          </div>
          <label htmlFor="ie">Inscrição Estadual</label>
          <input
            type="text"
            id="ie"
            className="input-base"
            value={dados.ie}
            onChange={(e) => handleChange("ie", e.target.value)}
            disabled={dados.isentoIe}
          />
        </div>
      </div>
    </>
  );
};

export default PessoaJuridicaForm;
