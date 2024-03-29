import { firebaseConfig, app, storage, storageRef, perfilRef, auth, db } from "./settings.js";
import { getStorage, ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js'
import { getFirestore, collection, getDocs, setDoc, doc, collectionGroup, query, where, getDoc, updateDoc, increment, addDoc } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js'
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js'

//get user id
onAuthStateChanged(auth, (user) => {
    if (user) {
        setUserId(user.uid);
    }
});

var userID = "";

async function setUserId(id) {
    userID = id;
}

export async function pingFirebase() {
    const ping = await getDoc(doc(db, "Ping", "ping"));
    console.log("ping");
    return ping;
}

export async function getDataFromIdFirebase(id) {
    const userDoc = await getDoc(doc(db, "Usuarios", id));
    const userData = await userDoc.data();
    return userData;
}

export async function retrieveUserFirebase(username) {

    const userDoc = await getDoc(doc(db, "hashUsuarios", username));
    const userData = await userDoc.data();
    const userID = userData.id;

    if (userID) {
        return userID;
    }
    else alert("Usuario não encontrado");

}

export async function loadFirebaseRanking(period) {
    const rankingDoc = await getDoc(doc(db, "Ranking", period));
    const ranking = rankingDoc.data();
    return ranking;
}

export async function getProfileImgUrlFirebase(id, fileExt) {
    var caminhoImg = "perfil/" + id + fileExt;

    var reference = ref(storage, caminhoImg);

    var link = await getDownloadURL(reference);

    console.log(link);

    return link;
}

export async function getUserIdFirebase() {
    return userID;
}

export async function getUserNameFirebase() {
    const userDoc = await getDoc(doc(db, "Usuarios", userID));
    const userData = await userDoc.data();
    return userData.usuario;
}