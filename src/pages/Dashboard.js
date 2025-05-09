import React, { useContext, useState } from 'react';
import { PropostasContext } from '../context/PropostasContext';
import BarChartComponent from "../components/dashboard/BarChartComponent";
import TotalFechado from "../components/dashboard/TotalFechado";
import SearchBar from "../components/dashboard/SearchBar";
import CrmBoard from "../components/dashboard/CrmBoard";
import './Dashboard.css';

const Dashboard = () => {
  const { propostas, setPropostas } = useContext(PropostasContext);
  const [search, setSearch] = useState("");

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
    removed.status = destination.droppableId;
    items.splice(destination.index, 0, removed);

    setPropostas(items);
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
