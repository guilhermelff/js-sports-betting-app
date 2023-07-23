import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js'
// Add Firebase products that you want to use
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js'
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js'
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

//signup
const formRegistro = document.querySelector('#form-registro');
formRegistro.addEventListener('submit', (e) => {
    e.preventDefault();

    //dados usuario
    const email = formRegistro['emailPerfil'].value;
    const senha = formRegistro['senhaPerfil'].value;

    // sign up usuario
    createUserWithEmailAndPassword(auth, email, senha)
        .then((cred) => {
            console.log(cred);
            formRegistro.reset();
            window.location.href = 'index.html';
        })
})