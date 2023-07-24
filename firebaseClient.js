// Add Firebase products that you want to use
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js'

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
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log(user);
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        console.log("User is not signed");
    }
});

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