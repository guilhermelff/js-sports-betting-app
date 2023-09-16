const cardContainer = document.getElementById("card-container");
const loader = document.getElementById("loader");
const cardLimit = 100;
const cardIncrease = 20;
const pageCount = Math.ceil(cardLimit / cardIncrease);
let currentPage = 1;


const createPerfilLista = (index) => {

    const card = document.createElement("div");

    //ADICIONAR TRATAMENTO PARA PRIMEIRO SEGUNDO E TERCEIRO LUGAR OLHAR CHIPS NO CSS

    card.innerHTML = `<a href="perfil.html" class="list-group-item list-group-item-action perfil-lista"
        aria-current="true">
        <span class="chip comum">
            ${index}
        </span>
        <span><img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
            class="rounded-circle img-fluid" style="width: 25px;" /></span>
        @juliaalmeida
    </a>`;

    cardContainer.appendChild(card);

};

const addCards = (pageIndex) => {

    currentPage = pageIndex;

    const startRange = (pageIndex - 1) * cardIncrease;

    const endRange = currentPage == pageCount ? cardLimit : pageIndex * cardIncrease;

    for (let i = startRange + 1; i <= endRange; i++) {

        //PUXA UM PERFIL DO BANCO AQUI
        createPerfilLista(i);

    }

};

window.onload = function () {

    addCards(currentPage);

};

const handleInfiniteScroll = () => {

    throttle(() => {

        const endOfPage =

            window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

        if (endOfPage) {

            addCards(currentPage + 1);

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



