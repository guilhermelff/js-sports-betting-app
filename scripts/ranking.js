import { loadRankingJSON } from "../database/interfaces/json.js";

/**
 * returns ranked users from database, based on period
 * @param  {string} period "Semanal" for week, "Temporada" for whole season
 * @return {array}         [[points, user, id], ...] ordered list of users, by points
 */
export async function loadRanking(period) {
    const json = await loadRankingJSON(period);
    var values = Object.values(json);
    var string = values[0];
    var array = JSON.parse(string);

    return array;
};