import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Proposta.module.css";
import noDataImg from "../assets/no-data.png"; // importe uma imagem para quando não tiver propostas

const Proposta = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Espera receber o objeto de proposta pelo state do navigate
  const proposta = location.state || null;

  const voltarParaAdicionar = () => {
    navigate("/adicionar-proposta");
  };

  if (!proposta) {
    // Tela vazia - nenhuma proposta salva
    return (
      <div className={styles.emptyContainer}>
        <img src={noDataImg} alt="Nenhuma proposta encontrada" className={styles.emptyImage} />
        <h2 className={styles.emptyTitle}>Nenhuma proposta salva ainda</h2>
        <p className={styles.emptyText}>
          Comece agora a criar suas propostas e acompanhe todas elas aqui de forma rápida e fácil!
        </p>
        <button className={styles.startButton} onClick={voltarParaAdicionar}>
          Criar Nova Proposta
        </button>
      </div>
    );
  }

  // Se houver proposta, mostra os dados formatados:
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Proposta para {proposta.cliente}</h1>

      <section className={styles.section}>
        <strong>Tipo:</strong> {proposta.tipo}
      </section>

      <section className={styles.section}>
        <strong>Introdução:</strong>
        <div dangerouslySetInnerHTML={{ __html: proposta.introducao }} />
      </section>

      <section className={styles.section}>
        <strong>Modelo de Texto:</strong>
        <div dangerouslySetInnerHTML={{ __html: proposta.modeloTexto }} />
      </section>

      <section className={styles.section}>
        <strong>Validade da Proposta:</strong> {proposta.validoPor}
      </section>

      <section className={styles.section}>
        <strong>Forma de Pagamento:</strong> {proposta.condicoesPagamento}
      </section>

      <section className={styles.section}>
        <strong>Observações:</strong>
        <p>{proposta.descricao}</p>
      </section>

      <section className={styles.section}>
        <strong>Itens:</strong>
        <ul className={styles.itensList}>
          {proposta.itensSelecionados.map((item, idx) => (
            <li key={idx}>
              {item.titulo} - Quantidade: {item.quantidade} - Valor: R$ {item.valor.toFixed(2)}
            </li>
          ))}
        </ul>
      </section>

      <button className={styles.backButton} onClick={voltarParaAdicionar}>
        Criar Nova Proposta
      </button>
    </div>
  );
};

export default Proposta;
