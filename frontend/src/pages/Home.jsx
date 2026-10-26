import './Home.css';
import logoFechaFacil from '../assets/logo-fechafacil.png';
import HeaderHome from '../components/HeaderHome';

function Home({ onAcessarSistema }) {
    return (
        <div className="home">
            <HeaderHome onAcessarSistema={onAcessarSistema} />
            <section id="inicio" className="home-hero">
                <div className="home-hero-conteudo">
                    <p className="home-destaque">
                        Fechamento de caixa mais simples
                    </p>

                    <h1>
                        Seu caixa organizado,
                        do inicio ao fechamento.
                    </h1>

                    <p Classname="home-descricao">
                        Registre movimentações, confira o dinheiro
                        e identifique diferenças com mais práticidade.
                    </p>

                    <button
                        type="button"
                        onClick={onAcessarSistema}
                    >
                        Acessar o sistema
                    </button>
                </div>

                <div className="home-hero-logo">
                    <img
                        src={logoFechaFacil}
                        alt="Logo do FechaFácil"
                    />
                </div>
            </section>
            <section id="beneficios" className="home-beneficios">
                <div className="home-beneficios-cabecalho">
                    <p className="home-secao-destaque">
                        Mais organização no dia a dia
                    </p>

                    <h2>
                        Por que usar o FechaFácil?
                    </h2>

                    <p>
                        Uma forma mais simples de acompanhar o caixa,
                        conferir valores e manter o histórico organizado.
                    </p>
                </div>

                <div className="home-beneficios-grid">
                    <article className="beneficio-card">
                        <div className="beneficio-icone">
                            ↕
                        </div>

                        <h3>Organização das movimentações</h3>

                        <p>
                            Centralize entradas, saídas, reforços e sangrias
                            durante a sessão de caixa.
                        </p>
                    </article>

                    <article className="beneficio-card">
                        <div className="beneficio-icone">
                            ✓
                        </div>

                        <h3>Conferência simplificada</h3>

                        <p>
                            Compare o valor esperado com o valor realmente
                            contado de forma clara e prática.
                        </p>
                    </article>

                    <article className="beneficio-card">
                        <div className="beneficio-icone">
                            ↺
                        </div>

                        <h3>Histórico dos fechamentos</h3>

                        <p>
                            Consulte sessões anteriores e acompanhe as
                            diferenças registrada nos fechamentos.
                        </p>
                    </article>
                </div>
            </section>
            <section id="como-funciona" className="home-como-funciona">
                <div className="home-como-funciona-cabecalho">
                    <p className="home-secao-destaque">
                        Um fluxo simples
                    </p>

                    <h2>
                        Como funciona?
                    </h2>

                    <p>
                        O FechaFácil acompanha o processo desde a abertura
                        até a conferência final do caixa.
                    </p>
                </div>

                <div className="home-passos">
                    <article className="passo-card">
                        <span className="passo-numero">1</span>

                        <h3>Abra seu caixa</h3>

                        <p>
                            Escolha o caixa, informe o valor inicial
                            e registre o horário de abertura.
                        </p>
                    </article>

                    <article className="passo-card">
                        <span className="passo-numero">2</span>

                        <h3>Registre as movimentações</h3>

                        <p>
                            Acompanhe entradas, saídas, reforços e sangrias
                            durante a sessão.
                        </p>
                    </article>

                    <article className="passo-card">
                        <span className="passo-numero">3</span>

                        <h3>Confira e finalize</h3>

                        <p>
                            Conte o dinheiro, compare com o valor esperado
                            e finalize o fechamento.
                        </p>
                    </article>
                </div>
            </section>

            <section id="solucao" className="home-problema">
                <div className="home-problema-conteudo">
                    <div className="home-problema-texto">
                        <p className="home-secao-destaque">
                            Menos complicação no fechamento
                        </p>

                        <h2>
                            Conferir o caixa não precisa ser um processo confuso.
                        </h2>

                        <p>
                            Quando o controle é feito manualmente, informações podem
                            ficar espalhadas e a conferência dos valores pode exigir
                            mais atenção e tempo.
                        </p>

                        <p>
                            O FechaFácil reúne abertura, movimentações, contagem
                            e fechamento em um único fluxo, deixando a conferência
                            mais organizada e fácil de acompanhar.
                        </p>
                    </div>

                    <div className="home-problema-pontos">
                        <article className="problema-ponto">
                            <span>01</span>

                            <div>
                                <h3>Movimentações organizadas</h3>

                                <p>
                                    Entradas, saídas, reforços e sangrias ficam
                                    registradas durante a sessão.
                                </p>
                            </div>
                        </article>

                        <article className="problema-ponto">
                            <span>02</span>

                            <div>
                                <h3>Esperado e contado lado a lado</h3>

                                <p>
                                    O fechamento facilita a comparação entre o valor
                                    esperado e o dinheiro realmente contado.
                                </p>
                            </div>
                        </article>

                        <article className="problema-ponto">
                            <span>03</span>

                            <div>
                                <h3>Diferenças mais visíveis</h3>

                                <p>
                                    O sistema destaca quando há falta, igualdade
                                    ou sobra no fechamento.
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section className="home-cta">
                <div className="home-cta-conteudo">
                    <p className="home-secao-destaque">
                        Pronto para começar?
                    </p>

                    <h2>
                        Organize seu caixa do início ao fechamento.
                    </h2>

                    <p>
                        Acesse o FechaFácil e acompanhe suas movimentações,
                        confira os valores e finalize o caixa com mais praticidade.
                    </p>

                    <button
                        type="button"
                        onClick={onAcessarSistema}
                    >
                        Acessar o sistema
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Home;