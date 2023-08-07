// Add Firebase products that you want to use
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js'
import { getFirestore, collection, getDocs, setDoc, doc, collectionGroup, query, where } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js'

//dados do banco
const firebaseConfig = {
    apiKey: "AIzaSyB95hZnSTy2dzBEPFO06lDzfDIlwYsU3nE",
    authDomain: "palpiteiro-5fe03.firebaseapp.com",
    databaseURL: "https://palpiteiro-5fe03-default-rtdb.firebaseio.com",
    projectId: "palpiteiro-5fe03",
    storageBucket: "palpiteiro-5fe03.appspot.com",
    messagingSenderId: "958757582571",
    appId: "1:958757582571:web:065de546a8d361295af0ae",
    measurementId: "G-Y88GY87Q7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth and firestore references
const auth = getAuth();
const db = getFirestore(app);

//keep track of user logged in or out
onAuthStateChanged(auth, (user) => {

    //elementos que aparecem para usuarios logados
    const ligasIcone = document.getElementById("link-ligas-icone");
    const ligasTexto = document.getElementById("link-ligas-texto");
    const minhasLigas = document.getElementById("minhas-ligas");
    const amigosIcone = document.getElementById("link-amigos-icone");
    const amigosTexto = document.getElementById("link-amigos-texto");
    const meusAmigos = document.getElementById("meus-amigos");
    const botaoApostasFeitas = document.getElementById("botao-apostas-feitas");
    const apostasFeitas = document.getElementById("apostas-feitas");
    const botaoAlertas = document.getElementById("botao-alertas");
    const pontosNav = document.getElementById("pontos-usuario-nav");
    const greensNav = document.getElementById("greens-usuario-nav");
    const redsNav = document.getElementById("reds-usuario-nav");
    const fotoNav = document.getElementById("foto-perfil-nav");
    const usuarioNav = document.getElementById("usuario-nav");

    //usuario logou
    if (user) {

        //mostra dados de usuario
        pontosNav.style.display = "block";
        greensNav.style.display = "block";
        redsNav.style.display = "block";
        fotoNav.style.display = "block";

        if (apostasFeitas != null) {
            apostasFeitas.style.display = "block";
        }
        if (minhasLigas != null) {
            minhasLigas.style.display = "block";
        }
        if (meusAmigos != null) {
            meusAmigos.style.display = "block";
        }

        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log(user);
        const uid = user.uid;
        // ...

    }

    //usuario nao esta logado
    else {

        //mostra barra de login
        document.getElementById("nav-login").style.display = "block";

        //mostra icones genericos
        usuarioNav.style.display = "block";

        // redireciona paginas com dados de usuario para o login
        ligasIcone.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'login.html';
        });
        ligasTexto.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'login.html';
        });
        amigosIcone.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'login.html';
        });
        amigosTexto.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'login.html';
        });
        botaoApostasFeitas.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'login.html';
        });
        botaoAlertas.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'login.html';
        });


        console.log("User is not signed");
    }
});

//login
if (document.querySelector('#form-login') != null) {

    const formLogin = document.querySelector('#form-login');

    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();

        //dados usuario
        const login = formLogin['loginPerfil'].value;
        const senha = formLogin['loginSenhaPerfil'].value;

        //login usuario
        signInWithEmailAndPassword(auth, login, senha)
            .then((cred) => {
                formLogin.reset();
                window.location.href = 'index.html';
            })
    })
}

//logout
if (document.querySelector('#form-logout') != null) {

    const logoutButton = document.querySelector('#form-logout');

    logoutButton.addEventListener('submit', (e) => {
        e.preventDefault();

        //logout usuario
        signOut(auth).then(() => {
            window.location.href = 'index.html';
        }).catch((error) => {
            console.log(error);
        });
    })
}

//signup and login
if (document.querySelector('#form-registro') != null) {

    const formRegistro = document.querySelector('#form-registro');

    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault();

        //dados usuario
        const email = formRegistro['emailPerfil'].value;
        const senha = formRegistro['senhaPerfil'].value;

        // sign up and login usuario
        createUserWithEmailAndPassword(auth, email, senha)
            .then((cred) => {
                formRegistro.reset();
                window.location.href = 'index.html';
            })
    })
}

