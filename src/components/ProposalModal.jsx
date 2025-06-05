import React, { useState, useEffect } from 'react';
import styles from './ProposalModal.module.css';

export default function ProposalModal({ isOpen, onClose, proposalData, onSave }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (proposalData) {
      // Clona os dados para edição local
      setItems(proposalData.itens || []);
    }
  }, [proposalData]);

  function handleItemChange(index, field, value) {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  }

  function handleAddItem() {
    setItems([...items, { descricao: '', quantidade: 1, preco: 0 }]);
  }

  function handleRemoveItem(index) {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  }

  function calcularTotal() {
    return items.reduce(
      (acc, item) => acc + (parseFloat(item.quantidade) || 0) * (parseFloat(item.preco) || 0),
      0
    );
  }

  function handleSave() {
    onSave({ ...proposalData, itens: items, valorTotal: calcularTotal() });
  }

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Proposta de {proposalData.clienteNome}</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Preço Unit.</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>
                  <input
                    type="text"
                    value={item.descricao}
                    onChange={e => handleItemChange(i, 'descricao', e.target.value)}
                    placeholder="Descrição"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantidade}
                    onChange={e => handleItemChange(i, 'quantidade', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.preco}
                    onChange={e => handleItemChange(i, 'preco', e.target.value)}
                  />
                </td>
                <td>R$ {(item.quantidade * item.preco).toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => handleRemoveItem(i)}
                    className={styles.removeButton}
                    aria-label="Remover item"
                  >
                    &times;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleAddItem} className={styles.addButton}>
          + Adicionar item
        </button>
        <div className={styles.total}>
          <strong>Total: </strong> R$ {calcularTotal().toFixed(2)}
        </div>
        <div className={styles.actions}>
          <button onClick={handleSave} className={styles.saveButton}>
            Salvar
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
