import { getProfileImgUrl, getUserId } from "./database/interfaces/database.js";

const userID = await getUserId();

const alertContainer = document.getElementById("alert-container");

export const addAlert = async (userID) => {

    var alerts = await getDocs(collection(db, "Usuarios", userID, "Alertas"));

    alerts.forEach((docAlert) => {

        var docRef = doc(db, "Usuarios", userID, "Alertas", docAlerta.id);

        var alert = docAlert.data();
        console.log(alert);

        /*
        if (aposta.resolvida == false) {
            if (aposta.acertouErrou == true) {
                pontosSemana += aposta.pontos;
                greens += 1;
                setResolvidaTrue(docRef);

            }
            if (aposta.acertouErrou == false) {
                reds += 1;
                setResolvidaTrue(docRef);

            };
        };*/
    });

};

export function alerts() {
    addAlert(userID);
}
