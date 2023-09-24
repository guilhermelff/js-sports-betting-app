import { database } from "./settings.js";
import { loadRankingJSONFromDatabase } from "./database.js";

export async function loadRankingJSON(period) {
    const rankingJSON = await loadRankingJSONFromDatabase(database, period);
    return rankingJSON;
}