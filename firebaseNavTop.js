// Add Firebase products that you want to use
import { getProfileImgUrl, getUserId } from "./database/interfaces/database.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js'
import { getStorage, ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js'
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
    measurementId: "G-Y88GY87Q7M",
    storageBucket: 'palpiteiro-5fe03.appspot.com'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Inicialize Storage Bucket
const storage = getStorage(app);
const storageRef = ref(storage);
const perfilRef = ref(storage, 'perfil');

//auth and firestore references
const auth = getAuth();
const db = getFirestore(app);



async function getProfileImage(id, ext) {

    var caminhoImg = "perfil/" + id + ext;

    console.log(caminhoImg);

    var reference = ref(storage, caminhoImg);

    // Get the download URL
    getDownloadURL(reference)
        .then((url) => {
            // Insert url into an <img> tag to "download"
            const img = document.getElementById('img-perfil');
            img.setAttribute('src', url);

        })
        .catch((error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/object-not-found':
                    // File doesn't exist
                    const img = document.getElementById('img-perfil');
                    img.style.display = "none";
                    const icon = document.getElementById('usuario-nav');
                    icon.style.display = "block";
                    icon.href = "perfil.html"
                    break;
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;

            }
        });
};



async function getData(id) {
    const usuario = await getDoc(doc(db, "Usuarios", id));
    const usuarioData = usuario.data();

    const greens = usuarioData.greens;
    console.log(greens);
    const greensUsuario = document.getElementById("greens-usuario-nav");
    greensUsuario.innerHTML = `${greens}`;

    const reds = usuarioData.reds;
    console.log(reds);
    const redsUsuario = document.getElementById("reds-usuario-nav");
    redsUsuario.innerHTML = `${reds}`;

    const pontos = usuarioData.pontosTemporada;
    console.log(pontos);
    const pontosUsuario = document.getElementById("pontos-usuario-nav");
    pontosUsuario.innerHTML = `${pontos}`;


    const ext = usuarioData.imgExt;
    // Get the download URL
    getProfileImage(id, ext);

    return;
};

//keep track of user logged in or out
onAuthStateChanged(auth, async (user) => {

    //usuario logou
    if (user) {

        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log(user);
        var uid = user.uid;

        await getData(uid);

        document.getElementById("aceita").addEventListener("click", console.log("teste"));


    }

    //usuario nao esta logado
    else {


        console.log("User is not signed");


    }
});

