const situacao = document.querySelector("#status");
const inputEstado = document.querySelector("#estado")
const btnBuscar = document.querySelector("#btnBuscar")
const resultado = document.querySelector("#resultado")
const local = document.querySelector("#local")
const casos = document.querySelector("#casos")
const mortes = document.querySelector("#mortes")
const suspeitas = document.querySelector("#suspeitas")
const recusas = document.querySelector("#recusas")

fetch('https://covid19-brazil-api.vercel.app/api/status/v1')
    .then(res => res.json())
    .then(dados => {
        const info = dados.status;
        info == "ok" ? situacao.innerHTML = "<h2>ONLINE<h2>" : situacao.innerHTML = "<h2>OFFLINE<h2>";
        console.log(info);
    })
    .catch(err => console.error(err));

btnBuscar.addEventListener("click", () => filtroEstado("estado"))

function filtroEstado(botao) {
    estado = inputEstado.value.toLowerCase().trim()

    if (estado == null || estado == "") {
        resultado.innerHTML = "<p>INSIRA A SIGLA DE UM ESTADO<p>"
    }
    if (botao == "estado"){
        buscardadosEstado(estado)
    }
    
    console.log(estado)
}
function buscardadosEstado(estado) {
    fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${estado}`)
        .then(res => res.json())
        .then(dados => {
            const nCasos = dados.cases;
            const nMortes = dados.deaths;
            const nSuspeitas = dados.suspects;
            const nRecusas = dados.refuses;

            exibirResultado(estado, nCasos, nMortes, nSuspeitas, nRecusas);
            console.log(dados);
            console.log(casos);
        })
        .catch(err => console.error(err));
};

function exibirResultado(estado,  nCasos, nMortes, nSuspeitas, nRecusas){
    local.innerHTML = `<h4><strong>Estado:${estado.toUpperCase()}</strong><h4>`;
    casos.innerHTML = `<strong>Casos:${nCasos}</strong>`;
    mortes.innerHTML = `<strong>Mortes: ${nMortes}</strong>`;
    suspeitas.innerHTML = `<strong>Suspeitas: ${nSuspeitas}</strong>`;
    recusas.innerHTML = `<strong>Suspeitas Descartadas: ${nRecusas}</strong>`;
}
