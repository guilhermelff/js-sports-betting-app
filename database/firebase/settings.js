import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js'
import { getStorage, ref } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js'
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js'

export const firebaseConfig = {
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
export const app = initializeApp(firebaseConfig);

//Inicialize Storage Bucket
export const storage = getStorage(app);
export const storageRef = ref(storage);
export const perfilRef = ref(storage, 'perfil');

//auth and firestore references
export const auth = getAuth();
export const db = getFirestore(app);