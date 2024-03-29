import { firebaseConfig, app, storage, storageRef, perfilRef, auth, db } from "./settings.js";
import { getStorage, ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js'
import { getFirestore, collection, getDocs, setDoc, doc, collectionGroup, query, where, getDoc, updateDoc, increment, addDoc } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js'
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js'


export async function addFriendFirebase(userId, friendId) {
    setDoc(doc(db, "Usuarios", userId, "Amigos", friendId), {

        id: friendId

    }).then(() => {

        alert("Amigo adicionado")
    });
}

export async function sendInviteFirebase(friendId, userId, userName) {

    var alertId = friendId + "-" + userName;
    console.log(alertId);

    setDoc(doc(db, "Usuarios", friendId, "Alertas", alertId), {

        amigoID: userId,
        amigoUsuario: userName,
        tipo: "addAmigo",
        alertaID: alertId


    }).then(() => {

        alert("Convite enviado")
    });
}