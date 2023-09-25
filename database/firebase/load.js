import { firebaseConfig, app, storage, storageRef, perfilRef, auth, db } from "./settings.js";
import { getStorage, ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js'
import { getFirestore, collection, getDocs, setDoc, doc, collectionGroup, query, where, getDoc, updateDoc, increment, addDoc } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js'



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