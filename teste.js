import { loadRanking } from "./scripts/ranking.js";
import { addAlert } from "./scripts/alert.js";
import { getProfileImgUrl, getUserId } from "./database/interfaces/database.js";

const userID = await getUserId();

console.log(addAlert(userID));