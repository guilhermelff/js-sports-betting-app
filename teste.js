import { loadRanking } from "./scripts/ranking.js";

(async () => {
    var rankingSemanal = await loadRanking("Semanal");
    var rankingTemporada = await loadRanking("Temporada");

    console.log("Semanal");
    console.log(rankingSemanal);
    console.log("Temporada");
    console.log(rankingTemporada);
})();