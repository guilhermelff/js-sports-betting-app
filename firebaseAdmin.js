// Add Firebase products that you want to use
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js'
import { getFirestore, collection, getDocs, setDoc, doc, collectionGroup, query, where, getDoc, updateDoc, increment, addDoc } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js'



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


var melhoresSemana = [];
var melhoresTemporada = [];
var qntSemana = 0;
var qntTemporada = 0;

async function insereRanking(userData, id) {

    melhoresSemana.push([userData.pontosSemana, userData.usuario, id, userData.imgExt]);
    melhoresSemana = melhoresSemana.sort(function (a, b) { return b[0] - a[0] });

    melhoresTemporada.push([userData.pontosTemporada, userData.usuario, id, userData.imgExt]);
    melhoresTemporada = melhoresTemporada.sort(function (a, b) { return b[0] - a[0] });

}

// metodo para resolver as apostas feitas
async function resolveApostas() {

    //acessa cada usuário
    usuarios.forEach((document) => {

        //resolve as apostas do usuário
        resolveApostasUsuario(document.id);

        //insere no ranking
        var userData = document.data();
        console.log(userData);
        insereRanking(userData, document.id);
    })

    console.log("Temporada");
    console.log(qntTemporada);
    console.log(melhoresTemporada);
    console.log("Semana");
    console.log(qntSemana);
    console.log(melhoresSemana)

    const jsonMelhoresTemporada = JSON.stringify(melhoresTemporada);
    const jsonMelhoresSemana = JSON.stringify(melhoresSemana);

    const Ranking = collection(db, "Ranking");

    await setDoc(doc(Ranking, "Semanal"), {

        ranking: jsonMelhoresSemana

    })

    await setDoc(doc(Ranking, "Temporada"), {

        ranking: jsonMelhoresTemporada

    })




    //montarRanking(melhoresTemporada);

}

async function insereJogo(posicaoEResultados, casa, fora, data) {
    //CONTINUA DAQUI!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    rodadas.forEach((documento) => {

        //dados rodada
        const rodada = documento.data();

        var pontosCasa = 0;
        var pontosFora = 0;
        var soma = 0;

        var oddCasa = 0;
        var oddFora = 0;
        var empate = 0;

        var bonusPosicaoCasa = 0;
        var bonusResultadosCasa = 0;
        var bonusMandoCasa = 4;

        var bonusPosicaoFora = 0;
        var bonusResultadosFora = 0;

        console.log(posicaoEResultados.length);

        for (var i = 0; i < posicaoEResultados.length; i++) {
            console.log(posicaoEResultados[i].nome);
            if (posicaoEResultados[i].nome == casa) {

                var posicao = parseInt(posicaoEResultados[i].posicao);
                bonusPosicaoCasa = ((20 - posicao) * 4) + 20;
                console.log("bonusPosicaoCasa = " + bonusPosicaoCasa);

                var vitorias = 0;
                var derrotas = 0;

                for (var j = 0; j < posicaoEResultados[i].ultimosResultados.length; j++) {

                    if (posicaoEResultados[i].ultimosResultados[j] == 'w') {
                        vitorias += 1;
                    }

                    if (posicaoEResultados[i].ultimosResultados[j] == 'l') {
                        derrotas += 1;
                    }
                }

                console.log("vitorias = " + vitorias);
                console.log("derrotas = " + derrotas);
                if (vitorias > 2) {
                    bonusResultadosCasa = 8;
                }

                if (derrotas > 3) {
                    bonusResultadosCasa = -8;
                }
            }

            if (posicaoEResultados[i].nome == fora) {
                var posicao = parseInt(posicaoEResultados[i].posicao);
                bonusPosicaoFora = ((20 - posicao) * 4) + 20;

                var vitorias = 0;
                var derrotas = 0;

                for (var j = 0; j < posicaoEResultados[i].ultimosResultados.length; j++) {

                    if (posicaoEResultados[i].ultimosResultados[j] == 'w') {
                        vitorias += 1;
                    }

                    if (posicaoEResultados[i].ultimosResultados[j] == 'l') {
                        derrotas += 1;
                    }
                }

                if (vitorias > 2) {
                    bonusResultadosFora = 8;
                }

                if (derrotas > 3) {
                    bonusResultadosCasa = -8;
                }
            }
        }

        pontosCasa = bonusPosicaoCasa + bonusResultadosCasa + bonusMandoCasa;
        pontosFora = bonusPosicaoFora + bonusResultadosFora;

        soma = pontosCasa + pontosFora;
        oddCasa = (soma / pontosCasa) * 10;
        oddFora = (soma / pontosFora) * 10;
        empate = (oddCasa + oddFora) / 2;

        if (rodada.abertaFechada == true) {

            console.log("entrou");
            console.log(rodada.numero);

            addDoc(collection(db, "Rodadas", rodada.numero, "Jogos"), {

                casa: casa,
                data: data,
                fora: fora,
                jogo: casa + " x " + fora,
                rodada: rodada.numero,
                pontosCasa: parseInt(oddCasa),
                pontosEmpate: parseInt(empate),
                pontosFora: parseInt(oddFora)

            }).then(() => {
                alert('Jogo inserido');
            });


        }

    });

};

async function insereJogador(time, nome, pontosGol, pontosCartao) {

    setDoc(doc(db, "Times", time, "Jogadores", nome), {

        nome: nome,
        pontosCartao: parseInt(pontosCartao),
        pontosGol: parseInt(pontosGol),
        time: time

    }).then(() => {
        alert('Jogador inserido');
    });
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


        const botaoResolveApostas = document.getElementById('resolver-apostas');
        botaoResolveApostas.addEventListener('click', function () {
            resolveApostas();
        });

        const formInsereJogo = document.querySelector('#form-insere-jogo');
        formInsereJogo.addEventListener('submit', (e) => {
            e.preventDefault();

            //dados jogo
            const casa = formInsereJogo['select-casa'].value;
            const fora = formInsereJogo['select-fora'].value;
            const data = formInsereJogo['select-data'].value;

            fetch('./web-scraping/data/times.json')
                .then((response) => response.json())
                .then((json) => {
                    var posicaoEResultados = [];
                    posicaoEResultados = json;
                    console.log(posicaoEResultados);
                    console.log(casa);
                    console.log(fora);
                    console.log(data);

                    insereJogo(posicaoEResultados, casa, fora, data);

                });
        });

        const formInsereJogador = document.querySelector('#form-insere-jogador');
        formInsereJogador.addEventListener('submit', (e) => {
            e.preventDefault();

            //dados jogador
            const time = formInsereJogador['select-time'].value;
            const nome = formInsereJogador['insere-nome'].value;
            const pontosGol = formInsereJogador['insere-pontos-gol'].value;
            const pontosCartao = formInsereJogador['insere-pontos-cartao'].value;

            insereJogador(time, nome, pontosGol, pontosCartao);
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