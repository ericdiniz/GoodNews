const API_KEY = '44906b8f24414b739f3288c28042bb83';
const taylor = "G1";

var queryAtual;

onload = () => {
    let xhr = new XMLHttpRequest();
    xhr.onload = exibeNoticias;
    xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=br&category=&apiKey=${API_KEY}`);
    xhr.send();


    let img = new XMLHttpRequest();
    img.onload = exibeImgs;
    img.open('GET', `https://newsapi.org/v2/everything?q=${taylor}&language=pt&apiKey=${API_KEY}`);
    img.send();

    let TEC = document.getElementById("tecnologia");
    TEC.onclick = () => {
        PesquisaSource("Tecnologia");
    }
    let POL = document.getElementById("politica");
    POL.onclick = () => {
        PesquisaSource("Política");
    }
    let ESP = document.getElementById("esportes");
    ESP.onclick = () => {
        PesquisaSource("Esportes");
    }
    let ECO = document.getElementById("economia");
    ECO.onclick = () => {
        PesquisaSource("Economia");
    }

    imprimePesquisaSalvas();


}


function exibeNoticias() {
    let divTela = document.getElementById('tela');
    let texto = '';

    // Montar texto HTML das noticias
    let dados = JSON.parse(this.responseText);
    for (i = 0; i < 5; i++) {
        let noticia = dados.articles[i];
        let data = new Date(noticia.publishedAt);
                
        texto = texto + 
        `
            <div class="card mb-3 noticia-principal">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${noticia.urlToImage}" class="img-fluid rounded-start">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title">${noticia.title}</h5>
                        <p class="card-text"><small class="text-muted">${data.toLocaleDateString()} - 
                        ${noticia.source.name} - 
                        ${noticia.author}</small></p>
                        <p class="card-text">${noticia.content}  <a href="${noticia.url}" target="_blank">Leia mais ...</a></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    // Preencher a DIV com o texto HTML
    divTela.innerHTML = texto;
}

//search
function executaPesquisa(e) {
    e.preventDefault();
    let valorPesquisado = document.getElementById('txtPesquisa').value;
    //salvaPesquisa(valorPesquisado);
    console.log(valorPesquisado);
    PesquisaSource(valorPesquisado);
}

document.getElementById('btnPesquisa').addEventListener('click', executaPesquisa);


//Source
function PesquisaSource(query) {

    if (query) {

        let ContainerNews = document.getElementById('tituloNoticias');

        ContainerNews.innerHTML = `Notícias sobre: ${query}`;

        let ParagraphModal = document.getElementById('SearchParagraphModal');
        ParagraphModal.innerHTML = `Deseja salvar a pesquisa: <br>${query}`;
        queryAtual = query;
    }
    else { ParagraphModal.innerText = 'No Searchs yet'; }


    let xhr = new XMLHttpRequest();
    xhr.onload = exibeNoticias;
    xhr.open('GET', `https://newsapi.org/v2/everything?q=${query}&language=pt&apiKey=${API_KEY}`);
    xhr.send();
    ModalSave();
}


//DIV DAS IMGS
function exibeImgs() {
    let divIMG = document.getElementById('more-img-div');
    let texto = '';

    // Montar texto HTML das noticias
    let dados = JSON.parse(this.responseText);

    for (i = 0; i < 4; i++) {
        let imagens = dados.articles[i]; // ${imagens.urlToImage}
        texto = texto + 
        `
        <div class="card text-white">
            <img src="${imagens.urlToImage}" class="card-img maisnoticias">
            <div class="card-img-overlay">
                <p class="card-text">
                    <a href="${imagens.url}" target="_blank">${imagens.title}</a>
                </p>
            </div>
        </div>
      `;
    };

    // Preencher a DIV com o texto HTML
    divIMG.innerHTML = texto;
}

// SALVAR AS PESQUISAS
function salvaPesquisa() {
    let listaArray = [];
    let listaGravada = localStorage.getItem('itensPesquisados');

    if (listaGravada)
        listaArray = JSON.parse(listaGravada);

    listaArray.push(queryAtual);

    localStorage.setItem('itensPesquisados', JSON.stringify(listaArray));

    let a = document.createElement("a");
    a.href = '#';
    a.addEventListener('click', () => PesquisaSource(queryAtual));
    a.appendChild(document.createTextNode(queryAtual));

    //<a href="#"/ onClick="PesquisaSource">valorPesquisado</a>;

    let li = document.createElement("li");
    li.appendChild(a);

    let lista = document.getElementById('saveSearchs');
    lista.appendChild(li);

    //$(`<a href="#">${valorPesquisado}</a>`).click(() => PesquisaSource(valorPesquisado)).appendTo('#saveSearchs');
    imprimePesquisaSalvas();
}
/*
function ApagarLista() {

    console.log("limpou");

    window.localStorage.clear();

    listaGravada.length = 0;

    imprimePesquisaSalvas();
}

var listaGravada = localStorage.getItem('itensPesquisados');

function imprimePesquisaSalvas() {

    if (listaGravada.length == 0) {
        var z = document.getElementById('saveSearchs').innerHTML = "";
        z.appendChild();
        /*
        var qtd = document.querySelectorAll('#id'.length;


        while (qtd < 0) { let teste = document.getElementById("id") }

        teste.outerHTML = '';

        qtd--;
        
    }  
}
*/

if (listaGravada) {
    let listaArray = JSON.parse(listaGravada);

    document.getElementById('saveSearchs').innerHTML = "";

    for (let i = listaArray.length; i > 0; i--) {
        if (listaArray[i] == null) {
            //listaArray[i].hide();
        }
        else {
            let a = document.createElement("a");
            a.href = '#';
            a.addEventListener('click', () => PesquisaSource(listaArray[i]));
            a.appendChild(document.createTextNode(listaArray[i]));

            let li = document.createElement("li");
            li.appendChild(a);

            let lista = document.getElementById('saveSearchs');
            lista.appendChild(li);

        }
    }
} else {
    let lista = document.getElementById('saveSearchs');
    lista.appendChild(document.createTextNode(''));
}


$(window).load(ModalSave.hide());

$('#btnSave').click($("#myModal").hide());


function ModalSave() {
    $("#myModal").modal({
        show: true,
    });
}
setTimeout(ModalSave, 500);