//puxar os dados jogos da rodada
const jogosQuery = query(collectionGroup(db, "Jogos"));
const jogos = await getDocs(jogosQuery);

const jogoss = await getDocs(collection(db, "Rodadas", "1", "Jogos"));

//puxar dados das rodadas
const rodadas = await getDocs(collection(db, "Rodadas"));

//puxar dados dos jogadores de cada time
const times = await getDocs(collection(db, "Times"));
const jogadoresQuery = query(collectionGroup(db, "Jogadores"));
const jogadores = await getDocs(jogadoresQuery);

//puxar apostas do banco
const apostas = collection(db, "Apostas");


//div jogos da rodada
const jogosRodada = document.getElementById("jogos-rodada");

//div mercado aberto ou fechado
const mercado = document.getElementById("titulo");

rodadas.forEach((doc) => {

    //dados rodada
    const rodada = doc.data();

    if (rodada.abertaFechada == true) {
        mercado.innerHTML = `Mercado Aberto - Rodada ${rodada.numero}`;

        //montar cada card de jogo
        let html = '';
        jogos.forEach((doc) => {

            //dados jogo
            const jogo = doc.data();

            if (jogo.rodada == rodada.numero) {
                //peças do card
                var cardJogo1 = `
        <div class="row">
                                    <div class=" mb-4">
                                        <div class="container">
                                            <div class="row">
                                                <div class="">
                                                    <div class="card">

                                                        <div class="card-body" id="card-jogo">


                                                            <h5 class="card-title mt-1 text-white-50">${jogo.casa} x ${jogo.fora}</h5>


                                                            <p class="card-text text-white-50">${jogo.data}
                                                            </p>


                                                            <div class="d-flex justify-content-between gap-1">

                                                                <button type="button"
                                                                    class="btn btn-selection botao-card text-white-50"
                                                                    data-jogo="${jogo.casa} x ${jogo.fora}"
                                                                    data-selection="Casa" data-pontuacao="${jogo.pontosCasa}">



                                                                    <div id="botao-jogo">
                                                                        <div class="d-flex justify-content-center">
                                                                            Casa
                                                                        </div>

                                                                        <div class="d-flex justify-content-center">
                                                                            ${jogo.pontosCasa}
                                                                        </div>
                                                                    </div>
                                                                </button>

                                                                <button type="button"
                                                                    class="btn btn-selection botao-card text-white-50"
                                                                    data-jogo="${jogo.casa} x ${jogo.fora}"
                                                                    data-selection="Empate" data-pontuacao="${jogo.pontosEmpate}">


                                                                    <div id="botao-jogo">
                                                                        <div class="d-flex justify-content-center">
                                                                            Empate
                                                                        </div>

                                                                        <div class="d-flex justify-content-center">
                                                                            ${jogo.pontosEmpate}
                                                                        </div>
                                                                    </div>
                                                                </button>

                                                                <button type="button"
                                                                    class="btn btn-selection botao-card text-white-50"
                                                                    data-jogo="${jogo.casa} x ${jogo.fora}"
                                                                    data-selection="Fora" data-pontuacao="${jogo.pontosFora}">


                                                                    <div id="botao-jogo">
                                                                        <div class="d-flex justify-content-center">
                                                                            Fora
                                                                        </div>

                                                                        <div class="d-flex justify-content-center">
                                                                            ${jogo.pontosFora}
                                                                        </div>
                                                                    </div>
                                                                </button>

                                                            </div>
    `;

                var cardJogadores2 = `

                                                            <div class="d-flex justify-content-between">

                                                                <div class=" mt-3">
                                                                    <span class="card-text text-white-50 px-1 d-flex"
                                                                        id="select-jogador-label">Gol
                                                                    </span>
                                                                    <select id="select-jogador-1"
                                                                        class="form-select text-white-50">
                                                                        <option class="btn-selection"
                                                                            data-jogo="${jogo.casa} x ${jogo.fora}"
                                                                            data-selection="vazio" data-pontuacao="0">
                                                                            Jogador</option>

                                                                        <optgroup label="${jogo.casa}">
    `;

                var cardJogadoresGolCasaTodos3 = ``;

                var cardJogadores4 = `
        </optgroup >
        <optgroup label="${jogo.fora}">
    `;

                var cardJogadoresGolForaTodos5 = ``;

                var cardJogadores6 = `
        </optgroup >
                                                                    </select >
                                                                </div >


        <div class=" mt-3">
            <div class="d-flex justify-content-between">
                <div></div>
                <span class="card-text text-white-50 px-1"
                    id="select-jogador-label">Cartão
                </span>
            </div>
            <select id="select-jogador-2"
                class="form-select text-white-50">
                <option class="btn-selection"
                    data-jogo="${jogo.casa} x ${jogo.fora}"
                    data-selection="vazio" data-pontuacao="0">
                    Jogador</option>
                <optgroup label="${jogo.casa}">
    `;

                var cardJogadoresCartaoCasaTodos7 = ``;

                var cardJogadores8 = `
                </optgroup >

        <optgroup label="${jogo.fora}">
    `;

                var cardJogadoresCartaoForaTodos9 = ``;

                var cardJogadores10 = `
         </optgroup>
            </select >
        </div >





                                                            </div >


                                                        </div >
                                                    </div >
                                                </div >
                                            </div >
                                        </div >
                                    </div >
                                </div >
    `;

                //iterar pelos jogadores
                jogadores.forEach((doc) => {
                    //dados dos jogadores
                    const jogador = doc.data();

                    //adiciona seleções de gol e cartão para jogadores do time da casa
                    if (jogo.casa == jogador.time) {
                        //montar card de jogadores
                        var cardJogadoresGolCasaUnico = `
                                                                            <option class="btn-selection"
                                                                                data-jogo="${jogo.casa} x ${jogo.fora}"
                                                                                data-selection="Gol - ${jogador.nome} - ${jogo.casa}"
                                                                                data-pontuacao="${jogador.pontosGol}">${jogador.nome} : ${jogador.pontosGol}
                                                                            </option>
    
            `;
                        cardJogadoresGolCasaTodos3 += cardJogadoresGolCasaUnico;

                        var cardJogadoresCartaoCasaUnico = `
                    <option data-jogo="${jogo.casa} x ${jogo.fora}"
                        data-selection="Cartão - ${jogador.nome} - ${jogo.casa}"
                        data-pontuacao="${jogador.pontosCartao}">
                        ${jogador.nome} : ${jogador.pontosCartao}
                    </option>
            `;
                        cardJogadoresCartaoCasaTodos7 += cardJogadoresCartaoCasaUnico;
                    }

                    //adiciona seleções de gol e cartão para jogadores do time de fora
                    if (jogo.fora == jogador.time) {
                        //montar card de jogadores
                        var cardJogadoresGolForaUnico = `
                                                                            <option class="btn-selection"
                                                                                data-jogo="${jogo.casa} x ${jogo.fora}"
                                                                                data-selection="Gol - ${jogador.nome} - ${jogo.fora}"
                                                                                data-pontuacao="${jogador.pontosGol}">${jogador.nome} : ${jogador.pontosGol}
                                                                            </option>
    
            `;
                        cardJogadoresGolForaTodos5 += cardJogadoresGolForaUnico;

                        var cardJogadoresCartaoForaUnico = `    
            <option data-jogo="${jogo.casa} x ${jogo.fora}"
                data-selection="Cartão - ${jogador.nome} - ${jogo.fora}"
                data-pontuacao="${jogador.pontosCartao}">
                ${jogador.nome} : ${jogador.pontosCartao}
            </option>
            `;
                        cardJogadoresCartaoForaTodos9 += cardJogadoresCartaoForaUnico;
                    }
                })

                //monta as peças do card
                let card = ``;
                card += cardJogo1;
                card += cardJogadores2;
                card += cardJogadoresGolCasaTodos3;
                card += cardJogadores4;
                card += cardJogadoresGolForaTodos5;
                card += cardJogadores6;
                card += cardJogadoresCartaoCasaTodos7;
                card += cardJogadores8;
                card += cardJogadoresCartaoForaTodos9;
                card += cardJogadores10;

                //adiciona card à página
                html += card;

            }


        });

        //adicionar cards a div de jogos da rodada
        jogosRodada.innerHTML = html;
    }




});





