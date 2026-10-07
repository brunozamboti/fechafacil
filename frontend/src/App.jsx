import { useEffect, useState } from 'react';
import './App.css';
import CaixaForm from './components/CaixaForm';
import CaixaList from './components/CaixaList';
import MovimentacaoForm from './components/MovimentacaoForm';
import MovimentacaoList from './components/MovimentacaoList';

function App() {
  const [nomeCaixa, setNomeCaixa] = useState('');
  const [caixas, setCaixas] = useState([]);
  const [caixaEditandoId, setCaixaEditandoId] = useState(null);

  const [movimentacoes, setMovimentacoes] = useState([]);
  const [tipoMovimentacao, setTipoMovimentacao] = useState('ENTRADA');
  const [valorMovimentacao, setValorMovimentacao] = useState('');
  const [descricaoMovimentacao, setDescricaoMovimentacao] = useState('');
  const [dataMovimentacao, setDataMovimentacao] = useState('');
  const [horaMovimentacao, setHoraMovimentacao] = useState('');

  const [fechamentos, setFechamentos] = useState([]);
  const [fechamentoSelecionadoId, setFechamentoSelecionadoId] = useState('');

  useEffect(() => {
    carregarCaixas();
    carregarMovimentacoes();
    carregarFechamentos();
  }, []);

  async function carregarCaixas() {
    const resposta = await fetch('http://localhost:8080/caixas');
    const dados = await resposta.json();

    setCaixas(dados);
  }

  async function carregarMovimentacoes() {
    const resposta = await fetch('http://localhost:8080/movimentacoes');
    const dados = await resposta.json();

    setMovimentacoes(dados);
  }

  async function carregarFechamentos() {
    const resposta = await fetch('http://localhost:8080/fechamentos');
    const dados = await resposta.json();

    setFechamentos(dados);
  }

  async function cadastrarCaixa(event) {
    event.preventDefault();

    if (nomeCaixa.trim() === '') {
      return;
    }

    if (caixaEditandoId !== null) {
      const resposta = await fetch(
        `http://localhost:8080/caixas/${caixaEditandoId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nome: nomeCaixa.trim()
          })
        }
      );

      const caixaAtualizado = await resposta.json();

      setCaixas(
        caixas.map((caixa) =>
          caixa.id === caixaEditandoId ? caixaAtualizado : caixa
        )
      );

      setNomeCaixa('');
      setCaixaEditandoId(null);

      return;
    }

    const resposta = await fetch('http://localhost:8080/caixas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: nomeCaixa.trim()
      })
    });

    const novoCaixa = await resposta.json();

    setCaixas([...caixas, novoCaixa]);
    setNomeCaixa('');
  }

  async function cadastrarMovimentacao(event) {
    event.preventDefault();

    if (
      valorMovimentacao === '' ||
      dataMovimentacao === '' ||
      horaMovimentacao === '' ||
      fechamentoSelecionadoId === ''
    ) {
      return;
    }

    const dataHora = `${dataMovimentacao}T${horaMovimentacao}:00`;

    const resposta = await fetch('http://localhost:8080/movimentacoes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tipo: tipoMovimentacao,
        valor: Number(valorMovimentacao),
        descricao: descricaoMovimentacao.trim(),
        dataHora: dataHora,
        fechamento: {
          id: Number(fechamentoSelecionadoId)
        }
      })
    });

    const novaMovimentacao = await resposta.json();

    setMovimentacoes([...movimentacoes, novaMovimentacao]);

    setTipoMovimentacao('ENTRADA');
    setValorMovimentacao('');
    setDescricaoMovimentacao('');
    setDataMovimentacao('');
    setHoraMovimentacao('');
    setFechamentoSelecionadoId('');
  }

  function iniciarEdicao(caixa) {
    setCaixaEditandoId(caixa.id);
    setNomeCaixa(caixa.nome);
  }

  async function excluirMovimentacao(id) {
    await fetch(`http://localhost:8080/movimentacoes/${id}`, {
      method: 'DELETE'
    });

    setMovimentacoes(
      movimentacoes.filter((movimentacao) => movimentacao.id !== id)
    );
  }

  async function excluirCaixa(id) {
    await fetch(`http://localhost:8080/caixas/${id}`, {
      method: 'DELETE'
    });

    setCaixas(caixas.filter((caixa) => caixa.id !== id));
  }

  return (
    <main>
      <header>
        <h1>FechaFácil</h1>
        <p>Sistema de apoio ao fechamento e conferência de caixa.</p>
      </header>
      <CaixaForm
        nomeCaixa={nomeCaixa}
        setNomeCaixa={setNomeCaixa}
        caixaEditandoId={caixaEditandoId}
        cadastrarCaixa={cadastrarCaixa}
      />

      <CaixaList
        caixas={caixas}
        iniciarEdicao={iniciarEdicao}
        excluirCaixa={excluirCaixa} />

      <MovimentacaoForm
        tipoMovimentacao={tipoMovimentacao}
        setTipoMovimentacao={setTipoMovimentacao}
        valorMovimentacao={valorMovimentacao}
        setValorMovimentacao={setValorMovimentacao}
        descricaoMovimentacao={descricaoMovimentacao}
        setDescricaoMovimentacao={setDescricaoMovimentacao}
        dataMovimentacao={dataMovimentacao}
        setDataMovimentacao={setDataMovimentacao}
        horaMovimentacao={horaMovimentacao}
        setHoraMovimentacao={setHoraMovimentacao}
        fechamentos={fechamentos}
        fechamentoSelecionadoId={fechamentoSelecionadoId}
        setFechamentoSelecionadoId={setFechamentoSelecionadoId}
        cadastrarMovimentacao={cadastrarMovimentacao}
      />

      <MovimentacaoList
        movimentacoes={movimentacoes}
        excluirMovimentacao={excluirMovimentacao}
      />

    </main>
  );
}

export default App;