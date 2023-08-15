// Add Firebase products that you want to use
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js'
import { getFirestore, collection, getDocs, setDoc, doc, collectionGroup, query, where, getDoc, updateDoc, increment } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js'


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

// user database
const usuarios = await getDocs(collection(db, "Usuarios"));

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

async function atribuiPontuacao(uid, pontosSemanaRodada, greensRodada, redsRodada) {
    const docRef = doc(db, "Usuarios", uid);

    await updateDoc(docRef, {
        greens: increment(greensRodada),
        reds: increment(redsRodada),
        pontosSemana: pontosSemanaRodada,
        pontosTemporada: increment(pontosSemanaRodada)

    });

    console.log("pontos atribuidos");

};

async function setResolvidaTrue(docRefAposta) {
    var docRef = docRefAposta;

    await updateDoc(docRef, {
        resolvida: true
    });
};

//metodo para resolver as apostas do usuario
async function resolveApostasUsuario(uid) {
    var apostas = await getDocs(collection(db, "Usuarios", uid, "Apostas"));

    var pontosSemana = 0;
    var greens = 0;
    var reds = 0;

    console.log(uid);

    apostas.forEach((docAposta) => {

        var docRef = doc(db, "Usuarios", uid, "Apostas", docAposta.id);

        var aposta = docAposta.data();
        console.log(aposta.acertouErrou);

        if (aposta.resolvida == false) {
            if (aposta.acertouErrou == true) {
                pontosSemana += aposta.pontos;
                greens += 1;
                setResolvidaTrue(docRef);

            }
            if (aposta.acertouErrou == false) {
                reds += 1;
                setResolvidaTrue(docRef);

            };
        };
    });

    atribuiPontuacao(uid, pontosSemana, greens, reds);
};

// metodo para resolver as apostas feitas
async function resolveApostas() {
    //acessa cada usuário
    usuarios.forEach((doc) => {
        //resolve as apostas do usuário
        resolveApostasUsuario(doc.id);
    });
}

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


        const botaoResolveApostas = document.getElementById('resolver-apostas');
        botaoResolveApostas.addEventListener('click', function () {
            resolveApostas();
        });

        const botaoInsereJogo = document.getElementById('inserir-jogo');
        botaoInsereJogo.addEventListener('click', function (e) {
            e.preventDefault();

            fetch('./web-scraping/jsonData/times.json')
                .then((response) => response.json())
                .then((json) => console.log(json));



            /*
            calculaPontos(casa, fora);
            insereJogo(casa, fora, pontosCasa, pontosEmpate, pontosFora);
            */

        });



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