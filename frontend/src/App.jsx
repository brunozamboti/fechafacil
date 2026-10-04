import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [nomeCaixa, setNomeCaixa] = useState('');
  const [caixas, setCaixas] = useState([]);
  const [caixaEditandoId, setCaixaEditandoId] = useState(null);

  useEffect(() => {
    carregarCaixas();
  }, []);

  async function carregarCaixas() {
    const resposta = await fetch('http://localhost:8080/caixas');
    const dados = await resposta.json();

    setCaixas(dados);
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

  function iniciarEdicao(caixa) {
    setCaixaEditandoId(caixa.id);
    setNomeCaixa(caixa.nome);
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

      <section>
        <h2>Caixas</h2>

        <form onSubmit={cadastrarCaixa}>
          <label htmlFor="nomeCaixa">Nome do caixa</label>

          <input
            id="nomeCaixa"
            type="text"
            placeholder="Ex.: Caixa 01"
            value={nomeCaixa}
            onChange={(event) => setNomeCaixa(event.target.value)}
          />

          <button type="submit">
            {caixaEditandoId === null ? 'Cadastrar' : 'Salvar'}
          </button>
        </form>

        <h3>Caixas cadastrados</h3>

        {caixas.length === 0 ? (
          <p>Nenhum caixa cadastrado.</p>
        ) : (
          <ul>
            {caixas.map((caixa) => (
              <li key={caixa.id}>
                {caixa.nome}

                <button
                  type="button"
                  onClick={() => iniciarEdicao(caixa)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => excluirCaixa(caixa.id)}
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;