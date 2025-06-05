import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './Dashboard.module.css';

const dataStatus = [
  { name: 'Aprovadas', value: 400 },
  { name: 'Reprovadas', value: 100 },
  { name: 'Em andamento', value: 300 },
];

const valoresLista = [
  { label: 'Em andamento', value: 50000 },
  { label: 'Reprovadas', value: 15000 },
  { label: 'Grande baixa aprovadas', value: 10000 },
];

const initialCRMData = {
  columns: {
    enviadas: {
      name: 'Enviadas',
      items: [
        {
          id: '1',
          nome: 'Cliente 1',
          proposta: { itens: 3, valor: 12000 },
        },
        {
          id: '2',
          nome: 'Cliente 2',
          proposta: { itens: 2, valor: 7500 },
        },
      ],
    },
    negociacao: {
      name: 'Em negociação',
      items: [
        {
          id: '3',
          nome: 'Cliente 3',
          proposta: { itens: 5, valor: 22000 },
        },
      ],
    },
    aprovadas: {
      name: 'Aprovadas',
      items: [
        {
          id: '4',
          nome: 'Cliente 4',
          proposta: { itens: 1, valor: 4000 },
        },
      ],
    },
    fechamento: {
      name: 'Fechamento',
      items: [
        {
          id: '5',
          nome: 'Cliente 5',
          proposta: { itens: 4, valor: 15000 },
        },
      ],
    },
  },
  columnOrder: ['enviadas', 'negociacao', 'aprovadas', 'fechamento'],
};

function CardMenu({ options }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.cardMenu}>
      <button
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={styles.menuButton}
        aria-label="Abrir menu de opções"
      >
        &#x22EE;
      </button>
      {open && (
        <ul className={styles.menuList} role="menu">
          {options.map((opt, i) => (
            <li key={i} role="menuitem">
              <button onClick={() => { opt.action(); setOpen(false); }}>
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StatusBarChartCard({ title, data }) {
  const options = [
    { label: 'Atualizar', action: () => alert('Atualizar clicked') },
    { label: 'Configurações', action: () => alert('Configurações clicked') },
    { label: 'Fechar', action: () => alert('Fechar clicked') },
  ];

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>{title}</h2>
        <CardMenu options={options} />
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#4caf50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function ValoresListCard({ title, items }) {
  const options = [
    { label: 'Atualizar', action: () => alert('Atualizar clicked') },
    { label: 'Configurações', action: () => alert('Configurações clicked') },
    { label: 'Fechar', action: () => alert('Fechar clicked') },
  ];

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>{title}</h2>
        <CardMenu options={options} />
      </div>
      <ul className={styles.valoresList}>
        {items.map(({ label, value }, i) => (
          <li key={i} className={styles.valorItem}>
            <span className={styles.valorLabel}>{label}</span>
            <span className={styles.valorNumber}>R$ {value.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CRMKanban() {
  const [data, setData] = useState(initialCRMData);

  function onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    const sourceColumn = data.columns[source.droppableId];
    const destColumn = data.columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, removed);
      const newColumn = { ...sourceColumn, items: sourceItems };
      setData({
        ...data,
        columns: { ...data.columns, [source.droppableId]: newColumn },
      });
    } else {
      destItems.splice(destination.index, 0, removed);
      setData({
        ...data,
        columns: {
          ...data.columns,
          [source.droppableId]: { ...sourceColumn, items: sourceItems },
          [destination.droppableId]: { ...destColumn, items: destItems },
        },
      });
    }
  }

  function abrirProposta(cliente) {
    alert(`Abrindo proposta de ${cliente.nome} com ${cliente.proposta.itens} itens e valor R$ ${cliente.proposta.valor.toLocaleString()}`);
    // Substitua aqui por modal ou navegação real
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.kanbanContainer}>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          return (
            <div key={columnId} className={styles.kanbanColumn}>
              <h3 className={styles.columnTitle}>{column.name}</h3>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    className={styles.droppableArea}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {column.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            className={`${styles.kanbanCard} ${
                              snapshot.isDragging ? styles.dragging : ''
                            }`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            tabIndex={0}
                            role="button"
                            onClick={() => abrirProposta(item)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                abrirProposta(item);
                              }
                            }}
                            aria-label={`Abrir proposta de ${item.nome}`}
                          >
                            <h4 className={styles.clientName}>{item.nome}</h4>
                            <p className={styles.clientProposal}>
                              {item.proposta.itens} itens - R$ {item.proposta.valor.toLocaleString()}
                            </p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default function Dashboard() {
  return (
    <section className={styles.dashboardContainer}>
      <div className={styles.cardsRow}>
        <StatusBarChartCard title="Status das Propostas" data={dataStatus} />
        <ValoresListCard title="Valores e Baixas" items={valoresLista} />
      </div>

      <CRMKanban />
    </section>
  );
}
