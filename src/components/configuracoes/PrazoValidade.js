import React, { useState } from "react";
import styles from "./PrazoValidade.module.css";

const PrazoValidade = ({ prazosValidade, setPrazosValidade }) => {
  const [quantidade, setQuantidade] = useState("");
  const [unidade, setUnidade] = useState("Dias");

  const handleAdicionarPrazo = () => {
    const valor = `${quantidade.padStart(2, "0")} ${unidade}`;
    if (!quantidade.trim() || prazosValidade.includes(valor)) return;
    setPrazosValidade([...prazosValidade, valor]);
    setQuantidade("");
    setUnidade("Dias");
  };

  const handleRemoverPrazo = (item) => {
    setPrazosValidade(prazosValidade.filter((i) => i !== item));
  };

  // Limita o input para no máximo 2 dígitos numéricos
  const handleQuantidadeChange = (e) => {
    const val = e.target.value;
    if (/^\d{0,2}$/.test(val)) {
      setQuantidade(val);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Validade da Proposta</h3>

      <div className={styles.inputGroup}>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={2}
          value={quantidade}
          onChange={handleQuantidadeChange}
          placeholder="Qtd"
          className={styles.inputQuantidade}
          aria-label="Quantidade"
        />

        <select
          value={unidade}
          onChange={(e) => setUnidade(e.target.value)}
          className={styles.selectUnidade}
          aria-label="Unidade de tempo"
        >
          <option value="Dias">Dias</option>
          <option value="Meses">Meses</option>
          <option value="Ano">Ano</option>
        </select>

        <button
          onClick={handleAdicionarPrazo}
          className={styles.addButton}
          disabled={!quantidade.trim()}
          aria-label="Adicionar prazo de validade"
        >
          Adicionar
        </button>
      </div>

      <ul className={styles.list}>
        {prazosValidade.map((item, index) => (
          <li key={index} className={styles.listItem}>
            {item}
            <button
              onClick={() => handleRemoverPrazo(item)}
              className={styles.removeButton}
              aria-label={`Remover prazo ${item}`}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrazoValidade;
