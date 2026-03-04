const situacao = document.querySelector("#status");
const inputEstado = document.querySelector("#estado")
const btnBuscar = document.querySelector("#btnBuscar")
const resultado = document.querySelector("#resultado")
const local = document.querySelector("#local")
const casos = document.querySelector("#casos")
const mortes = document.querySelector("#mortes")
const suspeitas = document.querySelector("#suspeitas")
const recusas = document.querySelector("#recusas")
const dadosExtras = document.querySelector("dadosExtras")
const contar = document.querySelector("#contagem")

fetch('https://covid19-brazil-api.vercel.app/api/status/v1')
    .then(res => res.json())
    .then(dados => {
        const info = dados.status;
        info == "ok" ? situacao.innerHTML = `<h2 style="color: green;">ONLINE<h2>` : situacao.innerHTML = `<h2 style="color:red;">OFFLINE<h2>`;
        console.log(info);
    })
    .catch(err => console.error(err));

btnBuscar.addEventListener("click", () => filtroEstado("estado"))

function filtroEstado(botao) {
    estado = inputEstado.value.toLowerCase().trim()

    if (estado == null || estado == "") {
        resultado.innerHTML = "<p>INSIRA A SIGLA DE UM ESTADO<p>"
    }
    if (botao == "estado") {
        buscardadosEstado(estado)
    }

    console.log(estado)
}
function buscardadosEstado(estado) {
    fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${estado}`)
        .then(res => res.json())
        .then(dados => {
            const nome = dados.state
            const nCasos = dados.cases;
            const nMortes = dados.deaths;
            const nSuspeitas = dados.suspects;
            const nRecusas = dados.refuses;

            exibirResultado(nome, nCasos, nMortes, nSuspeitas, nRecusas);
            console.log(dados);
            console.log(casos);
        })
        .catch(err => console.error(err));
};

    fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/20200318`)
        .then(res => res.json())
        .then(dados => {
            let nomeEstado = " "
            let maisMortes = 0
            const contagem = dados.data
            for (let cont = 0; cont < contagem.length; cont++) {
                nEstado = contagem[cont].uf
                fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${nEstado}`)
                    .then(res => res.json())
                    .then(dados => {
                        const estado = dados.state
                        const mortes = dados.deaths
                        
                        console.log(`Estado: ${dados.state} NUmero de MOrtos: ${mortes}`)

                        if (mortes > maisMortes) {
                            nomeEstado = dados.state
                            maisMortes = mortes
                        }

                        contar.innerHTML = `<p>Estado: ${nomeEstado}<p>
            <p>Numero de Mortes: ${maisMortes}<p>`
                    })
                    .catch(err => console.error(err));

            }


        })

function exibirResultado(estado, nCasos, nMortes, nSuspeitas, nRecusas) {
    local.innerHTML = `<h4><strong>Estado: ${estado.toUpperCase()}</strong><h4>`;
    casos.innerHTML = `<strong>Casos: ${nCasos}</strong>`;
    mortes.innerHTML = `<strong>Mortes: ${nMortes}</strong>`;
    suspeitas.innerHTML = `<strong>Suspeitas: ${nSuspeitas}</strong>`;
    recusas.innerHTML = `<strong>Suspeitas Descartadas: ${nRecusas}</strong>`;
}
