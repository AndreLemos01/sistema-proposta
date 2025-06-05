import React, { useState } from "react";
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaBarcode,
  FaUniversity,
  FaQrcode,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import styles from "./FormaPagamento.module.css";

const ICONS_MAP = {
  dinheiro: <FaMoneyBillWave />,
  credito: <FaCreditCard />,
  debito: <FaUniversity />,
  boleto: <FaBarcode />,
  pix: <FaQrcode />,
};

// Formas padrão com ids fixos para bloquear exclusão/edição
const FORMAS_PAGAMENTO_PADRAO = [
  { id: "1", nome: "Dinheiro", iconeId: "dinheiro" },
  { id: "2", nome: "Crédito", iconeId: "credito" },
  { id: "3", nome: "Débito", iconeId: "debito" },
  { id: "4", nome: "Boleto", iconeId: "boleto" },
  { id: "5", nome: "Pix", iconeId: "pix" },
];

const FormaPagamento = ({ formasPagamento, setFormasPagamento }) => {
  const [novaFormaNome, setNovaFormaNome] = useState("");
  const [novoIcone, setNovoIcone] = useState("dinheiro");
  const [editandoId, setEditandoId] = useState(null);
  const [editandoNome, setEditandoNome] = useState("");
  const [editandoIcone, setEditandoIcone] = useState("dinheiro");

  const ehPadrao = (id) => FORMAS_PAGAMENTO_PADRAO.some((f) => f.id === id);

  const handleAdicionar = () => {
    if (!novaFormaNome.trim()) return;
    if (
      formasPagamento.some(
        (f) => f.nome.toLowerCase() === novaFormaNome.trim().toLowerCase()
      )
    ) {
      alert("Forma de pagamento já existe");
      return;
    }
    const novaForma = {
      id: Date.now().toString(),
      nome: novaFormaNome.trim(),
      iconeId: novoIcone,
    };
    setFormasPagamento([...formasPagamento, novaForma]);
    setNovaFormaNome("");
    setNovoIcone("dinheiro");
  };

  const iniciarEdicao = (forma) => {
    if (ehPadrao(forma.id)) return; // Não permite editar padrão
    setEditandoId(forma.id);
    setEditandoNome(forma.nome);
    setEditandoIcone(forma.iconeId);
  };

  const salvarEdicao = () => {
    if (!editandoNome.trim()) return;
    setFormasPagamento(
      formasPagamento.map((f) =>
        f.id === editandoId
          ? { ...f, nome: editandoNome, iconeId: editandoIcone }
          : f
      )
    );
    cancelarEdicao();
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setEditandoNome("");
    setEditandoIcone("dinheiro");
  };

  const handleRemover = (id) => {
    if (ehPadrao(id)) {
      alert("Não pode remover formas de pagamento padrão");
      return;
    }
    setFormasPagamento(formasPagamento.filter((f) => f.id !== id));
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Formas de Pagamento</h3>

      {/* Adicionar nova forma */}
      <div className={styles.addForm}>
        <input
          type="text"
          placeholder="Nova forma de pagamento"
          value={novaFormaNome}
          onChange={(e) => setNovaFormaNome(e.target.value)}
          className={styles.input}
        />

        <select
          value={novoIcone}
          onChange={(e) => setNovoIcone(e.target.value)}
          className={styles.selectIcon}
          aria-label="Selecionar ícone para nova forma"
        >
          {Object.entries(ICONS_MAP).map(([key]) => (
            <option key={key} value={key}>
              {key /* texto escondido pelo CSS para mostrar só o ícone */}
            </option>
          ))}
        </select>

        <button
          onClick={handleAdicionar}
          disabled={!novaFormaNome.trim()}
          className={styles.addButton}
        >
          Adicionar
        </button>
      </div>

      {/* Lista de formas */}
      <ul className={styles.list}>
        {formasPagamento.map((forma) => (
          <li key={forma.id} className={styles.listItem}>
            <div className={styles.icon}>{ICONS_MAP[forma.iconeId]}</div>

            {editandoId === forma.id ? (
              <>
                <input
                  type="text"
                  value={editandoNome}
                  onChange={(e) => setEditandoNome(e.target.value)}
                  className={styles.inputEdit}
                />
                <select
                  value={editandoIcone}
                  onChange={(e) => setEditandoIcone(e.target.value)}
                  className={styles.selectIconEdit}
                  aria-label="Alterar ícone da forma"
                >
                  {Object.entries(ICONS_MAP).map(([key]) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
                <button onClick={salvarEdicao} className={styles.saveButton}>
                  Salvar
                </button>
                <button onClick={cancelarEdicao} className={styles.cancelButton}>
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <span>{forma.nome}</span>
                {!ehPadrao(forma.id) && (
                  <>
                    <button
                      onClick={() => iniciarEdicao(forma)}
                      className={styles.editButton}
                      aria-label={`Editar forma de pagamento ${forma.nome}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleRemover(forma.id)}
                      className={styles.removeButton}
                      aria-label={`Remover forma de pagamento ${forma.nome}`}
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormaPagamento;

