import { useState } from 'react';
import ContadorDinheiro from './ContadorDinheiro';
import formatarMoeda from '../utils/formatarMoeda';

function FechamentoForm({
    caixas,
    caixaFechamentoId,
    setCaixaFechamentoId,
    valorAberturaFechamento,
    setValorAberturaFechamento,
    dataAberturaFechamento,
    setDataAberturaFechamento,
    horaAberturaFechamento,
    setHoraAberturaFechamento,
    cadastrarFechamento,
    fechamentoEditandoId,
    dataFechamento,
    setDataFechamento,
    horaFechamento,
    setHoraFechamento,
    valorEsperadoFechamento,
    valorContadoFechamento,
    setValorContadoFechamento
}) {
    const [contadorAberto, setContadorAberto] = useState(false);

    return (
        <div className="fechamento-form">
            <h2>Abrir / fechar caixa</h2>

            <form onSubmit={cadastrarFechamento}>

                <div className="campo">
                    <label htmlFor="caixaFechamento">Caixa</label>

                    <select
                        id="caixaFechamento"
                        value={caixaFechamentoId}
                        onChange={(event) =>
                            setCaixaFechamentoId(event.target.value)
                        }
                        disabled={fechamentoEditandoId !== null}
                    >
                        <option value="">Selecione um caixa</option>

                        {caixas.map((caixa) => (
                            <option key={caixa.id} value={caixa.id}>
                                {caixa.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="campo">
                    <label htmlFor="valorAberturaFechamento">
                        Valor de abertura
                    </label>

                    <div className="campo-valor">
                        <span>R$</span>

                        <input
                            id="valorAberturaFechamento"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="Ex.: 100.00"
                            value={valorAberturaFechamento}
                            onChange={(event) =>
                                setValorAberturaFechamento(event.target.value)
                            }
                            disabled={fechamentoEditandoId !== null}
                        />
                    </div>
                </div>

                <div className="linha-data-hora">
                    <div className="campo">
                        <label htmlFor="dataAberturaFechamento">
                            Data
                        </label>

                        <input
                            id="dataAberturaFechamento"
                            type="date"
                            value={dataAberturaFechamento}
                            onChange={(event) =>
                                setDataAberturaFechamento(event.target.value)
                            }
                            disabled={fechamentoEditandoId !== null}
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="horaAberturaFechamento">
                            Hora
                        </label>

                        <input
                            id="horaAberturaFechamento"
                            type="time"
                            value={horaAberturaFechamento}
                            onChange={(event) =>
                                setHoraAberturaFechamento(event.target.value)
                            }
                            disabled={fechamentoEditandoId !== null}
                        />
                    </div>
                </div>

                {fechamentoEditandoId !== null && (
                    <>
                        <div className="linha-data-hora">
                            <div className="campo">
                                <label htmlFor="dataFechamento">
                                    Data de fechamento
                                </label>

                                <input
                                    id="dataFechamento"
                                    type="date"
                                    value={dataFechamento}
                                    onChange={(event) =>
                                        setDataFechamento(event.target.value)
                                    }
                                />
                            </div>

                            <div className="campo">
                                <label htmlFor="horaFechamento">
                                    Hora de fechamento
                                </label>

                                <input
                                    id="horaFechamento"
                                    type="time"
                                    value={horaFechamento}
                                    onChange={(event) =>
                                        setHoraFechamento(event.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="campo">
                            <label>Valor esperado</label>

                            <div className="valor-calculado">
                                {formatarMoeda(valorEsperadoFechamento)}
                            </div>
                        </div>

                        <div className="campo">
                            <label htmlFor="valorContadoFechamento">
                                Valor contado
                            </label>

                            <div className="campo-valor">
                                <span>R$</span>

                                <input
                                    id="valorContadoFechamento"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="Ex.: 495.00"
                                    value={valorContadoFechamento}
                                    onChange={(event) =>
                                        setValorContadoFechamento(event.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            className="botao-contar-dinheiro"
                            onClick={() => setContadorAberto(true)}
                        >
                            🧮 Contar dinheiro
                        </button>

                        {valorContadoFechamento !== '' && (
                            <div className="campo">
                                <label>Diferença</label>

                                <div
                                    className={`valor-calculado ${Number(valorContadoFechamento) -
                                            Number(valorEsperadoFechamento) < 0
                                            ? 'diferenca-negativa'
                                            : Number(valorContadoFechamento) -
                                                Number(valorEsperadoFechamento) > 0
                                                ? 'diferenca-positiva'
                                                : 'diferenca-zero'
                                        }`}
                                >
                                    {formatarMoeda(
                                        Number(valorContadoFechamento) -
                                        Number(valorEsperadoFechamento)
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}

                <button type="submit">
                    {fechamentoEditandoId !== null
                        ? 'Fechar caixa'
                        : 'Abrir caixa'}
                </button>
            </form>
            <ContadorDinheiro
                aberto={contadorAberto}
                onFechar={() => setContadorAberto(false)}
                onUsarValor={(valor) =>
                    setValorContadoFechamento(valor.toFixed(2))
                }
            />
        </div>
    );
}

export default FechamentoForm;