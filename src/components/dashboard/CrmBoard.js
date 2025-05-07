import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./CrmBoard.css";

const CrmBoard = ({ propostas = [], search = "", handleDragEnd }) => {
  const renderCards = (status) =>
    propostas
      .filter((p) => {
        const statusVal = (p.status || "").toLowerCase();
        const tituloVal = (p.titulo || "").toLowerCase();
        return statusVal === status.toLowerCase() && tituloVal.includes(search.toLowerCase());
      })
      .map((p, index) => (
        <Draggable key={p.id} draggableId={String(p.id)} index={index}>
          {(provided) => (
            <div
              className="crm-card"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <h5>{p.titulo || "Sem título"}</h5>
              <p>R$ {p.valor ? Number(p.valor).toFixed(2) : "0,00"}</p>
            </div>
          )}
        </Draggable>
      ));

  const colunas = ["enviada", "em analise", "aprovada", "reprovada"];

  return (
    <div className="crm-board">
      <DragDropContext onDragEnd={handleDragEnd}>
        {colunas.map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="crm-column"
              >
                <h4 className="crm-column-title">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </h4>
                {renderCards(status)}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default CrmBoard;
