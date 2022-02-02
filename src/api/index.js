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
    "/molecule" + "?r1=" + r_group_id_A + "&r2=" + r_group_id_B + "&size=" + size
  );
}