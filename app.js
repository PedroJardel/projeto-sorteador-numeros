const sortear = () => {
    const quantidade = parseInt(document.querySelector("#quantidade").value)
    const de = parseInt(document.querySelector("#de").value)
    const ate = parseInt(document.querySelector("#ate").value)

    if (numbersErrors(quantidade, de, ate)) {
        const numerosSorteados = []
        let numeroSorteado;
        for (let i = 0; i < quantidade; i++) {
            numeroSorteado = obterNumeroAleatorio(de, ate)

            while (numerosSorteados.includes(numeroSorteado)) {
                numeroSorteado = obterNumeroAleatorio(de, ate)
            }
            numerosSorteados.push(numeroSorteado)
        }
        console.log(numerosSorteados)

        const resultado = document.getElementById('resultado')
        resultado.innerHTML = `
        <label class="texto__paragrafo">Números sorteados: ${numerosSorteados}</label>
        `

        alterarStatusBotao()
    } else {
        reiniciarError()
    }
}

const obterNumeroAleatorio = (min, max) => {
    const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
    return numeroAleatorio
}

const alterarStatusBotao = () => {
    const buttonReiniciar = document.getElementById('btn-reiniciar')
    const buttonSortear = document.getElementById('btn-sortear')

    if (buttonReiniciar.classList.contains('container__botao-desabilitado')) {
        buttonReiniciar.classList.replace('container__botao-desabilitado', 'container__botao')
        buttonReiniciar.removeAttribute('disabled')

        buttonSortear.classList.replace('container__botao', 'container__botao-desabilitado')
        buttonSortear.setAttribute('disabled', 'true')
    } else {
        buttonReiniciar.classList.replace('container__botao', 'container__botao-desabilitado')
        buttonReiniciar.setAttribute('disabled', 'true')

        buttonSortear.classList.replace('container__botao-desabilitado', 'container__botao')
        buttonSortear.removeAttribute('disabled')
    }
}

const reiniciar = () => {
    document.querySelector("#quantidade").value = '';
    document.querySelector("#de").value = '';
    document.querySelector("#ate").value = '';

    document.getElementById('resultado').innerHTML =
        `<label class="texto__paragrafo">Números sorteados: nenhum até agora</label>`

    alterarStatusBotao()
}

const reiniciarError = () => {
    document.querySelector("#quantidade").value = '';
    document.querySelector("#de").value = '';
    document.querySelector("#ate").value = '';
}

const numbersErrors = (quantidade, min, max) => {
    if (min >= max) {
        alert('Valor mínimo maior que o valor máximo!')
        return false
    }

    if (quantidade > (max - min + 1)) {
        alert('Quantidade de números solicitados maior que a diferença do valor máximo e mínimo!')
        return false
    }
    if (quantidade < 0 || min < 0 || max < 0 || Number.isInteger(quantidade) || Number.isInteger(de) || Number.isInteger(ate)) {
        alert('Todos os valores devem ser positivos e inteiros!')
        return false
    }
    return true
}