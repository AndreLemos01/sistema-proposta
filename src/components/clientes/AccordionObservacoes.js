import React from "react";
import styles from "./AccordionObservacoes.module.css";

const AccordionObservacoes = ({ dados, setDados, erros }) => {
  return (
    <div className={styles.accordionBody}>
      <textarea
        placeholder="Digite observações gerais"
        className={styles.textarea}
        value={dados.observacoes || ""}
        onChange={(e) => setDados({ ...dados, observacoes: e.target.value })}
        aria-invalid={!!erros.observacoes}
        aria-describedby={erros.observacoes ? "error-observacoes" : undefined}
      />
      {erros.observacoes && (
        <div id="error-observacoes" className={styles.errorMsg}>
          {erros.observacoes}
        </div>
      )}
    </div>
  );
};

export default AccordionObservacoes;
