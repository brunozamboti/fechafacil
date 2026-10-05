function CaixaList({

    caixas,
    iniciarEdicao,
    excluirCaixa

}) {
    return (
        <div>

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
        </div>
    )
}

export default CaixaList