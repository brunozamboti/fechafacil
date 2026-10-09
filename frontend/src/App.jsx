import { useEffect, useState } from 'react';
import './App.css';
import CaixaForm from './components/CaixaForm';
import CaixaList from './components/CaixaList';
import MovimentacaoForm from './components/MovimentacaoForm';
import MovimentacaoList from './components/MovimentacaoList';
import FechamentoForm from './components/FechamentoForm';
import FechamentoList from './components/FechamentoList';

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
  const [movimentacaoEditandoId, setMovimentacaoEditandoId] = useState(null);
  const [caixaMovimentacaoId, setCaixaMovimentacaoId] = useState('');

  const [fechamentos, setFechamentos] = useState([]);

  const [caixaFechamentoId, setCaixaFechamentoId] = useState('');
  const [valorAberturaFechamento, setValorAberturaFechamento] = useState('');
  const [dataAberturaFechamento, setDataAberturaFechamento] = useState('');
  const [horaAberturaFechamento, setHoraAberturaFechamento] = useState('');
  const [fechamentoEditandoId, setFechamentoEditandoId] = useState(null);
  const [dataFechamento, setDataFechamento] = useState('');
  const [horaFechamento, setHoraFechamento] = useState('');
  const [valorEsperadoFechamento, setValorEsperadoFechamento] = useState('');
  const [valorContadoFechamento, setValorContadoFechamento] = useState('');
  const fechamentosAbertos = fechamentos.filter(
    (fechamento) => !fechamento.dataHoraFechamento
  );

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

    const fechamentoAbertoSelecionado = fechamentosAbertos.find(
      (fechamento) =>
        String(fechamento.caixa?.id) === caixaMovimentacaoId
    );

    if (
      valorMovimentacao === '' ||
      dataMovimentacao === '' ||
      horaMovimentacao === '' ||
      !fechamentoAbertoSelecionado
    ) {
      return;
    }

    const dataHora = `${dataMovimentacao}T${horaMovimentacao}:00`;

    if (movimentacaoEditandoId !== null) {
      const resposta = await fetch(
        `http://localhost:8080/movimentacoes/${movimentacaoEditandoId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            tipo: tipoMovimentacao,
            valor: Number(valorMovimentacao),
            descricao: descricaoMovimentacao.trim(),
            dataHora: dataHora
          })
        }
      );

      const movimentacaoAtualizada = await resposta.json();

      setMovimentacoes(
        movimentacoes.map((movimentacao) =>
          movimentacao.id === movimentacaoEditandoId
            ? movimentacaoAtualizada
            : movimentacao
        )
      );

      setTipoMovimentacao('ENTRADA');
      setValorMovimentacao('');
      setDescricaoMovimentacao('');
      setDataMovimentacao('');
      setHoraMovimentacao('');
      setCaixaMovimentacaoId('');
      setMovimentacaoEditandoId(null);

      return;
    }

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
          id: fechamentoAbertoSelecionado.id
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
    setCaixaMovimentacaoId('');
  }

  async function cadastrarFechamento(event) {
    event.preventDefault();

    if (fechamentoEditandoId !== null) {
      if (
        dataFechamento === '' ||
        horaFechamento === '' ||
        valorEsperadoFechamento === '' ||
        valorContadoFechamento === ''
      ) {
        return;
      }

      const dataHoraFechamento =
        `${dataFechamento}T${horaFechamento}:00`;

      const diferenca = Number(
        (
          Number(valorContadoFechamento) -
          Number(valorEsperadoFechamento)
        ).toFixed(2)
      );

      const resposta = await fetch(
        `http://localhost:8080/fechamentos/${fechamentoEditandoId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            dataHoraFechamento: dataHoraFechamento,
            valorEsperado: Number(valorEsperadoFechamento),
            valorContado: Number(valorContadoFechamento),
            diferenca: diferenca
          })
        }
      );

      const fechamentoAtualizado = await resposta.json();

      setFechamentos(
        fechamentos.map((fechamento) =>
          fechamento.id === fechamentoEditandoId
            ? fechamentoAtualizado
            : fechamento
        )
      );

      setCaixaFechamentoId('');
      setValorAberturaFechamento('');
      setDataAberturaFechamento('');
      setHoraAberturaFechamento('');

      setDataFechamento('');
      setHoraFechamento('');
      setValorEsperadoFechamento('');
      setValorContadoFechamento('');

      setFechamentoEditandoId(null);

      return;
    }

    const caixaJaPossuiFechamentoAberto = fechamentosAbertos.some(
      (fechamento) =>
        String(fechamento.caixa?.id) === caixaFechamentoId
    );

    if (caixaJaPossuiFechamentoAberto) {
      alert('Este caixa já está aberto.');
      return;
    }

    if (
      caixaFechamentoId === '' ||
      valorAberturaFechamento === '' ||
      dataAberturaFechamento === '' ||
      horaAberturaFechamento === ''
    ) {
      return;
    }

    const dataHoraAbertura =
      `${dataAberturaFechamento}T${horaAberturaFechamento}:00`;

    const resposta = await fetch('http://localhost:8080/fechamentos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dataHoraAbertura: dataHoraAbertura,
        valorAbertura: Number(valorAberturaFechamento),
        caixa: {
          id: Number(caixaFechamentoId)
        }
      })
    });

    const novoFechamento = await resposta.json();

    setFechamentos([...fechamentos, novoFechamento]);

    setCaixaFechamentoId('');
    setValorAberturaFechamento('');
    setDataAberturaFechamento('');
    setHoraAberturaFechamento('');
  }

  function calcularValorEsperado(fechamento) {
    const movimentacoesDoFechamento = movimentacoes.filter(
      (movimentacao) =>
        movimentacao.fechamento?.id === fechamento.id
    );

    const valorEsperado = movimentacoesDoFechamento.reduce(
      (total, movimentacao) => {
        const valor = Number(movimentacao.valor);

        switch (movimentacao.tipo) {
          case 'ENTRADA':
          case 'REFORCO':
            return total + valor;

          case 'SAIDA':
          case 'SANGRIA':
            return total - valor;

          default:
            return total;
        }
      },
      Number(fechamento.valorAbertura)
    );

    return Number(valorEsperado.toFixed(2));
  }

  function iniciarEdicaoFechamento(fechamento) {
    setFechamentoEditandoId(fechamento.id);

    setCaixaFechamentoId(String(fechamento.caixa?.id ?? ''));
    setValorAberturaFechamento(String(fechamento.valorAbertura ?? ''));

    if (fechamento.dataHoraAbertura) {
      const [dataAbertura, horaAbertura] =
        fechamento.dataHoraAbertura.split('T');

      setDataAberturaFechamento(dataAbertura);
      setHoraAberturaFechamento(horaAbertura.slice(0, 5));
    }

    if (fechamento.dataHoraFechamento) {
      const [data, hora] = fechamento.dataHoraFechamento.split('T');

      setDataFechamento(data);
      setHoraFechamento(hora.slice(0, 5));
    } else {
      setDataFechamento('');
      setHoraFechamento('');
    }

    const valorEsperado = calcularValorEsperado(fechamento);

    setValorEsperadoFechamento(String(valorEsperado));

    setValorContadoFechamento(
      fechamento.valorContado !== null
        ? String(fechamento.valorContado)
        : ''
    );
  }

  function iniciarEdicaoMovimentacao(movimentacao) {
    const [data, horaCompleta] = movimentacao.dataHora.split('T');

    setMovimentacaoEditandoId(movimentacao.id);
    setTipoMovimentacao(movimentacao.tipo);
    setValorMovimentacao(String(movimentacao.valor));
    setDescricaoMovimentacao(movimentacao.descricao);
    setDataMovimentacao(data);
    setHoraMovimentacao(horaCompleta.slice(0, 5));
    setCaixaMovimentacaoId(
      String(movimentacao.fechamento?.caixa?.id ?? '')
    );
  }

  function iniciarEdicao(caixa) {
    setCaixaEditandoId(caixa.id);
    setNomeCaixa(caixa.nome);
  }

  async function excluirFechamento(id) {
    const resposta = await fetch(
      `http://localhost:8080/fechamentos/${id}`,
      {
        method: 'DELETE'
      }
    );

    if (!resposta.ok) {
      alert('Não foi possível excluir o fechamento.');
      return;
    }

    setFechamentos(
      fechamentos.filter((fechamento) => fechamento.id !== id)
    );
  }
  async function excluirMovimentacao(id) {
    const resposta = await fetch(
      `http://localhost:8080/movimentacoes/${id}`,
      {
        method: 'DELETE'
      }
    );

    if (!resposta.ok) {
      alert('Não foi possível excluir a movimentação.');
      return;
    }

    setMovimentacoes(
      movimentacoes.filter((movimentacao) => movimentacao.id !== id)
    );
  }


  async function excluirCaixa(id) {
    const resposta = await fetch(
      `http://localhost:8080/caixas/${id}`,
      {
        method: 'DELETE'
      }
    );

    if (!resposta.ok) {
      alert('Não foi possível excluir o caixa.');
      return;
    }

    setCaixas(
      caixas.filter((caixa) => caixa.id !== id)
    );
  }
  return (
    <main>
      <header>
        <h1>FechaFácil</h1>
        <p>Sistema de apoio ao fechamento e conferência de caixa.</p>
      </header>

      <section className="card-modulo card-caixas">
        <CaixaForm
          nomeCaixa={nomeCaixa}
          setNomeCaixa={setNomeCaixa}
          caixaEditandoId={caixaEditandoId}
          cadastrarCaixa={cadastrarCaixa}
        />

        <CaixaList
          caixas={caixas}
          iniciarEdicao={iniciarEdicao}
          excluirCaixa={excluirCaixa}
        />
      </section>

      <section className="card-modulo card-fechamentos">
        <FechamentoForm
          caixas={caixas}
          caixaFechamentoId={caixaFechamentoId}
          setCaixaFechamentoId={setCaixaFechamentoId}
          valorAberturaFechamento={valorAberturaFechamento}
          setValorAberturaFechamento={setValorAberturaFechamento}
          dataAberturaFechamento={dataAberturaFechamento}
          setDataAberturaFechamento={setDataAberturaFechamento}
          horaAberturaFechamento={horaAberturaFechamento}
          setHoraAberturaFechamento={setHoraAberturaFechamento}
          cadastrarFechamento={cadastrarFechamento}

          fechamentoEditandoId={fechamentoEditandoId}

          dataFechamento={dataFechamento}
          setDataFechamento={setDataFechamento}

          horaFechamento={horaFechamento}
          setHoraFechamento={setHoraFechamento}

          valorEsperadoFechamento={valorEsperadoFechamento}

          valorContadoFechamento={valorContadoFechamento}
          setValorContadoFechamento={setValorContadoFechamento}
        />

        <FechamentoList
          fechamentos={fechamentos}
          excluirFechamento={excluirFechamento}
          iniciarEdicaoFechamento={iniciarEdicaoFechamento}
        />
      </section>

      <section className="card-modulo card-movimentacoes">
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

          fechamentosAbertos={fechamentosAbertos}
          caixaMovimentacaoId={caixaMovimentacaoId}
          setCaixaMovimentacaoId={setCaixaMovimentacaoId}


          movimentacaoEditandoId={movimentacaoEditandoId}
          cadastrarMovimentacao={cadastrarMovimentacao}
        />

        <MovimentacaoList
          movimentacoes={movimentacoes}
          excluirMovimentacao={excluirMovimentacao}
          iniciarEdicaoMovimentacao={iniciarEdicaoMovimentacao}
        />
      </section>

    </main>
  );
}

export default App;