/*gravar dados
const citiesRef = collection(db, "cities");

await setDoc(doc(citiesRef, "SF"), {
    name: "San Francisco", state: "CA", country: "USA",
    capital: false, population: 860000,
    regions: ["west_coast", "norcal"]
});
await setDoc(doc(citiesRef, "LA"), {
    name: "Los Angeles", state: "CA", country: "USA",
    capital: false, population: 3900000,
    regions: ["west_coast", "socal"]
});
await setDoc(doc(citiesRef, "DC"), {
    name: "Washington, D.C.", state: null, country: "USA",
    capital: true, population: 680000,
    regions: ["east_coast"]
});
await setDoc(doc(citiesRef, "TOK"), {
    name: "Tokyo", state: null, country: "Japan",
    capital: true, population: 9000000,
    regions: ["kanto", "honshu"]
});
await setDoc(doc(citiesRef, "BJ"), {
    name: "Beijing", state: null, country: "China",
    capital: true, population: 21500000,
    regions: ["jingjinji", "hebei"]
});
*/


//eventos dinâmicos da página inicial

//evento de seleção do resultado
var btnSelections = document.getElementsByClassName('btn-selection');
var selectionsContainer = document.getElementById('selections');
var fichaContainer = document.getElementById('ficha-apostas');
var totalPontuacaoContainer = document.getElementById('total-pontuacao');
var totalPontuacao = 0;

