import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => (
  <div className="tabs">
    <button
      className={`tab ${activeTab === "geral" ? "active" : ""}`}
      onClick={() => setActiveTab("geral")}
    >
      Geral
    </button>
    <button
      className={`tab ${activeTab === "endereco" ? "active" : ""}`}
      onClick={() => setActiveTab("endereco")}
    >
      Endereço
    </button>
    <button
      className={`tab ${activeTab === "extras" ? "active" : ""}`}
      onClick={() => setActiveTab("extras")}
    >
      Extras
    </button>
    <button
      className={`tab ${activeTab === "credito" ? "active" : ""}`}
      onClick={() => setActiveTab("credito")}
    >
      Crédito
    </button>
  </div>
);

export default Tabs;
