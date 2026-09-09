import axios from "axios";

const baseUrl = "http://localhost:3000/persons";

function getAll() {
    return axios.get(baseUrl).then((response) => response.data);
}

function create(obj) {
    return axios.post(baseUrl, obj).then((response) => response.data);
}

function update(id, obj) {
    return axios.put(`${baseUrl}/${id}`, obj).then((response) => response.data);
}

function remove(id) {
    return axios.delete(`${baseUrl}/${id}`);
}

export default { getAll, create, update, remove };
