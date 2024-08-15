import PocketBase from "pocketbase";
const URL = process.env.POCKETBASE_URL;

// Make sure your pocketbase instance's ed_members collection has all of its API Rules set to everyone.
// This is an assessment app, there is no security issue since no authentication is implemented in the first place.

const pb = new PocketBase(URL);

export default pb;
