import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Select, SelectItem } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

const estilos = [
  { value: 'agrupado', label: 'Agrupável por Tipo' },
  { value: 'detalhado', label: 'Com Detalhamento Técnico' },
  { value: 'simples', label: 'Simples' },
];

export default function ItensDaProposta() {
  const [estiloSelecionado, setEstiloSelecionado] = useState('simples');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [itensAgrupados, setItensAgrupados] = useState([]);
  const [itensDetalhados, setItensDetalhados] = useState([]);
  const [itensSimples, setItensSimples] = useState([]);
  const [variaveisDetalhadas, setVariaveisDetalhadas] = useState([]);
  const [descricaoVariavel, setDescricaoVariavel] = useState('');
  const [step, setStep] = useState(1);

  const adicionarItemAgrupado = (item) => {
    setItensAgrupados([...itensAgrupados, item]);
  };

  const adicionarItemDetalhado = (item) => {
    setItensDetalhados([...itensDetalhados, item]);
  };

  const adicionarItemSimples = () => {
    const novoItem = { id: Date.now(), nome: '', descricao: '' };
    setItensSimples([...itensSimples, novoItem]);
  };

  const salvarItens = () => {
    // Salvar os itens configurados
    console.log('Itens salvos', itensAgrupados, itensDetalhados, itensSimples);
  };

  const handleDescricaoChange = (e) => setDescricao(e.target.value);

  const handleVariavelChange = (e) => setDescricaoVariavel(e.target.value);

  const avancarStep = () => setStep(step + 1);
  const voltarStep = () => setStep(step - 1);

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-4">Itens da Proposta</h2>

        <div className="mb-6">
          <label className="block font-medium mb-1">Título do Item</label>
          <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" />
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-1">Descrição (não obrigatória)</label>
          <Input value={descricao} onChange={handleDescricaoChange} placeholder="Descrição do item" />
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-1">Selecione o Estilo</label>
          <Select value={estiloSelecionado} onChange={(e) => setEstiloSelecionado(e.target.value)}>
            {estilos.map((opcao) => (
              <SelectItem key={opcao.value} value={opcao.value}>
                {opcao.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        {step === 1 && estiloSelecionado === 'agrupado' && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Itens Agrupados</h3>
            <Input
              placeholder="Digite o item a ser agrupado"
              onBlur={(e) => adicionarItemAgrupado(e.target.value)}
            />
            <div className="flex space-x-2 mt-2">
              {itensAgrupados.map((item, index) => (
                <div key={index} className="bg-gray-200 p-2 rounded">
                  {item}
                  <Button onClick={() => setItensAgrupados(itensAgrupados.filter((i) => i !== item))}>Excluir</Button>
                </div>
              ))}
            </div>
            <Button onClick={avancarStep}>Próximo</Button>
          </div>
        )}

        {step === 1 && estiloSelecionado === 'detalhado' && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Variáveis do Item</h3>
            <Input
              placeholder="Digite uma variável do item"
              onBlur={(e) => setVariaveisDetalhadas([...variaveisDetalhadas, e.target.value])}
            />
            <div className="flex space-x-2 mt-2">
              {variaveisDetalhadas.map((variavel, index) => (
                <div key={index} className="bg-gray-200 p-2 rounded">
                  {variavel}
                  <Button onClick={() => setVariaveisDetalhadas(variaveisDetalhadas.filter((v) => v !== variavel))}>Excluir</Button>
                </div>
              ))}
            </div>
            <Button onClick={avancarStep}>Próximo</Button>
          </div>
        )}

        {step === 1 && estiloSelecionado === 'simples' && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Item Simples</h3>
            <Button onClick={avancarStep}>Próximo</Button>
          </div>
        )}

        {step === 2 && (estiloSelecionado === 'agrupado' || estiloSelecionado === 'detalhado') && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Descrição do Item</h3>
            <div className="flex">
              <Select>
                {(estiloSelecionado === 'agrupado' ? itensAgrupados : variaveisDetalhadas).map((item, index) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </Select>
              <Input
                placeholder="Descrição do item selecionado"
                value={descricaoVariavel}
                onChange={handleVariavelChange}
              />
            </div>
            <Button onClick={avancarStep}>Salvar e Avançar</Button>
          </div>
        )}

        {step === 2 && estiloSelecionado === 'simples' && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Descrição do Item</h3>
            <Input
              placeholder="Descrição do item simples"
              value={descricaoVariavel}
              onChange={handleVariavelChange}
            />
            <Button onClick={avancarStep}>Salvar e Avançar</Button>
          </div>
        )}

        {step === 3 && (
          <div>
            <Button onClick={salvarItens}>Salvar Itens</Button>
            <Button onClick={voltarStep}>Voltar</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
