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

// user database
const usuarios = collection(db, "Usuarios");



//signup and login
if (document.querySelector('#form-registro') != null) {

    const formRegistro = document.querySelector('#form-registro');

    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault();

        //dados usuario
        const email = formRegistro['emailPerfil'].value;
        const senha = formRegistro['senhaPerfil'].value;
        const repitaSenha = formRegistro['repitaSenhaPerfil'].value;
        const usuario = formRegistro['usuarioPerfil'].value;

        // sign up and login usuario

        if (senha === repitaSenha) {

            createUserWithEmailAndPassword(auth, email, senha)
                .then((cred) => {

                    console.log(cred);

                    return setDoc(doc(usuarios, cred.user.uid), {

                        email: email,
                        usuario: usuario,
                        greens: 0,
                        pontosSemana: 0,
                        pontosTemporada: 0,
                        reds: 0

                    }).then(() => {
                        formRegistro.reset();
                        window.location.href = 'index.html';
                    });


                })
        }
        else {
            alert('Senhas diferentes');
        }



    })
}

