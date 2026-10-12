import { useState } from 'react';
import formatarMoeda from '../utils/formatarMoeda';

function ContadorDinheiro({
    aberto,
    onFechar,
    onUsarValor
}) {

    const cedulas = [200, 100, 50, 20, 10, 5, 2];
    const moedas = [1, 0.50, 0.25, 0.10, 0.05];

    const [quantidades, setQuantidades] = useState({});

    if (!aberto) {
        return null;
    }

    function alterarQuantidade(valor, quantidade) {
        setQuantidades({
            ...quantidades,
            [valor]: quantidade
        });
    }

    function calcularTotal() {
        const valores = [...cedulas, ...moedas];

        return valores.reduce((total, valor) => {
            const quantidade = Number(quantidades[valor] || 0);

            return total + valor * quantidade;
        }, 0);
    }

    const total = calcularTotal();

    function usarValor() {
        onUsarValor(total);
        setQuantidades({});
        onFechar();
    }

    return (
        <div className="modal-overlay">
            <div className="modal-contador">

                <div className="modal-cabecalho">
                    <h2>Contar dinheiro</h2>

                    <button
                        type="button"
                        className="botao-fechar-modal"
                        onClick={onFechar}
                    >
                        ×
                    </button>
                </div>

                <p>
                    Informe a quantidade de notas e moedas para calcular
                    o valor contado.
                </p>

                <div className="contador-grupos">

                    <div className="contador-grupo">
                        <h3>Cédulas</h3>

                        {cedulas.map((valor) => (
                            <div
                                className="contador-linha"
                                key={valor}
                            >
                                <span>
                                    {formatarMoeda(valor)}
                                </span>

                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    placeholder="0"
                                    value={quantidades[valor] || ''}
                                    onChange={(event) =>
                                        alterarQuantidade(
                                            valor,
                                            event.target.value
                                        )
                                    }
                                />
                            </div>
                        ))}
                    </div>

                    <div className="contador-grupo">
                        <h3>Moedas</h3>

                        {moedas.map((valor) => (
                            <div
                                className="contador-linha"
                                key={valor}
                            >
                                <span>
                                    {formatarMoeda(valor)}
                                </span>

                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    placeholder="0"
                                    value={quantidades[valor] || ''}
                                    onChange={(event) =>
                                        alterarQuantidade(
                                            valor,
                                            event.target.value
                                        )
                                    }
                                />
                            </div>
                        ))}
                    </div>

                </div>

                <div className="contador-total">
                    <span>Total contado</span>

                    <strong>
                        {formatarMoeda(total)}
                    </strong>
                </div>

                <button
                type= "button"
                className="botao-usar-valor"
                onClick={usarValor}
                >
                    Usar este valor
                </button>
            </div>
        </div>
    );
}

export default ContadorDinheiro;