import { loadFirebaseRanking, getProfileImgUrlFirebase, getUserIdFirebase } from "../firebase/load.js";
import { database } from "./settings.js";

export async function loadRankingJSONFromDatabase(database, period) {
    if (database == "firebase") {
        const ranking = await loadFirebaseRanking(period);
        return ranking;
    };

}

export async function getProfileImgUrl(userId, fileExt) {
    if (database == "firebase") {
        const url = await getProfileImgUrlFirebase(userId, fileExt);
        console.log(url);
        return url;
    }
}

export async function getUserId() {
    if (database == "firebase") {
        const userId = await getUserIdFirebase();
        return userId;
    }
}