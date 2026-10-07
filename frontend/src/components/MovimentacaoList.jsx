function MovimentacaoList({ movimentacoes }) {
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
                            Valor: R$ {movimentacao.valor} |
                            Descrição: {movimentacao.descricao} |
                            Data: {movimentacao.dataHora} |
                            Fechamento: {movimentacao.fechamento?.id}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MovimentacaoList;