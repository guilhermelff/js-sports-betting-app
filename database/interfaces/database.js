import { loadFirebaseRanking, getProfileImgUrlFirebase, getUserIdFirebase, getUserNameFirebase, retrieveUserFirebase, getDataFromIdFirebase } from "../firebase/load.js";
import { addFriendFirebase, sendInviteFirebase } from "../firebase/upload.js";
import { database } from "./settings.js";

export async function retrieveUser(username) {
    if (database == "firebase") {
        const iduser = await retrieveUserFirebase(username);
        return iduser;
    };
}

export async function getDataFromId(id) {
    if (database == "firebase") {
        const data = await getDataFromIdFirebase(id);
        return data;
    };
}

export async function loadRankingJSONFromDatabase(database, period) {
    if (database == "firebase") {
        const ranking = await loadFirebaseRanking(period);
        return ranking;
    };

}

export async function getProfileImgUrl(userId, fileExt) {
    if (database == "firebase") {
        const url = await getProfileImgUrlFirebase(userId, fileExt);
        if (url) return url;
        else return null;
    }
}

export async function getUserId() {
    if (database == "firebase") {
        const userId = await getUserIdFirebase();
        console.log("GET USER ID");
        console.log(userId);
        return userId;
    }
}

export async function getUserName() {
    if (database == "firebase") {
        const userName = await getUserNameFirebase();
        return userName;
    }
}

export async function addFriend(friendId) {
    if (database == "firebase") {
        const userId = await getUserIdFirebase();
        addFriendFirebase(userId, friendId);

    }
}

export async function sendInvite(friendId, userName) {
    if (database == "firebase") {
        const userId = await getUserIdFirebase();
        sendInviteFirebase(friendId, userId, userName);
    }
}

