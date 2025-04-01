import axios from "axios";

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1',
    // http://127.0.0.1:8000/api/v1
    // https://kinotower.polytech.kz/api/v1
})