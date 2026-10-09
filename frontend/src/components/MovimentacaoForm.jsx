function MovimentacaoForm({
    tipoMovimentacao,
    setTipoMovimentacao,
    valorMovimentacao,
    setValorMovimentacao,
    descricaoMovimentacao,
    setDescricaoMovimentacao,
    dataMovimentacao,
    setDataMovimentacao,
    horaMovimentacao,
    setHoraMovimentacao,
    fechamentosAbertos,
    caixaMovimentacaoId,
    setCaixaMovimentacaoId,
    movimentacaoEditandoId,
    cadastrarMovimentacao
}) {
    return (
        <div className="movimentacao-form">
            <h2>Registrar movimentação</h2>

            <form onSubmit={cadastrarMovimentacao}>

                <div className="campo">
                    <label htmlFor="tipoMovimentacao">
                        Tipo
                    </label>

                    <select
                        id="tipoMovimentacao"
                        value={tipoMovimentacao}
                        onChange={(event) =>
                            setTipoMovimentacao(event.target.value)
                        }
                    >
                        <option value="ENTRADA">Entrada</option>
                        <option value="SAIDA">Saída</option>
                        <option value="SANGRIA">Sangria</option>
                        <option value="REFORCO">Reforço</option>
                    </select>
                </div>

                <div className="campo">
                    <label htmlFor="valorMovimentacao">
                        Valor
                    </label>

                    <div className="campo-valor">
                        <span>R$</span>

                        <input
                            id="valorMovimentacao"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="Ex.: 50.00"
                            value={valorMovimentacao}
                            onChange={(event) =>
                                setValorMovimentacao(event.target.value)
                            }
                        />
                    </div>
                </div>

                <div className="campo">
                    <label htmlFor="descricaoMovimentacao">
                        Descrição
                    </label>

                    <input
                        id="descricaoMovimentacao"
                        type="text"
                        placeholder="Ex.: Venda em dinheiro"
                        value={descricaoMovimentacao}
                        onChange={(event) =>
                            setDescricaoMovimentacao(event.target.value)
                        }
                    />
                </div>

                <div className="campo">
                    <label htmlFor="caixaMovimentacao">
                        Caixa
                    </label>

                    <select
                        id="caixaMovimentacao"
                        value={caixaMovimentacaoId}
                        onChange={(event) =>
                            setCaixaMovimentacaoId(event.target.value)
                        }
                    >
                        <option value="">
                            Selecione um caixa aberto
                        </option>

                        {fechamentosAbertos.map((fechamento) => (
                            <option
                                key={fechamento.id}
                                value={fechamento.caixa?.id}
                            >
                                {fechamento.caixa?.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="linha-data-hora">
                    <div className="campo">
                        <label htmlFor="dataMovimentacao">
                            Data
                        </label>

                        <input
                            id="dataMovimentacao"
                            type="date"
                            value={dataMovimentacao}
                            onChange={(event) =>
                                setDataMovimentacao(event.target.value)
                            }
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="horaMovimentacao">
                            Hora
                        </label>

                        <input
                            id="horaMovimentacao"
                            type="time"
                            value={horaMovimentacao}
                            onChange={(event) =>
                                setHoraMovimentacao(event.target.value)
                            }
                        />
                    </div>
                </div>

                <button type="submit">
                    {movimentacaoEditandoId !== null
                        ? 'Salvar'
                        : 'Cadastrar movimentação'}
                </button>
            </form>
        </div>
    );
}
    export default MovimentacaoForm;