import { auth, db } from '../database/firebase/settings.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js'
import { getProfileImgUrl } from '../database/interfaces/database.js';
import { getFirestore, collection, getDocs, setDoc, doc, collectionGroup, query, where, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js'

var id;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        id = user.uid;

        async function aceitaAmizade(idAmigo, idAlerta, id) {
            await setDoc(doc(collection(db, "Usuarios", id, "Amigos"), idAmigo), {

                id: idAmigo

            }).then(async () => {

                await deleteDoc(doc(db, "Usuarios", id, "Alertas", idAlerta));
                this.style.display = "none";

            });
        }

        function setEvents() {
            document.getElementById("aceita").addEventListener("click", aceitaAmizade(this.value, this.idAlerta, id));
        };

        window.onload = setEvents();

    }
});