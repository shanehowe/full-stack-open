import axios from "axios";

// const baseUrl = "http://localhost:3001"
const baseUrl = "https://pure-garden-14225.herokuapp.com"

const getAll = () => {
    const request = axios.get(baseUrl + '/api/persons')
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const create = (newObject) => {
    return axios.post(`${baseUrl}/api/persons`, newObject)
}

const personsServices = { getAll, update, create }

export default personsServices
