import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import PessoaFisicaForm from "../components/clientes/PessoaFisicaForm";
import PessoaJuridicaForm from "../components/clientes/PessoaJuridicaForm";
import AccordionContato from "../components/clientes/AccordionContato";
import AccordionEndereco from "../components/clientes/AccordionEndereco";
import AccordionObservacoes from "../components/clientes/AccordionObservacoes";
import { Accordion, Card, Button } from "react-bootstrap";
import styles from "./NovoCliente.module.css";

const API_BASE_URL = "http://localhost:5000/api"; // Ajuste sua URL aqui

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cepRegex = /^\d{5}-?\d{3}$/;
const telRegex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;

const AdicionarClientes = ({ onClose }) => {
  const navigate = useNavigate();

  const [tipoPessoa, setTipoPessoa] = useState("");
  const [dados, setDados] = useState({
    telefones: [""],
    emails: [""],
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    complemento: "",
    observacoes: "",
    nomeCompleto: "",
    cpf: "",
    razaoSocial: "",
    cnpj: "",
  });
  const [animatingOut, setAnimatingOut] = useState(false);
  const [erros, setErros] = useState({});
  const primeiroInputRef = useRef(null);

  useEffect(() => {
    if (!animatingOut) {
      setTimeout(() => {
        primeiroInputRef.current?.focus();
      }, 200);
    }
  }, [animatingOut]);

  const updateTelefone = (index, valor) => {
    const novosTelefones = [...dados.telefones];
    novosTelefones[index] = valor;
    setDados({ ...dados, telefones: novosTelefones });
  };

  const addTelefone = () => {
    setDados({ ...dados, telefones: [...dados.telefones, ""] });
  };

  const removeTelefone = (index) => {
    const novos = dados.telefones.filter((_, i) => i !== index);
    setDados({ ...dados, telefones: novos.length ? novos : [""] });
  };

  const updateEmail = (index, valor) => {
    const novosEmails = [...dados.emails];
    novosEmails[index] = valor;
    setDados({ ...dados, emails: novosEmails });
  };

  const addEmail = () => {
    setDados({ ...dados, emails: [...dados.emails, ""] });
  };

  const removeEmail = (index) => {
    const novos = dados.emails.filter((_, i) => i !== index);
    setDados({ ...dados, emails: novos.length ? novos : [""] });
  };

  // Validação do formulário
  const validarFormulario = () => {
    const novosErros = {};

    if (!dados.telefones.some((tel) => tel.trim() !== "" && telRegex.test(tel))) {
      novosErros.telefones = "Informe pelo menos um telefone válido.";
    }

    if (!dados.emails.some((email) => email.trim() !== "" && emailRegex.test(email))) {
      novosErros.emails = "Informe pelo menos um e-mail válido.";
    }

    if (tipoPessoa === "fisica") {
      if (!dados.nomeCompleto || dados.nomeCompleto.trim() === "") {
        novosErros.nomeCompleto = "Nome completo é obrigatório.";
      }
      if (!dados.cpf || !/\d{3}\.\d{3}\.\d{3}-\d{2}/.test(dados.cpf)) {
        novosErros.cpf = "CPF inválido. Use o formato 000.000.000-00";
      }
    }

    if (tipoPessoa === "juridica") {
      if (!dados.razaoSocial || dados.razaoSocial.trim() === "") {
        novosErros.razaoSocial = "Razão social é obrigatória.";
      }
      if (!dados.cnpj || !/\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/.test(dados.cnpj)) {
        novosErros.cnpj = "CNPJ inválido. Use o formato 00.000.000/0000-00";
      }
    }

    ["cep", "rua", "numero", "bairro", "cidade", "estado"].forEach((campo) => {
      if (!dados[campo] || dados[campo].trim() === "") {
        novosErros[campo] = `O campo ${campo.charAt(0).toUpperCase() + campo.slice(1)} é obrigatório.`;
      }
    });

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const adicionarCliente = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const clienteParaEnviar = {
      tipo: tipoPessoa === "fisica" ? "Pessoa Física" : "Pessoa Jurídica",
      nome: dados.nomeCompleto || dados.razaoSocial || "",
      cpf_cnpj: dados.cpf || dados.cnpj || "",
      email: dados.emails.filter(e => e.trim() !== "")[0] || "",
      telefone: dados.telefones.filter(t => t.trim() !== "")[0] || "",
      observacoes: dados.observacoes || "",
      endereco: {
        cep: dados.cep,
        rua: dados.rua,
        numero: dados.numero,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.cidade,
        estado: dados.estado,
      },
      contatos: dados.telefones
        .map((telefone, i) => ({
          nome: "", // Preencher se tiver campo para nome do contato
          telefone,
          email: dados.emails[i] || "",
          cargo: "" // Preencher se tiver campo para cargo
        }))
        .filter(c => c.telefone.trim() !== "" || c.email.trim() !== ""),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/clientes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteParaEnviar),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Erro ao salvar: " + (errorData.error || "Erro desconhecido"));
        return;
      }

      const data = await response.json();
      alert("Cliente salvo com sucesso! ID: " + data.id);
      navigate("/clientes");
    } catch (error) {
      alert("Erro de conexão: " + error.message);
    }
  };

  const fecharFormulario = () => {
    setAnimatingOut(true);
    setTimeout(() => {
      if (onClose) onClose(null);
    }, 400);
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="novo-cliente-title">
      <div className={`${styles.container} ${animatingOut ? styles.hide : styles.show}`}>
        <div className={styles.header}>
          <h1 id="novo-cliente-title">Adicionar Cliente</h1>
          <button onClick={fecharFormulario} className={styles.closeButton} aria-label="Fechar">
            <FaTimes />
          </button>
        </div>

        <form className={styles.form} onSubmit={adicionarCliente} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="tipoPessoa" className={styles.label}>Tipo</label>
            <select
              id="tipoPessoa"
              value={tipoPessoa}
              onChange={(e) => {
                setTipoPessoa(e.target.value);
                setDados({
                  telefones: [""],
                  emails: [""],
                  rua: "",
                  numero: "",
                  bairro: "",
                  cidade: "",
                  estado: "",
                  cep: "",
                  complemento: "",
                  observacoes: "",
                  nomeCompleto: "",
                  cpf: "",
                  razaoSocial: "",
                  cnpj: "",
                });
                setErros({});
              }}
              className={styles.select}
              required
              ref={primeiroInputRef}
            >
              <option value="">Selecione</option>
              <option value="fisica">Física</option>
              <option value="juridica">Jurídica</option>
            </select>
          </div>

          {tipoPessoa === "fisica" && (
            <PessoaFisicaForm dados={dados} setDados={setDados} erros={erros} />
          )}

          {tipoPessoa === "juridica" && (
            <PessoaJuridicaForm dados={dados} setDados={setDados} erros={erros} />
          )}

          <Accordion>
            <Card>
              <Accordion.Toggle as={Button} variant="link" eventKey="0" className={styles.accordionToggle}>
                Contato
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <AccordionContato
                    dados={dados}
                    updateTelefone={updateTelefone}
                    addTelefone={addTelefone}
                    removeTelefone={removeTelefone}
                    updateEmail={updateEmail}
                    addEmail={addEmail}
                    removeEmail={removeEmail}
                    erros={erros}
                  />
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Button} variant="link" eventKey="1" className={styles.accordionToggle}>
                Endereço
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <AccordionEndereco dados={dados} setDados={setDados} erros={erros} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Button} variant="link" eventKey="2" className={styles.accordionToggle}>
                Observações Gerais
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <AccordionObservacoes dados={dados} setDados={setDados} erros={erros} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>

          <div className={styles.buttonWrapper}>
            <button type="submit" className={styles.submitButton}>Salvar Cliente</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdicionarClientes;
