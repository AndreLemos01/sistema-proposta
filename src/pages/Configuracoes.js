// src/pages/Configuracoes.js

import React, { useState } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import ItensDaProposta from '../components/configuracoes/ItensDaProposta';


export default function Configuracoes() {
  const [itens, setItens] = useState([]); // Para armazenar os estilos de itens
  const [prazos, setPrazos] = useState([]); // Para armazenar os prazos de validade
  const [modelos, setModelos] = useState([]); // Para armazenar os modelos de texto
  const [formasPagamento, setFormasPagamento] = useState([]); // Para armazenar as formas de pagamento
  const [papelTimbrado, setPapelTimbrado] = useState(null); // Para armazenar o arquivo de papel timbrado

  // Função para adicionar um item de proposta
  const adicionarItemProposta = (item) => {
    setItens([...itens, item]);
  };

  // Função para adicionar um prazo
  const adicionarPrazo = (prazo) => {
    setPrazos([...prazos, prazo]);
  };

  // Função para adicionar um modelo de texto
  const adicionarModeloTexto = (modelo) => {
    setModelos([...modelos, modelo]);
  };

  // Função para adicionar uma forma de pagamento
  const adicionarFormaPagamento = (forma) => {
    setFormasPagamento([...formasPagamento, forma]);
  };

  // Função para upload de papel timbrado
  const handlePapelTimbradoUpload = (e) => {
    const file = e.target.files[0];
    setPapelTimbrado(file);
  };

  // Função para remover um item de pagamento
  const removerFormaPagamento = (index) => {
    const updatedFormasPagamento = [...formasPagamento];
    updatedFormasPagamento.splice(index, 1);
    setFormasPagamento(updatedFormasPagamento);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#F39C12]">Configurações do Sistema</h1>

      <Tabs defaultValue="itens" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 gap-2 bg-[#f7f7f7] p-2 rounded-xl mb-6">
          <TabsTrigger value="itens">Itens da Proposta</TabsTrigger>
          <TabsTrigger value="prazos">Prazos de Validade</TabsTrigger>
          <TabsTrigger value="modelos">Modelos de Texto</TabsTrigger>
          <TabsTrigger value="pagamento">Formas de Pagamento</TabsTrigger>
          <TabsTrigger value="timbrado">Papéis Timbrados</TabsTrigger>
        </TabsList>

        {/* Itens da Proposta */}
        <TabsContent value="itens">
            <ItensDaProposta />
        </TabsContent>


        {/* Prazos de Validade */}
        <TabsContent value="prazos">
          <Card className="mb-4">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Prazos de Validade</h2>
              <button onClick={() => adicionarPrazo('Novo Prazo')} className="mb-4 bg-[#F39C12] text-white p-2 rounded">
                Adicionar Novo Prazo
              </button>
              <ul>
                {prazos.map((prazo, index) => (
                  <li key={index} className="mb-2">{prazo}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Modelos de Texto */}
        <TabsContent value="modelos">
          <Card className="mb-4">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Modelos de Texto</h2>
              <button onClick={() => adicionarModeloTexto('Novo Modelo')} className="mb-4 bg-[#F39C12] text-white p-2 rounded">
                Adicionar Novo Modelo
              </button>
              <ul>
                {modelos.map((modelo, index) => (
                  <li key={index} className="mb-2">{modelo}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Formas de Pagamento */}
        <TabsContent value="pagamento">
          <Card className="mb-4">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Formas de Pagamento</h2>
              <button onClick={() => adicionarFormaPagamento('Novo Forma')} className="mb-4 bg-[#F39C12] text-white p-2 rounded">
                Adicionar Nova Forma
              </button>
              <ul>
                {formasPagamento.map((forma, index) => (
                  <li key={index} className="mb-2">
                    {forma} <button onClick={() => removerFormaPagamento(index)} className="text-red-500">Remover</button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Papéis Timbrados */}
        <TabsContent value="timbrado">
          <Card className="mb-4">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Papéis Timbrados</h2>
              <input type="file" onChange={handlePapelTimbradoUpload} className="mb-4" />
              {papelTimbrado && (
                <div className="mt-4">
                  <p><strong>Papel Timbrado Selecionado:</strong> {papelTimbrado.name}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Visualização do Padrão da Proposta (fixa, fora das abas) */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Pré-visualização da Proposta</h2>
        <div className="p-4 border bg-gray-50 rounded-lg">
          <h3 className="font-semibold">Itens da Proposta:</h3>
          <ul>
            {itens.map((item, index) => (
              <li key={index} className="mb-2">{item}</li>
            ))}
          </ul>

          <h3 className="font-semibold mt-4">Formas de Pagamento:</h3>
          <ul>
            {formasPagamento.map((forma, index) => (
              <li key={index} className="mb-2">{forma}</li>
            ))}
          </ul>

          <h3 className="font-semibold mt-4">Modelo de Texto:</h3>
          <ul>
            {modelos.map((modelo, index) => (
              <li key={index} className="mb-2">{modelo}</li>
            ))}
          </ul>

          <h3 className="font-semibold mt-4">Prazos de Validade:</h3>
          <ul>
            {prazos.map((prazo, index) => (
              <li key={index} className="mb-2">{prazo}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
