import { pingInterface } from "../database/interfaces/database.js";


export async function ping() {
    console.log("ping interface");
    await pingInterface();

    return;
};