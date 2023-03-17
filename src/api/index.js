import axios from "axios";

//const API_BASE_URL = "http://127.0.0.1:5000";
// const API_BASE_URL = 'https://drug-discovery-game-backend.onrender.com';
const API_BASE_URL = 'https://drug-design-game-backend.onrender.com';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    username: localStorage.user,
  },
});

export function loginRequest(username) {
  return client.post("/authenticate", { username });
}

export function logoutRequest() {
  client.defaults.headers["username"] = localStorage.user;
  return client.post("/logout");
}

export function fetchRGroup(id,size) {
  client.defaults.headers["username"] = localStorage.user;
  return client.get("/r-group?rgroup=" + id + "&size=" + size);
}

export function fetchHelp() {
  return client.get("/infotxt");
}

export function fetchMolecule(r_group_id_A, r_group_id_B, size) {
  client.defaults.headers["username"] = localStorage.user;
  return client.get(
    "/molecule?r1=" + r_group_id_A + "&r2=" + r_group_id_B + "&size=" + size
  );
}

export function fetchsketchedMolecule(mol_block) {
  client.defaults.headers["username"] = localStorage.user;
  return client.get("/sketcher_save_molecule" + "?mol=" + mol_block);
}

export function postSaved(r_group_id_A, r_group_id_B) {
  client.defaults.headers["username"] = localStorage.user;
  return client.post("/save?r1=" + r_group_id_A + "&r2=" + r_group_id_B);
}

export function fetchDescriptors(r_group_id_A, r_group_id_B) {
  client.defaults.headers["username"] = localStorage.user;
  return client.get("/descriptors?r1=" + r_group_id_A + "&r2=" + r_group_id_B);
}

export function fetchLipinski(r_group_id_A, r_group_id_B) {
  client.defaults.headers["username"] = localStorage.user;
  return client.get("/lipinski?r1=" + r_group_id_A + "&r2=" + r_group_id_B);
}

export function postChosen(r_group_id_A, r_group_id_B) {
  client.defaults.headers["username"] = localStorage.user;
  return client.post("/choose?r1=" + r_group_id_A + "&r2=" + r_group_id_B);
}

export function postSketchedChosen(id, smiles) {
  client.defaults.headers["username"] = localStorage.user;
  return client.post("/sketcher_choose?id=" + id + "&smiles=" + smiles);
}

export function fetchSketchedSpiderObj() {
  client.defaults.headers["username"] = localStorage.user;
  return client.get("/sketcher_getspiderdata");
}

export function fetchSpiderObj() {
  client.defaults.headers["username"] = localStorage.user;
  return client.get("/getspiderdata");
}

export function fetchSketchedCompText() {
  client.defaults.headers["username"] = localStorage.user;
  return client.get("/sketcher_comparisontxt");
}

export function fetchCompText() {
  client.defaults.headers["username"] = localStorage.user;
  return client.get("/comparisontxt");
}

export function resetGame() {
  client.defaults.headers["username"] = localStorage.user;
  return client.get("/reset");
}

export function saveGame() {
  client.defaults.headers["username"] = localStorage.user;
  return client.get("/save_game_data");
}
