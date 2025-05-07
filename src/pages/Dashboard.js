import React, { useContext, useState } from 'react'; // Certifique-se de importar o useState
import { PropostasContext } from '../context/PropostasContext'; // Importando o contexto
import BarChartComponent from "../components/dashboard/BarChartComponent";
import TotalFechado from "../components/dashboard/TotalFechado";
import SearchBar from "../components/dashboard/SearchBar";
import CrmBoard from "../components/dashboard/CrmBoard";
import './Dashboard.css';

const Dashboard = () => {
  const { propostas, setPropostas } = useContext(PropostasContext); // Acessando o estado do contexto
  const [search, setSearch] = useState(""); // Estado de pesquisa

  const statusData = [
    { name: "Enviadas", value: propostas.filter(p => p.status === "enviada").length },
    { name: "Em Análise", value: propostas.filter(p => p.status === "em analise").length },
    { name: "Aprovadas", value: propostas.filter(p => p.status === "aprovada").length },
    { name: "Reprovadas", value: propostas.filter(p => p.status === "reprovada").length },
  ];

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const items = Array.from(propostas);
    const [removed] = items.splice(source.index, 1);
    removed.status = destination.droppableId; // Atualiza o status da proposta para a coluna destino
    items.splice(destination.index, 0, removed);

    setPropostas(items);
  };

  const onAddProposta = (novaProposta) => {
    setPropostas([...propostas, novaProposta]); // Adiciona a nova proposta no estado do Dashboard
  };

  return (
    <div className="dashboard-container">
      <div className="top-cards">
        <BarChartComponent statusData={statusData} />
        <TotalFechado propostas={propostas} />
      </div>

      <SearchBar search={search} setSearch={setSearch} />

      <CrmBoard propostas={propostas} search={search} handleDragEnd={handleDragEnd} />
    </div>
  );
};

export default Dashboard;
