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

const ligas = collection(db, "Ligas");

onAuthStateChanged(auth, (user) => {
    if (document.querySelector('#form-liga') != null) {

        const formLiga = document.querySelector('#form-liga');

        formLiga.addEventListener('submit', async (e) => {
            e.preventDefault();

            //dados liga
            const nome = formLiga['nomeLiga'].value;
            const img = formLiga['imgLiga'].value;
            const imgFile = formLiga['imgLiga'];
            const selectedFile = imgFile.files[0];
            var imgExt = img.substr(img.indexOf('.'));
            const imgNome = "liga/" + nome + imgExt;


            await setDoc(doc(ligas, nome), {

                nome: nome,
                idDono: user.uid,
                numeroParticipantes: 1,
                imgExt: imgExt



            }).then(() => {





                console.log(imgNome);

                const ligaRef = ref(storage, imgNome);

                uploadBytes(ligaRef, selectedFile).then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                    formLiga.reset();
                    window.location.href = 'convida-usuarios.html';
                });

            });


        })

    }


});



