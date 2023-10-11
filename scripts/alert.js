import { auth, db } from '../database/firebase/settings.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js'
import { getProfileImgUrl } from '../database/interfaces/database.js';
import { getFirestore, collection, getDocs, setDoc, doc, collectionGroup, query, where, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js'

var id;

async function aceitaAmizade(idAmigo, idAlerta, id) {
    await setDoc(doc(collection(db, "Usuarios", id, "Amigos"), idAmigo), {

        id: idAmigo

    }).then(async () => {

        await setDoc(doc(collection(db, "Usuarios", idAmigo, "Amigos"), id), {

            id: id

        })

        await deleteDoc(doc(db, "Usuarios", id, "Alertas", idAlerta));
        console.log("amigo adicionado")


    });
}

onAuthStateChanged(auth, (user) => {
    (async () => {

        if (user) {
            id = user.uid;

            const alertContainer = document.getElementById("alerts");

            var alerts = await getDocs(collection(db, "Usuarios", id, "Alertas"));
            alerts.forEach(async (docAlert) => {

                var docRef = doc(db, "Usuarios", id, "Alertas", docAlert.id);

                var alert = docAlert.data();
                console.log("alerta");
                console.log(alert);



                var img = `<img
                                src=""
                                class="rounded-circle mt-2" style="width: 30px; height: 30px;"
                                id="img-notification"
                                alt="-" />`


                const alerta = document.createElement("div");
                alerta.innerHTML = `
                            <div class="row" id="${alert.alertaID}">
                                <div class=" mb-4">
                                    <div class="card">
                                        <div class="card-body">
                                           <div class="modal-body d-flex justify-content-between">
                                                <div>
                                                    ${img}
                                                </div>
                                                <div class="">
                                                    <p id="notification-text" class="px-2 mt-1 mb-0">@${alert.amigoUsuario} quer te adicionar como amigo</p>
                                                    
                                                </div
                                                <div>
                                                    <div class="d-flex justify-content-between mt-1" id="botao-notifica">
                                                        <button class="btn aceita" value="${alert.amigoID}" data-alerta="${alert.alertaID}" data-user="${id}">
                                                            <i class="fa-solid fa-check"></i>
                                                        </button>
                                                        <button class="btn recusa">
                                                            <i class="fa-solid fa-xmark"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;

                alertContainer.appendChild(alerta);


            });

            console.log("ACABOU")

        }

    })().then(() => {

        var aceitas = document.querySelectorAll(".aceita");

        console.log(aceitas);

        document.querySelectorAll('.aceita').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                console.log("clique");
                await aceitaAmizade(btn.value, btn.getAttribute('data-alerta'), btn.getAttribute('data-user'));
                window.location.href = 'notifica.html';

            });
        });
        /*
                for (let i = 0; i < aceitas.length; i++) {
                    console.log(aceitas[i].value);
                    console.log(aceitas[i].getAttribute('data-alerta'));
                    console.log(aceitas[i].getAttribute('data-user'));
        
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        aceitaAmizade(aceitas[i].value, aceitas[i].getAttribute('data-alerta'), aceitas[i].getAttribute('data-user'));
        
                    });
        
                    console.log("evento adicionado");
                }
        */

    });
});


