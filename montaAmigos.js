import { loadRanking } from "./scripts/ranking.js";
import { auth, db } from '../database/firebase/settings.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js'
import { getProfileImgUrl, getUserId } from "./database/interfaces/database.js";
import { getFirestore, collection, getDocs, setDoc, doc, collectionGroup, query, where, deleteDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js'


const cardContainer = document.getElementById("card-container");
const loader = document.getElementById("loader");

const pageCount = Math.ceil(cardLimit / cardIncrease);
let currentPage = 1;

var rankingSemanal = [];
var rankingTemporada = [];
var amigos = [];
var rankingAmigosSemanal = [];
var rankingAmigosTemporada = [];

var cardLimit = 0;
var cardIncrease = 5;
var cardIncreaseInitial = 0;



const createPerfilLista = async (index, inicial, periodo) => {

    var ranking = [];

    if (periodo == "Semanal") {
        ranking = rankingAmigosSemanal;
    }
    if (periodo == "Temporada") {
        ranking = rankingAmigosTemporada;
    }

    console.log(periodo)
    console.log("RANKING FINAL");
    console.log(ranking);


    var id = ranking[index - 1][3];
    var ext = ranking[index - 1][2];

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
                                    <span>@${ranking[index - 1][0]}</span>
                                    </div>
                                    <span>${ranking[index - 1][1]}</span>
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
                                
                                    <span>@${ranking[index - 1][0]}</span>
                                    </div>
                                    <span>${ranking[index - 1][1]}</span>
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
                                    <span>@${ranking[index - 1][0]}</span>
                                    </div>
                                    <span>${ranking[index - 1][1]}</span>
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
                                    <span>@${ranking[index - 1][0]}</span>
                                    </div>
                                    <span>${ranking[index - 1][1]}</span>
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
                                    <span>@${ranking[index - 1][0]}</span>
                                    </div>
                                    <span>${ranking[index - 1][1]}</span>
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


    var selectPeriodo = document.getElementById("periodo-amigo");
    var periodo = selectPeriodo.value;
    selectPeriodo.addEventListener("change", async (event) => {
        await location.reload();
    });



    rankingSemanal = await loadRanking("Semanal");
    rankingTemporada = await loadRanking("Temporada");
    console.log(rankingSemanal);

    const userID = await getUserId();
    console.log("ID USUARIO");
    console.log(userID);

    var amigosBanco = await getDocs(collection(db, "Usuarios", userID, "Amigos"));

    amigosBanco.forEach(async (docAmigo) => {
        var amigo = docAmigo.data();
        var amigoID = amigo.id;
        amigos.push(amigoID);
    });

    if (periodo == "Semanal") {
        for (var i = 0; i < amigos.length; i++) {
            var amigoSemanal = await getDoc(doc(db, "Usuarios", amigos[i]));
            var data = amigoSemanal.data();
            rankingAmigosSemanal.push([data.usuario, data.pontosSemana, data.imgExt, amigos[i]]);
            rankingAmigosSemanal = rankingAmigosSemanal.sort(function (a, b) { return b[1] - a[1] });
        }
        var eu = await getDoc(doc(db, "Usuarios", userID));

        var data = eu.data();
        rankingAmigosSemanal.push([data.usuario, data.pontosSemana, data.imgExt, userID]);
        rankingAmigosSemanal = rankingAmigosSemanal.sort(function (a, b) { return b[1] - a[1] });
    }

    if (periodo == "Temporada") {
        for (var i = 0; i < amigos.length; i++) {
            var amigoTemporada = await getDoc(doc(db, "Usuarios", amigos[i]));
            var data = amigoTemporada.data();
            rankingAmigosTemporada.push([data.usuario, data.pontosTemporada, data.imgExt, amigos[i]]);
            rankingAmigosTemporada = rankingAmigosTemporada.sort(function (a, b) { return b[1] - a[1] });
        }
        var eu = await getDoc(doc(db, "Usuarios", userID));
        var data = eu.data();
        rankingAmigosTemporada.push([data.usuario, data.pontosTemporada, data.imgExt, userID]);
        rankingAmigosTemporada = rankingAmigosTemporada.sort(function (a, b) { return b[1] - a[1] });
    }

    if (rankingAmigosSemanal.length < 21 && rankingAmigosSemanal.length > 0) {
        cardIncreaseInitial = rankingAmigosSemanal.length;
    }
    else if (rankingAmigosTemporada.length < 21 && rankingAmigosTemporada.length > 0) {
        cardIncreaseInitial = rankingAmigosTemporada.length;
    }
    else {
        cardIncreaseInitial = 20;
    }

    console.log("TEMPOPRADA");
    console.log(rankingAmigosTemporada);
    console.log(periodo);

    cardLimit = rankingAmigosSemanal.length;

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



