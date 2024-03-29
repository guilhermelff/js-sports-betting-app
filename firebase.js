// Add Firebase products that you want to use
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js'
import { getFirestore, collection, getDocs, setDoc, doc } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js'

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

//puxar os dados
const querySnapshot = await getDocs(collection(db, "Rodadas", "1", "Jogos"));

//div jogos da rodada
const jogosRodada = document.getElementById("jogos-rodada");

//montar cada card de jogo
let html = '';
querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    const jogo = doc.data();
    const card = `
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
                                                                            <option class="btn-selection"
                                                                                data-jogo="${jogo.casa} x ${jogo.fora}"
                                                                                data-selection="Gol - Jogador 1 - ${jogo.casa}"
                                                                                data-pontuacao="4">Jogador 1 - ${jogo.casa}
                                                                            </option>
                                                                            <option class="btn-selection"
                                                                                data-jogo="${jogo.casa} x ${jogo.fora}"
                                                                                data-selection="Gol - Jogador 2 - ${jogo.casa}"
                                                                                data-pontuacao="3">Jogador 2 - ${jogo.casa}
                                                                            </option>
                                                                        </optgroup>
                                                                        <optgroup label="${jogo.fora}">
                                                                            <option class="btn-selection"
                                                                                data-jogo="${jogo.casa} x ${jogo.fora}"
                                                                                data-selection="Gol - Jogador 1 - ${jogo.fora}"
                                                                                data-pontuacao="4">Jogador 1 - ${jogo.fora}
                                                                            </option>
                                                                            <option class="btn-selection"
                                                                                data-jogo="${jogo.casa} x ${jogo.fora}"
                                                                                data-selection="Gol - Jogador 2 - ${jogo.fora}"
                                                                                data-pontuacao="3">Jogador 2 - ${jogo.fora}
                                                                            </option>
                                                                        </optgroup>
                                                                    </select>
                                                                </div>


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
                                                                            <option data-jogo="${jogo.casa} x ${jogo.fora}"
                                                                                data-selection="Cartão - Jogador 1 - ${jogo.casa}"
                                                                                data-pontuacao="4">
                                                                                Jogador 1 - ${jogo.casa}
                                                                            </option>
                                                                            <option data-jogo="${jogo.casa} x ${jogo.fora}"
                                                                                data-selection="Cartão - Jogador 2 - ${jogo.casa}"
                                                                                data-pontuacao="3">
                                                                                Jogador 2 - ${jogo.casa}
                                                                            </option>
                                                                        </optgroup>

                                                                        <optgroup label="${jogo.fora}">
                                                                            <option data-jogo="${jogo.casa} x ${jogo.fora}"
                                                                                data-selection="Cartão - Jogador 1 - ${jogo.fora}"
                                                                                data-pontuacao="4">
                                                                                Jogador 1 - ${jogo.fora}
                                                                            </option>
                                                                            <option data-jogo="${jogo.casa} x ${jogo.fora}"
                                                                                data-selection="Cartão - Jogador 2 - ${jogo.fora}"
                                                                                data-pontuacao="3">
                                                                                Jogador 2 - ${jogo.fora}
                                                                            </option>
                                                                        </optgroup>
                                                                    </select>
                                                                </div>





                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    `;
    html += card;
});

//adicionar cards a div de jogos da rodada
jogosRodada.innerHTML = html;



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