var selectJogador = document.getElementById('select-jogador');
var selectJogador2 = document.getElementById('select-jogador-2');
var previousSelection1 = null;
var previousSelection2 = null;


Array.from(btnSelections).forEach(function (btn) {
    btn.addEventListener('click', function () {
        var jogo = this.getAttribute('data-jogo');
        var selecao = this.getAttribute('data-selection');
        var pontuacao = parseInt(this.getAttribute('data-pontuacao'));

        // Verificar se o botão está marcado com "btn-success"
        var isButtonSelected = this.classList.contains('btn-success');

        // Verificar se já existe uma seleção para o jogo atual e a mesma seleção dentro da ficha de apostas
        var existingSelection = Array.from(selectionsContainer.getElementsByClassName('selection')).find(function (selection) {
            return selection.getAttribute('data-jogo') === jogo && selection.getAttribute('data-selection') === selecao;
        });

        // Remover a seleção do botão marcado com "btn-success"
        if (isButtonSelected) {
            this.classList.remove('btn-success', 'btn-outline-light');
            // Remover a seleção do jogo atual da ficha de apostas
            if (existingSelection) {
                existingSelection.remove();

                // Atualizar somatório da pontuação
                totalPontuacao -= pontuacao;
                totalPontuacaoContainer.textContent = totalPontuacao;
            }
        } else if (!existingSelection) {
            // Remover a seleção de qualquer outro botão do mesmo jogo e mesma seleção na ficha de apostas
            Array.from(selectionsContainer.getElementsByClassName('selection')).forEach(function (selection) {
                var selectionJogo = selection.getAttribute('data-jogo');
                var selectionSelecao = selection.getAttribute('data-selection');
                if (selectionJogo === jogo && (selectionSelecao === 'Casa' || selectionSelecao === 'Fora' || selectionSelecao === 'Empate')) {
                    var selectionPontuacao = parseInt(selection.getAttribute('data-pontuacao'));
                    selection.remove();

                    // Remover as classes "btn-success" e "btn-outline-light" do botão correspondente dentro do jogo
                    var correspondingButton = Array.from(btnSelections).find(function (button) {
                        return button.getAttribute('data-jogo') === jogo && button.getAttribute('data-selection') === selectionSelecao;
                    });
                    if (correspondingButton) {
                        correspondingButton.classList.remove('btn-success', 'btn-outline-light');
                    }

                    // Atualizar somatório da pontuação
                    totalPontuacao -= selectionPontuacao;
                    totalPontuacaoContainer.textContent = totalPontuacao;
                }
            });

            // Atualizar somatório da pontuação com a nova pontuação
            totalPontuacao += pontuacao;
            totalPontuacaoContainer.textContent = totalPontuacao;

            // Criar elemento da seleção
            var li = document.createElement('li');
            li.className = 'list-group-item selection';
            li.setAttribute('data-jogo', jogo);
            li.setAttribute('data-selection', selecao);
            li.setAttribute('data-pontuacao', pontuacao);
            li.innerHTML = `
                <div class="d-flex justify-content-between" id = "jogo-ficha">
                <span class="">${jogo}</span>
                <div class="d-flex">
                    <div class="selection-text">
                    <span>${selecao} @ ${pontuacao}</span>
                    </div>
                    <button type="button" class="btn btn-remove fa-solid fa-xmark" id="deletar"></button>
                </div>
                </div>
                `;

            // Adicionar evento de remoção
            var btnRemove = li.querySelector('.btn-remove');
            btnRemove.addEventListener('click', function () {
                var selectionPontuacao = parseInt(li.getAttribute('data-pontuacao'));
                li.remove();

                // Remover as classes "btn-success" e "btn-outline-light" do botão correspondente dentro do jogo
                var correspondingButton = Array.from(btnSelections).find(function (button) {
                    return button.getAttribute('data-jogo') === jogo && button.getAttribute('data-selection') === selecao;
                });
                if (correspondingButton) {
                    correspondingButton.classList.remove('btn-success', 'btn-outline-light');
                }

                // Atualizar somatório da pontuação
                totalPontuacao -= selectionPontuacao;
                totalPontuacaoContainer.textContent = totalPontuacao;

                // Ocultar a ficha de apostas quando não houver seleções
                if (selectionsContainer.childElementCount === 0) {
                    fichaContainer.style.display = 'none';
                }
            });

            // Adicionar seleção à ficha de apostas
            selectionsContainer.appendChild(li);

            // Remover as classes "btn-success" e "btn-outline-light" de todos os botões do mesmo jogo
            Array.from(btnSelections).forEach(function (button) {
                if (button.getAttribute('data-jogo') === jogo) {
                    button.classList.remove('btn-success', 'btn-outline-light');
                }
            });

            // Adicionar as classes "btn-success" e "btn-outline-light" somente ao botão clicado
            this.classList.add('btn-success', 'btn-outline-light');
        }

        // Exibir a ficha de apostas
        fichaContainer.style.display = selectionsContainer.childElementCount > 0 ? 'block' : 'none';
    });
});


