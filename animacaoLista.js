const cardContainer = document.getElementById("card-container");
const loader = document.getElementById("loader");
const cardLimit = 100;
const cardIncreaseInitial = 20;
const cardIncrease = 5;
const pageCount = Math.ceil(cardLimit / cardIncrease);
let currentPage = 1;


const createPerfilLista = (index, inicial) => {

    if (inicial === false) {
        index += 15;
        const card = document.createElement("div");
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
    }

    if (inicial === true) {
        if (index === 1) {
            const card = document.createElement("div");
            card.innerHTML = `<a href="perfil.html" class="list-group-item list-group-item-action perfil-lista"
                                    aria-current="true">
                                    <span class="chip primary">
                                        ${index}
                                    </span>
                                    <span><img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                        class="rounded-circle img-fluid" style="width: 25px;" /></span>
                                    @juliaalmeida
                              </a>`;

            cardContainer.appendChild(card);
        }
        else if (index === 2) {
            const card = document.createElement("div");
            card.innerHTML = `<a href="perfil.html" class="list-group-item list-group-item-action perfil-lista"
                                    aria-current="true">
                                    <span class="chip secondary">
                                        ${index}
                                    </span>
                                    <span><img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                        class="rounded-circle img-fluid" style="width: 25px;" /></span>
                                    @juliaalmeida
                              </a>`;

            cardContainer.appendChild(card);
        }
        else if (index === 3) {
            const card = document.createElement("div");
            card.innerHTML = `<a href="perfil.html" class="list-group-item list-group-item-action perfil-lista"
                                    aria-current="true">
                                    <span class="chip terciary">
                                        ${index}
                                    </span>
                                    <span><img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                        class="rounded-circle img-fluid" style="width: 25px;" /></span>
                                    @juliaalmeida
                              </a>`;

            cardContainer.appendChild(card);
        }
        else {
            const card = document.createElement("div");
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
        }
    }

};

const addCardsInicial = (pageIndex) => {

    var inicial = true;

    currentPage = pageIndex;

    const startRange = (pageIndex - 1) * cardIncreaseInitial;

    const endRange = currentPage == pageCount ? cardLimit : pageIndex * cardIncreaseInitial;

    for (let i = startRange + 1; i <= endRange; i++) {

        //VERIFICAR SE PERFIL EXISTE

        //PUXA UM PERFIL DO BANCO AQUI

        createPerfilLista(i, inicial);

    }

};

const addCards = (pageIndex) => {

    var inicial = false;

    currentPage = pageIndex;

    const startRange = (pageIndex - 1) * cardIncrease;

    const endRange = currentPage == pageCount ? cardLimit : pageIndex * cardIncrease;

    for (let i = startRange + 1; i <= endRange; i++) {

        //PUXA UM PERFIL DO BANCO AQUI
        createPerfilLista(i, false);

    }

};

window.onload = function () {

    addCardsInicial(currentPage);

};

const handleInfiniteScroll = () => {

    throttle(() => {

        const endOfPage =

            window.innerHeight + window.scrollY - 250 >= document.body.offsetHeight;

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



