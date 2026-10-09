function formatarDataHora(dataHora) {
    if (!dataHora) {
        return '';
    }

    const [data, horaCompleta] = dataHora.split('T');
    const [ano, mes, dia] = data.split('-');

    const hora = horaCompleta.slice(0, 5);

    return `${dia}/${mes}/${ano} às ${hora}`;
}

export default formatarDataHora;