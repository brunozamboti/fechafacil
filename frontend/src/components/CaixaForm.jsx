function CaixaForm({
    nomeCaixa,
    setNomeCaixa,
    caixaEditandoId,
    cadastrarCaixa
}) {
    return (
        <div className="CaixaForm">

            <h2>Formulário de Caixa</h2>

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
        </div>

    )
}

export default CaixaForm