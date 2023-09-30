import { firebaseConfig, app, storage, storageRef, perfilRef, auth, db } from "./settings.js";
import { getStorage, ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js'
import { getFirestore, collection, getDocs, setDoc, doc, collectionGroup, query, where, getDoc, updateDoc, increment, addDoc } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js'
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js'



