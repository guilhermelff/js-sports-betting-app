// Add Firebase products that you want to use
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js'
import { getStorage, ref, uploadBytes } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js'
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

//auth and firestore references
const auth = getAuth();
const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

// Create a storage reference from our storage service
const storageRef = ref(storage);

// user database
const usuarios = collection(db, "Usuarios");
const hashUsuarios = collection(db, "hashUsuarios");



//signup and login
if (document.querySelector('#form-registro') != null) {

    const formRegistro = document.querySelector('#form-registro');

    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault();

        //dados usuario
        var email = formRegistro['emailPerfil'].value.trim();
        const senha = formRegistro['senhaPerfil'].value;
        const repitaSenha = formRegistro['repitaSenhaPerfil'].value;
        var usuario = formRegistro['usuarioPerfil'].value.trim();
        const img = formRegistro['imgPerfil'].value;
        const imgFile = formRegistro['imgPerfil'];
        const selectedFile = imgFile.files[0];


        // sign up and login usuario

        if (senha === repitaSenha) {

            createUserWithEmailAndPassword(auth, email, senha)
                .then((cred) => {

                    console.log(cred);

                    return setDoc(doc(hashUsuarios, usuario), {

                        id: cred.user.uid

                    }).then(() => {

                        setDoc(doc(usuarios, cred.user.uid), {

                            email: email,
                            usuario: usuario,
                            id: cred.user.uid,
                            greens: 0,
                            pontosSemana: 0,
                            pontosTemporada: 0,
                            reds: 0,
                            imgExt: img.substr(img.indexOf('.')),
                            fezAposta: false

                        })

                        var imgExt = img.substr(img.indexOf('.'));

                        const imgNome = "perfil/" + cred.user.uid + imgExt;
                        console.log(imgNome);

                        const perfilRef = ref(storage, imgNome);

                        uploadBytes(perfilRef, selectedFile).then((snapshot) => {
                            console.log('Uploaded a blob or file!');
                            formRegistro.reset();
                            window.location.href = 'index.html';
                        });

                    });


                })


        }
        else {
            alert('Senhas diferentes');
        }



    })
}

