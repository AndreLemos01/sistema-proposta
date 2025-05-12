// ContatosForm.js
import React, { useState } from "react";

const ContatosForm = () => {
  const [contatos, setContatos] = useState([
    { tipo: "", valor: "" },
    { tipo: "", valor: "" },
    { tipo: "", valor: "" }
  ]);

  const formatTelefone = (value) =>
    value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{1,4})$/, "$1-$2");

  const handleContatoChange = (index, field, value) => {
    const atualizados = [...contatos];
    atualizados[index][field] = field === "valor"
      ? atualizados[index].tipo === "Email"
        ? value
        : formatTelefone(value)
      : value;
    setContatos(atualizados);
  };

  return (
    <div className="form-section">
      <h3>Contatos*</h3>
      {contatos.map((contato, index) => (
        <div key={index} className="form-row">
          <div className="input-group input-small">
            <label htmlFor={`contatoTipo${index}`}>Tipo</label>
            <select
              id={`contatoTipo${index}`}
              className="input-base"
              value={contato.tipo}
              onChange={(e) => handleContatoChange(index, "tipo", e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Telefone">Telefone</option>
              <option value="Celular">Celular</option>
              <option value="Email">Email</option>
            </select>
          </div>
          <div className="input-group input-large">
            <label htmlFor={`contatoValor${index}`}>Valor</label>
            <input
              id={`contatoValor${index}`}
              type={contato.tipo === "Email" ? "email" : "text"}
              className="input-base"
              value={contato.valor}
              onChange={(e) => handleContatoChange(index, "valor", e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContatosForm;
