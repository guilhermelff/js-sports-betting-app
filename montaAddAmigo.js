import { loadRanking } from "./scripts/ranking.js";
import { getProfileImgUrl, getUserId, getUserName, sendInvite } from "./database/interfaces/database.js";
import { addFriend, retrieveUser, getDataFromId } from "./database/interfaces/database.js";

const cardContainer = document.getElementById("usuarios");

var rankingTemporada = [];

const formPesquisa = document.querySelector('#pesquisa');

const onClickEvent = async (e) => {
    e.preventDefault();
    var name = e.target.name;
    //{ target: { name } }
    e.preventDefault();
    try {
        var nome = name;
        console.log(nome);
        var username = await getUserName();
        console.log(username);
        sendInvite(nome, username);


    } catch (error) {
        console.log(error);
    }
};

const createPerfilLista = async (data) => {

    var usuario = data.usuario;
    var id = data.id;

    let html = '';


    const card = document.createElement("li");
    card.setAttribute("class", "usuario");
    card.setAttribute("usuarioNome", usuario);


    card.innerHTML = `  <div class="d-flex justify-content-between">
                                    <div class="">
                                        <p class="mx-2 my-2">@${usuario}</p>
                                    </div>
                                    <div class="">
                                        <button class="btn botao" name="${id}">
                                            <i class="fa-solid fa-user-plus icone" name="${id}"></i>
                                        </button>
                                    </div>
                                </div>`;

    cardContainer.appendChild(card);

    //PERCORRER LIs E ADICIONAR EVENT LISTENER PARA MANDAR CONVITE
    document.querySelectorAll('.botao').forEach(btn => {

        btn.addEventListener('click', onClickEvent);
    });

};




(async () => {



    var usuarios = document.querySelectorAll('.usuario');

    console.log(usuarios);

    for (let i = 0; i < usuarios.length; i++) {
        var nome = usuarios[i].getAttribute("usuarioNome");
        console.log(nome);
    }

    var items = cardContainer.getElementsByTagName("button");

    console.log("entrou no script");

    console.log(cardContainer);
    console.log(items);





    document.querySelectorAll('.pesquisa').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log("clique");
            try {
                var usuarioPesquisa = formPesquisa['usuario-pesquisa'].value.trim();
                console.log(usuarioPesquisa);

                var idusuarioPesquisa = await retrieveUser(usuarioPesquisa);
                console.log("idusuarioPesquisa");
                console.log(idusuarioPesquisa);

                if (idusuarioPesquisa != undefined) {
                    var data = await getDataFromId(idusuarioPesquisa);
                    createPerfilLista(data);

                }



            } catch (error) {
                alert("Usuario não encontrado");
                console.log(error);
            }
        });
    });


})();