// Função para adicionar a seleção na ficha de apostas
function addSelectionToBet(jogo, selecao, pontuacao) {
    // Criar elemento da seleção

    var li = document.createElement('li');
    li.className = 'list-group-item selection';
    li.setAttribute('data-jogo', jogo);
    li.setAttribute('data-selection', selecao);
    li.setAttribute('data-pontuacao', pontuacao);
    li.innerHTML = `
        <div class="d-flex justify-content-between" id = "jogo-ficha">
            <span class="">${jogo}</span>
                <div class="d-flex">
                    <div class="selection-text">
                        <span>${selecao} @ ${pontuacao}</span>
                    </div>
                    <button type="button" class="btn btn-remove fa-solid fa-xmark" id="deletar"></button>
                </div>
        </div>
        `;

    // Adicionar evento de remoção
    var btnRemove = li.querySelector('.btn-remove');
    btnRemove.addEventListener('click', function () {



        var selectionPontuacao = parseInt(li.getAttribute('data-pontuacao'));
        li.remove();




        // Atualizar somatório da pontuação
        totalPontuacao -= selectionPontuacao;
        totalPontuacaoContainer.textContent = totalPontuacao;

        // Ocultar a ficha de apostas quando não houver seleções
        if (selectionsContainer.childElementCount === 0) {
            fichaContainer.style.display = 'none';
        }

    });

    // Adicionar seleção à ficha de apostas
    selectionsContainer.appendChild(li);

    // Atualizar somatório da pontuação
    totalPontuacao += pontuacao;
    totalPontuacaoContainer.textContent = totalPontuacao;

    // Exibir a ficha de apostas
    fichaContainer.style.display = 'block';
}

// Função para remover a seleção da ficha de apostas
function removeSelectionFromBet(selection) {
    var selectionPontuacao = parseInt(selection.getAttribute('data-pontuacao'));
    selection.remove();

    // Atualizar somatório da pontuação
    totalPontuacao -= selectionPontuacao;
    totalPontuacaoContainer.textContent = totalPontuacao;

    // Ocultar a ficha de apostas quando não houver seleções
    if (selectionsContainer.childElementCount === 0) {
        fichaContainer.style.display = 'none';
    }
}

// Evento de seleção de jogadores 1
var selectJogador1Elements = document.querySelectorAll('[id^="select-jogador-1"]');
var previousSelection1 = {};

