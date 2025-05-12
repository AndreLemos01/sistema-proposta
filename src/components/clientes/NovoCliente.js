import React, { useState } from 'react';
import PessoaFisicaForm from './PessoaFisicaForm';
import PessoaJuridicaForm from './PessoaJuridicaForm'; // ✅ novo import
import './NovoCliente.css';
import { Accordion, Card, Button } from 'react-bootstrap';

const NovoCliente = () => {
  const [tipoPessoa, setTipoPessoa] = useState("");

  const adicionarCliente = (cliente) => {
    console.log("Novo Cliente:", cliente);
  };

  return (
    <div>
      <h1>Criar Novo Cliente</h1>

      <div className="form-section-1">
        <h2>Formulário Geral</h2>
        <form>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <select
              value={tipoPessoa}
              onChange={(e) => setTipoPessoa(e.target.value)}
              style={{ marginRight: '10px' }}
            >
              <option value="">Selecione</option>
              <option value="fisica">Física</option>
              <option value="juridica">Jurídica</option>
            </select>
          </div>

          {/* Pessoa Física */}
          {tipoPessoa === "fisica" && <PessoaFisicaForm />}

          {/* Pessoa Jurídica */}
          {tipoPessoa === "juridica" && <PessoaJuridicaForm />}

          {/* Acordeões */}
          <div className="accordion-section" style={{ marginTop: '30px' }}>
            <Accordion>
              <Card>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Contatos
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
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
                    <label>Observações:</label>
                    <textarea placeholder="Digite observações gerais"></textarea>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>

          <button
            type="button"
            onClick={() => adicionarCliente({ nome: "Novo Cliente", tipoPessoa })}
          >
            Salvar Cliente
          </button>
        </form>
      </div>
    </div>
  );
};

export default NovoCliente;
