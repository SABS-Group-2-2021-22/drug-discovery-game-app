import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

export function fetchRGroup(id) {
    return client.get('/r-group-' + id);
}

export function fetchMolecule(r_group_id_A, r_group_id_B, size) {
  return client.get(
    "/molecule?r1=" + r_group_id_A + "&r2=" + r_group_id_B + "&size=" + size
  );
}

export function fetchsketchedMolecule(mol_block) {
  return client.get(
    "/sketcher_save_molecule" + "?mol=" + mol_block 
  );
}

export function postSaved(r_group_id_A, r_group_id_B) {
  return client.post(
    "/save?r1=" + r_group_id_A + "&r2=" + r_group_id_B
  );
}

export function fetchDescriptors(r_group_id_A, r_group_id_B) {
  return client.get(
   "/descriptors?r1=" + r_group_id_A + "&r2=" + r_group_id_B
  );
}

export function fetchFilters(r_group_id_A, r_group_id_B) {
  return client.get(
    "/lipinski?r1=" + r_group_id_A + "&r2=" + r_group_id_B
  )
}

// /save?r1=A01&r2=B01
