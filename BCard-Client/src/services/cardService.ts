import axios from "axios";
import Card from "../interfaces/Card";

let api: string = `${process.env.REACT_APP_API}/cards`;

// GET all Card
export function getCards() {
    return axios.get(api);
}

// Get Specific Card by id
export function getCardsById(_id: string) {
    return axios.get(`${api}/${_id}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}


// Post new Card
export function addCard(newCard: Card) {
    return axios.post(`${api}`, newCard, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string
            ).token,
        }
    });
}
export function getCardsByOwner() {
    return axios.get(`${api}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}
// Put Card by _id
export function updateCard(updateCard: Card, _id: string) {
    return axios.put(`${api}/${_id}`, updateCard, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string
            ).token,
        }
    });
}

// Delete Card by id
export function deleteCard(_id: string) {
    return axios.delete(`${api}/${_id}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}