selectJogador1Elements.forEach(function (select) {
    select.addEventListener('change', function () {
        var selectedOption = this.options[this.selectedIndex];
        var jogo = selectedOption.getAttribute('data-jogo');
        var selecao = selectedOption.getAttribute('data-selection');
        var pontuacao = parseInt(selectedOption.getAttribute('data-pontuacao'));

        // Remover a seleção anterior da ficha de apostas, se não for "vazio"
        if (previousSelection1[jogo] && previousSelection1[jogo] !== 'vazio') {
            var existingSelection = Array.from(selectionsContainer.getElementsByClassName('selection')).find(function (selection) {
                return selection.getAttribute('data-jogo') === jogo && selection.getAttribute('data-selection') === previousSelection1[jogo];
            });
            if (existingSelection) {
                removeSelectionFromBet(existingSelection);
            }
        }

        // Adicionar a nova seleção à ficha de apostas, se não for "vazio"
        if (selecao !== 'vazio') {
            addSelectionToBet(jogo, selecao, pontuacao);
        }

        // Atualizar a seleção anterior
        previousSelection1[jogo] = selecao;
    });
});

// Eventos de seleção de jogadores 2
var selectJogador2Elements = document.querySelectorAll('[id^="select-jogador-2"]');
var previousSelection2 = {};

selectJogador2Elements.forEach(function (select) {
    select.addEventListener('change', function () {
        var selectedOption = this.options[this.selectedIndex];
        var jogo = selectedOption.getAttribute('data-jogo');
        var selecao = selectedOption.getAttribute('data-selection');
        var pontuacao = parseInt(selectedOption.getAttribute('data-pontuacao'));

        // Remover a seleção anterior da ficha de apostas, se não for "vazio"
        if (previousSelection2[jogo] && previousSelection2[jogo] !== 'vazio') {
            var existingSelection = Array.from(selectionsContainer.getElementsByClassName('selection')).find(function (selection) {
                return selection.getAttribute('data-jogo') === jogo && selection.getAttribute('data-selection') === previousSelection2[jogo];
            });
            if (existingSelection) {
                removeSelectionFromBet(existingSelection);
            }
        }

        // Adicionar a nova seleção à ficha de apostas, se não for "vazio"
        if (selecao !== 'vazio') {
            addSelectionToBet(jogo, selecao, pontuacao);
        }

        // Atualizar a seleção anterior
        previousSelection2[jogo] = selecao;
    });
});


var btnAposta = document.getElementById('botao-aposta');

btnAposta.addEventListener('click', function () {




    //gravar apostas feitas

    //percorrer apostas da ficha
    var ul = document.getElementById("selections");
    var items = ul.getElementsByTagName("li");
    for (var i = 0; i < items.length; ++i) {
        // do something with items[i], which is a <li> element
        console.log(i);
        console.log(items[i]);

    }






    // Remover todas as seleções da ficha de apostas
    Array.from(selectionsContainer.getElementsByClassName('selection')).forEach(function (selection) {
        var selectionPontuacao = parseInt(selection.getAttribute('data-pontuacao'));
        selection.remove();

        // Atualizar somatório da pontuação
        totalPontuacao -= selectionPontuacao;
    });

    // Zerar a pontuação total
    totalPontuacao = 0;

    // Atualizar o valor da pontuação total na interface
    totalPontuacaoContainer.textContent = totalPontuacao;

    // Ocultar a ficha de apostas
    fichaContainer.style.display = 'none';

    // Remover as classes "btn-success" e "btn-outline-light" de todos os botões de seleção
    Array.from(btnSelections).forEach(function (button) {
        button.classList.remove('btn-success', 'btn-outline-light');
    });

    // Resetar a seleção anterior
    var previousSelection1 = null;
    var previousSelection2 = null;


    // Selecionar a opção com data-jogo igual a "vazio" nos dois selects
    // Selecionar a opção com data-jogo igual a "vazio" em todas as ocorrências dos selects
    var selectsJogador1 = document.querySelectorAll('[id^="select-jogador-1"]');
    var selectsJogador2 = document.querySelectorAll('[id^="select-jogador-2"]');

    selectsJogador1.forEach(function (select) {
        select.querySelector('option[data-selection="vazio"]').selected = true;
    });

    selectsJogador2.forEach(function (select) {
        select.querySelector('option[data-selection="vazio"]').selected = true;
    });



});

