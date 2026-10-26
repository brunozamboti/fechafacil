import logoFechaFacil from '../assets/logo-fechafacil.png';

function NavegacaoSistema({
    paginaAtual,
    onNavegar
}) {
    return (
        <header className="navegacao-sistema">
            <button
                type="button"
                className="navegacao-sistema-marca"
                onClick={() => onNavegar('inicio')}
            >
                <img
                    src={logoFechaFacil}
                    alt="Símbolo do FechaFácil"
                />

                <span>FechaFácil</span>
            </button>

            <nav className="navegacao-sistema-links">
                <button
                    type="button"
                    className={
                        paginaAtual === 'caixas'
                            ? 'ativo'
                            : ''
                    }
                    onClick={() => onNavegar('caixas')}
                >
                    Caixas
                </button>

                <button
                    type="button"
                    className={
                        paginaAtual === 'fechamentos'
                            ? 'ativo'
                            : ''
                    }
                    onClick={() => onNavegar('fechamentos')}
                >
                    Abertura e Fechamento
                </button>

                <button
                    type="button"
                    className={
                        paginaAtual === 'movimentacoes'
                            ? 'ativo'
                            : ''
                    }
                    onClick={() => onNavegar('movimentacoes')}
                >
                    Movimentações
                </button>
            </nav>

            <button
                type="button"
                className="navegacao-sistema-inicio"
                onClick={() => onNavegar('inicio')}
            >
                Voltar ao início
            </button>
        </header>
    );
}

export default NavegacaoSistema;