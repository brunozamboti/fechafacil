import formatarMoeda from '../utils/formatarMoeda';
import formatarDataHora from '../utils/formatarDataHora';

function MovimentacaoList({
    movimentacoes,
    excluirMovimentacao,
    iniciarEdicaoMovimentacao
}) {

    const nomesTipos = {
        ENTRADA: 'Entrada',
        SAIDA: 'Saída',
        SANGRIA: 'Sangria',
        REFORCO: 'Reforço'
    };

    const movimentacoesOrdenadas = [...movimentacoes].sort((a, b) => {
        const aAberta = !a.fechamento?.dataHoraFechamento;
        const bAberta = !b.fechamento?.dataHoraFechamento;

        if (aAberta !== bAberta) {
            return aAberta ? -1 : 1;
        }

        return b.dataHora.localeCompare(a.dataHora);
    });

    return (
        <div className="movimentacao-list">

            <h3>Histórico de movimentações</h3>

            {movimentacoes.length === 0 ? (
                <p>Nenhuma movimentação cadastrada.</p>
            ) : (
                <div className="historico-movimentacoes">

                    {movimentacoesOrdenadas.map((movimentacao) => (

                        <article
                            className="movimentacao-item"
                            key={movimentacao.id}
                        >

                            <div className="movimentacao-topo">

                                <span
                                    className={`tipo-movimentacao tipo-${movimentacao.tipo.toLowerCase()}`}
                                >
                                    {nomesTipos[movimentacao.tipo]}
                                </span>

                                <strong className="movimentacao-valor">
                                    {formatarMoeda(movimentacao.valor)}
                                </strong>

                            </div>

                            <div className="movimentacao-detalhes">

                                <span>
                                    <strong>Descrição:</strong>{' '}
                                    {movimentacao.descricao || 'Sem descrição'}
                                </span>

                                <span>
                                    <strong>Caixa:</strong>{' '}
                                    {movimentacao.fechamento?.caixa?.nome}
                                </span>

                                <span>
                                    <strong>Data:</strong>{' '}
                                    {formatarDataHora(movimentacao.dataHora)}
                                </span>

                            </div>

                            {!movimentacao.fechamento?.dataHoraFechamento && (

                                <div className="movimentacao-acoes">

                                    <button
                                        className="botao-editar"
                                        type="button"
                                        onClick={() =>
                                            iniciarEdicaoMovimentacao(movimentacao)
                                        }
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="botao-excluir"
                                        type="button"
                                        onClick={() =>
                                            excluirMovimentacao(movimentacao.id)
                                        }
                                    >
                                        Excluir
                                    </button>

                                </div>

                            )}

                        </article>

                    ))}

                </div>
            )}

        </div>
    );
}

export default MovimentacaoList;