import { loadRanking } from "./scripts/ranking.js";
import { getProfileImgUrl, getUserId } from "./database/interfaces/database.js";

const cardContainer = document.getElementById("card-container");
const loader = document.getElementById("loader");

const pageCount = Math.ceil(cardLimit / cardIncrease);
let currentPage = 1;

var rankingSemanal = [];
var rankingTemporada = [];

var cardLimit = 0;
var cardIncrease = 5;
var cardIncreaseInitial = 0;

var selectPeriodo = document.getElementById("periodo");
var periodo = selectPeriodo.value;
selectPeriodo.addEventListener("change", (event) => {
    location.reload();
});

const createPerfilLista = async (index, inicial, periodo) => {

    var ranking = [];

    if (periodo == "Semanal") {
        ranking = rankingSemanal;
    }
    if (periodo == "Temporada") {
        ranking = rankingTemporada;
    }

    var id = ranking[index - 1][2];
    var ext = ranking[index - 1][3];

    console.log(id);
    console.log(ext);

    if (ext == null) {
        var img = "<i class='fa-solid fa-circle-user fa-xl' style='width: 25px;'></i>";
    }
    else {
        var imgUrl = await getProfileImgUrl(id, ext);
        console.log(imgUrl);
        var img = `<img
            src="${imgUrl}"
            class="rounded-circle img-fluid" style="width: 25px;"
            id="img-ranking" />`
    }

    if (inicial === false) {
        index += 15;
        const card = document.createElement("div");
        card.innerHTML = `<a href="perfil.html" class="list-group-item list-group-item-action perfil-lista"
                                aria-current="true">

                                <div class="d-flex justify-content-between">
                                    <div>
                                <span class="chip comum">
                                    ${index}
                                </span>
                                <span>${img}
                                </span>
                                    <span>@${ranking[index - 1][1]}</span>
                                    </div>
                                    <span>${ranking[index - 1][0]}</span>
                                    </div>
                                    
                           </a>`;

        cardContainer.appendChild(card);
    }

    if (inicial === true) {
        if (index === 1) {
            const card = document.createElement("div");
            card.innerHTML = `<a href="perfil.html" class="list-group-item list-group-item-action perfil-lista"
                                    aria-current="true">

                                    <div class="d-flex justify-content-between">
                                    <div>
                                    <span class="chip primary">
                                        ${index}
                                    </span>
                                    <span>${img}
                                </span>
                                
                                    <span>@${ranking[index - 1][1]}</span>
                                    </div>
                                    <span>${ranking[index - 1][0]}</span>
                                    </div>
                                    
                              </a>`;

            cardContainer.appendChild(card);
        }
        else if (index === 2) {
            const card = document.createElement("div");
            card.innerHTML = `<a href="perfil.html" class="list-group-item list-group-item-action perfil-lista"
                                    aria-current="true">
                                    <div class="d-flex justify-content-between">
                                    <div>
                                    <span class="chip secondary">
                                        ${index}
                                    </span>
                                    <span>${img}
                                </span>
                                    <span>@${ranking[index - 1][1]}</span>
                                    </div>
                                    <span>${ranking[index - 1][0]}</span>
                                    </div>
                                    
                              </a>`;

            cardContainer.appendChild(card);
        }
        else if (index === 3) {
            const card = document.createElement("div");
            card.innerHTML = `<a href="perfil.html" class="list-group-item list-group-item-action perfil-lista"
                                    aria-current="true">
                                    <div class="d-flex justify-content-between">
                                    <div>
                                    <span class="chip terciary">
                                        ${index}
                                    </span>
                                    <span>${img}
                                </span>
                                    <span>@${ranking[index - 1][1]}</span>
                                    </div>
                                    <span>${ranking[index - 1][0]}</span>
                                    </div>
                                    
                              </a>`;

            cardContainer.appendChild(card);
        }
        else {
            const card = document.createElement("div");
            card.innerHTML = `<a href="perfil.html" class="list-group-item list-group-item-action perfil-lista"
                                aria-current="true">
                                <div class="d-flex justify-content-between">
                                    <div>
                                <span class="chip comum">
                                    ${index}
                                </span>
                                <span>${img}
                                </span>
                                    <span>@${ranking[index - 1][1]}</span>
                                    </div>
                                    <span>${ranking[index - 1][0]}</span>
                                    </div>
                                    
                           </a>`;

            cardContainer.appendChild(card);
        }
    }

};

const addCards = async (pageIndex, periodo) => {

    var inicial = false;

    currentPage = pageIndex;

    const startRange = (pageIndex - 1) * cardIncrease;

    const endRange = currentPage == pageCount ? cardLimit : pageIndex * cardIncrease;

    for (let i = startRange + 1; i <= endRange; i++) {

        //PUXA UM PERFIL DO BANCO AQUI
        await createPerfilLista(i, false, periodo);

    }

};

const addCardsInicial = async (pageIndex, periodo) => {

    console.log(periodo);

    var inicial = true;

    currentPage = pageIndex;

    const startRange = (pageIndex - 1) * cardIncreaseInitial;

    const endRange = currentPage == pageCount ? cardLimit : pageIndex * cardIncreaseInitial;

    for (let i = startRange + 1; i <= endRange; i++) {

        //VERIFICAR SE PERFIL EXISTE

        //PUXA UM PERFIL DO BANCO AQUI

        await createPerfilLista(i, inicial, periodo);

    }

};

(async () => {


    rankingSemanal = await loadRanking("Semanal");
    rankingTemporada = await loadRanking("Temporada");
    console.log(rankingSemanal);

    const userID = await getUserId();
    console.log("ID USUARIO");
    console.log(userID);

    if (periodo == "Semanal") {
        for (var i = 0; i < rankingSemanal.length; i++) {
            if (rankingSemanal[i][2] == userID) {
                var posicao = i + 1;
                break;
            }
            else {
                posicao = 0;
            }
        }
    }

    if (periodo == "Temporada") {
        for (var i = 0; i < rankingTemporada.length; i++) {
            if (rankingTemporada[i][2] == userID) {
                var posicao = i + 1;
                break;
            }
            else {
                posicao = 0;
            }
        }
    }

    const posRanking = document.getElementById("posicao");
    posRanking.innerHTML = `${posicao}`;

    console.log(posicao);

    if (rankingSemanal.length < 21) {
        cardIncreaseInitial = rankingSemanal.length;
    }
    else {
        cardIncreaseInitial = 20;
    }

    cardLimit = rankingSemanal.length;

    addCardsInicial(currentPage, periodo);
})();




const handleInfiniteScroll = async () => {

    throttle(async () => {

        const endOfPage =

            window.innerHeight + window.scrollY - 250 >= document.body.offsetHeight;

        if (endOfPage) {

            await addCards(currentPage + 1, periodo);

        }

        if (currentPage === pageCount) {

            removeInfiniteScroll();

        }

    }, 1000);

};



window.addEventListener("scroll", handleInfiniteScroll);

var throttleTimer;

const throttle = (callback, time) => {

    if (throttleTimer) return;

    throttleTimer = true;

    setTimeout(() => {

        callback();

        throttleTimer = false;

    }, time);

};

const removeInfiniteScroll = () => {

    loader.remove();

    window.removeEventListener("scroll", handleInfiniteScroll);

};



