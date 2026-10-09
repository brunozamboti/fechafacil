import formatarMoeda from '../utils/formatarMoeda';
import formatarDataHora from '../utils/formatarDataHora';

function FechamentoList({
    fechamentos,
    excluirFechamento,
    iniciarEdicaoFechamento
}) {

    const fechamentosOrdenados = [...fechamentos].sort((a, b) => {
        const aAberto = !a.dataHoraFechamento;
        const bAberto = !b.dataHoraFechamento;

        if (aAberto !== bAberto) {
            return aAberto ? -1 : 1;
        }

        return b.dataHoraAbertura.localeCompare(a.dataHoraAbertura);
    });

    return (
        <div className="fechamento-list">
            <h3>Histórico de caixas</h3>

            {fechamentos.length === 0 ? (
                <p>Nenhum histórico de caixa cadastrado.</p>
            ) : (
                <div className="historico-fechamentos">
                    {fechamentosOrdenados.map((fechamento) => (
                        <article
                            className="fechamento-item"
                            key={fechamento.id}
                        >
                            <div className="fechamento-topo">
                                <strong>
                                    {fechamento.caixa?.nome}
                                </strong>

                                <span
                                    className={
                                        fechamento.dataHoraFechamento
                                            ? 'status status-fechado'
                                            : 'status status-aberto'
                                    }
                                >
                                    {fechamento.dataHoraFechamento
                                        ? 'Fechado'
                                        : 'Aberto'}
                                </span>
                            </div>

                            <div className="fechamento-resumo">
                                <span>
                                    <strong>Abertura:</strong>{' '}
                                    {formatarMoeda(fechamento.valorAbertura)}
                                </span>

                                <span>
                                    <strong>Data:</strong>{' '}
                                    {formatarDataHora(fechamento.dataHoraAbertura)}
                                </span>
                            </div>

                            {fechamento.dataHoraFechamento && (
                                <div className="fechamento-valores">
                                    <span>
                                        <strong>Esperado:</strong>{' '}
                                        {formatarMoeda(fechamento.valorEsperado)}
                                    </span>

                                    <span>
                                        <strong>Contado:</strong>{' '}
                                        {formatarMoeda(fechamento.valorContado)}
                                    </span>

                                    <span>
                                        <strong>Diferença:</strong>{' '}
                                        {formatarMoeda(fechamento.diferenca)}
                                    </span>
                                </div>
                            )}

                            {!fechamento.dataHoraFechamento && (
                                <div className="fechamento-acoes">
                                    <button
                                        className="botao-fechar"
                                        type="button"
                                        onClick={() =>
                                            iniciarEdicaoFechamento(fechamento)
                                        }
                                    >
                                        Fechar caixa
                                    </button>

                                    <button
                                        className="botao-excluir"
                                        type="button"
                                        onClick={() =>
                                            excluirFechamento(fechamento.id)
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

export default FechamentoList;