import formatarMoeda from '../utils/formatarMoeda';

function FechamentoList({
    fechamentos,
    excluirFechamento,
    iniciarEdicaoFechamento
}) {
    return (
        <div>
            <h3>Fechamentos Cadastrados</h3>

            {fechamentos.length === 0 ? (
                <p>Nenhum fechamento cadastrado.</p>
            ) : (
                <ul>
                    {fechamentos.map((fechamento) => (
                        <li key={fechamento.id}>
                            Fechamento: {fechamento.id} |
                            Caixa: {fechamento.caixa?.nome} |
                            Valor de abertura: {formatarMoeda(fechamento.valorAbertura)} |
                            Data de abertura: {fechamento.dataHoraAbertura}

                            <button
                                type="button"
                                onClick={() => iniciarEdicaoFechamento(fechamento)}
                            >
                                Fechar caixa
                            </button>

                            <button
                                type="button"
                                onClick={() => excluirFechamento(fechamento.id)}
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

export default FechamentoList;