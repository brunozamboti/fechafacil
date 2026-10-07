import formatarMoeda from '../utils/formatarMoeda';

function MovimentacaoList({
    movimentacoes,
    excluirMovimentacao,
    iniciarEdicaoMovimentacao
}) {
    return (
        <div>
            <h3>Movimentações Cadastradas</h3>

            {movimentacoes.length === 0 ? (
                <p>Nenhuma movimentação cadastrada.</p>
            ) : (
                <ul>
                    {movimentacoes.map((movimentacao) => (
                        <li key={movimentacao.id}>
                            Tipo: {movimentacao.tipo} |
                            Valor: {formatarMoeda(movimentacao.valor)} |
                            Descrição: {movimentacao.descricao} |
                            Data: {movimentacao.dataHora} |
                            Fechamento: {movimentacao.fechamento?.id}

                            <button
                                type="button"
                                onClick={() => iniciarEdicaoMovimentacao(movimentacao)}
                            >
                                Editar
                            </button>

                            <button
                                type="button"
                                onClick={() => excluirMovimentacao(movimentacao.id)}
                            >
                                Excluir
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MovimentacaoList;