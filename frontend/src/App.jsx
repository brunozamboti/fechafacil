import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [nomeCaixa, setNomeCaixa] = useState('');
  const [caixas, setCaixas] = useState([]);

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

          <button type="submit">Cadastrar</button>
        </form>

        <h3>Caixas cadastrados</h3>

        {caixas.length === 0 ? (
          <p>Nenhum caixa cadastrado.</p>
        ) : (
          <ul>
            {caixas.map((caixa) => (
              <li key={caixa.id}>{caixa.nome}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;