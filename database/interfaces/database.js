import { loadFirebaseRanking } from "../firebase/load.js";

export async function loadRankingJSONFromDatabase(database, period) {
    if (database == "firebase") {
        const ranking = await loadFirebaseRanking(period);
        return ranking;
    };

}