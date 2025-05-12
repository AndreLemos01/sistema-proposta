import React, { useState } from 'react';
import PessoaFisicaForm from './PessoaFisicaForm'; // Importe o componente PessoaFisicaForm
import './NovoCliente.css'; // Importe o arquivo CSS para estilização
import { Accordion, Card, Button } from 'react-bootstrap'; // Importe componentes do Bootstrap para acordeão

const NovoCliente = () => {
  const [tipoPessoa, setTipoPessoa] = useState(""); // Estado para controlar o tipo de pessoa

  // Função para adicionar um cliente (exemplo)
  const adicionarCliente = (cliente) => {
    console.log("Novo Cliente:", cliente); // Apenas um exemplo de ação
  };

  return (
    <div>
      <h1>Criar Novo Cliente</h1>
      
      {/* Formulário Geral diretamente renderizado */}
      <div className="form-section">
        <h2>Formulário Geral</h2>
        <form>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Seletor de Tipo de Pessoa (Físico ou Jurídico) */}
            <select 
              value={tipoPessoa} 
              onChange={(e) => setTipoPessoa(e.target.value)} 
              style={{ marginRight: '10px' }} // Espaçamento entre o seletor e o campo Nome
            >
              <option value="">Selecione</option>
              <option value="fisica">Física</option>
              <option value="juridica">Jurídica</option>
            </select>
          </div>

          {/* Renderização condicional para exibir o formulário de Pessoa Física */}
          {tipoPessoa === "fisica" && <PessoaFisicaForm />}

          {/* Renderização condicional para exibir os campos de Pessoa Jurídica, se necessário */}
          {tipoPessoa === "juridica" && (
            <div>
              <h3>Cadastro de Pessoa Jurídica</h3>
              <label>CNPJ:</label>
              <input type="text" placeholder="Digite o CNPJ" />
              <label>Razão Social:</label>
              <input type="text" placeholder="Digite a Razão Social" />
              <label>Inscrição Estadual:</label>
              <input type="text" placeholder="Digite a Inscrição Estadual" />
            </div>
          )}

          {/* Acordeões */}
          <div className="accordion-section" style={{ marginTop: '30px' }}>
            <Accordion>
              <Card>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Contatos
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    {/* Campos de Contatos */}
                    <label>Telefone:</label>
                    <input type="text" placeholder="Digite o telefone" />
                    <label>Email:</label>
                    <input type="email" placeholder="Digite o email" />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Endereço
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    {/* Campos de Endereço */}
                    <label>Rua:</label>
                    <input type="text" placeholder="Digite a rua" />
                    <label>Bairro:</label>
                    <input type="text" placeholder="Digite o bairro" />
                    <label>Cidade:</label>
                    <input type="text" placeholder="Digite a cidade" />
                    <label>Estado:</label>
                    <input type="text" placeholder="Digite o estado" />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                  Outros Contatos
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    {/* Campos de Outros Contatos */}
                    <label>Contato de Emergência:</label>
                    <input type="text" placeholder="Digite o contato de emergência" />
                    <label>Relacionamento com Emergência:</label>
                    <input type="text" placeholder="Digite o relacionamento" />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card>
                <Accordion.Toggle as={Button} variant="link" eventKey="3">
                  Observações Gerais
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                  <Card.Body>
                    {/* Campos de Observações Gerais */}
                    <label>Observações:</label>
                    <textarea placeholder="Digite observações gerais"></textarea>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>

          {/* Botão para salvar cliente abaixo dos acordeões */}
          <button type="button" onClick={() => adicionarCliente({ nome: "Novo Cliente", tipoPessoa })}>
            Salvar Cliente
          </button>
        </form>
      </div>
    </div>
  );
};

export default NovoCliente;
