function CaixaList({
    caixas,
    iniciarEdicao,
    excluirCaixa
}) {
    return (
        <div className="caixa-list">

            <h3>Caixas cadastrados</h3>

            {caixas.length === 0 ? (
                <p>Nenhum caixa cadastrado.</p>
            ) : (
                <ul>
                    {caixas.map((caixa) => (
                        <li key={caixa.id}>
                            <span className="caixa-nome">
                                {caixa.nome}
                            </span>

                            <div className="caixa-acoes">
                                <button
                                    className="botao-editar"
                                    type="button"
                                    onClick={() => iniciarEdicao(caixa)}
                                >
                                    Editar
                                </button>

                                <button
                                    className="botao-excluir"
                                    type="button"
                                    onClick={() => excluirCaixa(caixa.id)}
                                >
                                    Excluir
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CaixaList;