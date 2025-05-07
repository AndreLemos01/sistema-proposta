// Simulando banco de dados
export const getPropostas = () => {
    const data = localStorage.getItem('propostas');
    return data ? JSON.parse(data) : [];
  };
  
  export const salvarProposta = (proposta) => {
    const propostas = getPropostas();
    propostas.push(proposta);
    localStorage.setItem('propostas', JSON.stringify(propostas));
  };
  
  export const atualizarStatusProposta = (id, novoStatus) => {
    const propostas = getPropostas().map(p =>
      p.id === id ? { ...p, status: novoStatus } : p
    );
    localStorage.setItem('propostas', JSON.stringify(propostas));
  };
  