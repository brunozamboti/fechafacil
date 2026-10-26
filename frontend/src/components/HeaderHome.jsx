import logoFechaFacil from '../assets/logo-fechafacil.png';

function HeaderHome({ onAcessarSistema }) {
    function navegarParaSecao(id) {
        const secao = document.getElementById(id);

        if (secao) {
            secao.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    return (
        <header className="header-home">
            <button
                type="button"
                className="header-home-marca"
                onClick={() => navegarParaSecao('inicio')}
            >
                <img
                    className="header-home-logo"
                    src={logoFechaFacil}
                    alt="Símbolo do FechaFácil"
                />

                <span className="header-home-nome">
                    FechaFácil
                </span>
            </button>
            <nav className="header-home-links">
                <button type="button"
                    onClick={() => navegarParaSecao('beneficios')}>
                    Benefícios
                </button>

                <button type="button"
                    onClick={() => navegarParaSecao('como-funciona')}>
                    Como funciona
                </button>

                <button type="button"
                    onClick={() => navegarParaSecao('solucao')}>
                    Solução
                </button>
            </nav>

            <button
                type="button"
                className="header-home-cta"
                onClick={onAcessarSistema}
            >
                Acessar FechaFácil
            </button>
        </header>
    );
}

export default HeaderHome;