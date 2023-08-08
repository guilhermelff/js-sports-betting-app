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

async function montaApostas(uid) {
    //puxar dados das apostas
    const apostas = await getDocs(collection(db, "Usuarios", uid, "Apostas"));

    //montar cada card de aposta
    let html = '';

    //div tickets
    const tickets = document.getElementById("tickets");

    apostas.forEach((doc) => {

        //dados aposta
        const aposta = doc.data();
        var descricaoAposta = ``;
        var resultadoAposta = ``;

        //verifica se é aposta de jogador ou resultado
        if (aposta.casaEmpateFora) {
            descricaoAposta = aposta.casaEmpateFora;
        };

        if (aposta.gol === "true") {
            descricaoAposta = `${aposta.jogador} - Gol`;
        }

        if (aposta.cartao === "true") {
            descricaoAposta = `${aposta.jogador} - Cartão`;
        }

        if (aposta.resolvida == false) {
            resultadoAposta = `
                    <span class="resultado-aposta resolvida"><i class="fa-solid fa-minus gray"></i></span><br>
                `;
        }

        if (aposta.resolvida && aposta.acertouErrou) {
            resultadoAposta = `
                    <span class="resultado-aposta resolvida"><i class="fa-solid fa-check green"></i></span><br>
                `;
        }

        if (aposta.resolvida && aposta.acertouErrou == false) {
            resultadoAposta = `
                    <span class="resultado-aposta resolvida"><i class="fa-solid fa-xmark red"></i></span><br>
                `;
        }

        //monta as peças do card
        let card = `
            
                                    <div class="col-sm">
                                        <div class="ticket">
                                            <div class="ticket__content">
                                                <p class="ticket__text">
                                                    <span>Rodada ${aposta.rodada}</span><br>
                                                    <span>${aposta.jogo}</span><br>
                                                    <span>${descricaoAposta}</span><br>

                                                    ${resultadoAposta}<br>

                                                    <span class="pontuacao-aposta">${aposta.pontos}</span><br>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

            
            `;

        //adiciona card à página
        html += card;

    });

    //adicionar cards a div de tickets de aposta
    tickets.innerHTML = html;
};


//keep track of user logged in or out
onAuthStateChanged(auth, (user) => {

    //elementos que aparecem para todos
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
        var uid = user.uid;

        montaApostas(uid);


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


// user database
const usuarios = collection(db, "Usuarios");


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


