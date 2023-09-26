import { loadRanking } from "./scripts/ranking.js";

const alertContainer = document.getElementById("alert-container");

(async () => {
    var lista = document.getElementById("multiple-select-custom-field");

    usuarios = await loadRanking("Temporada");

    const userID = await getUserId();
    console.log("ID USUARIO");
    console.log(userID);



    for (var i = 0; i < rankingSemanal.length; i++) {
        if (rankingSemanal[i][2] == userID) {
            var posicao = i + 1;
            break;
        }
    }

})();