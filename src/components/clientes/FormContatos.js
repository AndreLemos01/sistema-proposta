import React from "react";

const FormContatos = ({ contatos, setContatos }) => {
  const handleChange = (index, field, value) => {
    const atualizados = [...contatos];
    atualizados[index][field] = value;
    setContatos(atualizados);
  };

  const handleAddContato = () => {
    setContatos([...contatos, { tipo: "", numero: "", observacoes: "" }]);
  };

  const handleRemoveContato = (index) => {
    setContatos(contatos.filter((_, i) => i !== index));
  };

  return (
    <div className="form-section">
      <h3>Contatos*</h3>
      {contatos.map((contato, index) => (
        <div key={index} className="contato-group">
          <select
            value={contato.tipo}
            onChange={(e) => handleChange(index, "tipo", e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="Celular">Celular</option>
            <option value="Email">Email</option>
            <option value="Residencial">Residencial</option>
          </select>
          <input
            type="text"
            value={contato.numero}
            onChange={(e) => handleChange(index, "numero", e.target.value)}
          />
          <input
            type="text"
            value={contato.observacoes}
            onChange={(e) => handleChange(index, "observacoes", e.target.value)}
          />
          <button type="button" onClick={() => handleRemoveContato(index)} className="remove-btn">
            Remover
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddContato} className="add-btn">
        Adicionar Contato
      </button>
    </div>
  );
};

export default FormContatos;
