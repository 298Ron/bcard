import axios from "axios";
import Card from "../interfaces/Card";

let api: string = `${process.env.REACT_APP_API}/cards`;

// GET all Card
export function getCards() {
    return axios.get(api);
}

// Get Specific Card by id
export function getCardsById(id: number) {
    return axios.get(`${api}/${id}`);
}

// Post new Card
export function addCard(newCard: Card) {
    return axios.post(api, newCard);
}

// Put Card by id
export function updateCard(updateCard: Card, id: number) {
    return axios.put(`${api}/${id}`, updateCard);
}

// Delete Card by id
export function deleteCard(id: number) {
    return axios.delete(`${api}/${id}`)
}