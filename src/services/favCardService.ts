import axios from "axios";
import Card from "../interfaces/Card";
import Product from "../interfaces/Card";
import { errorMsg, successMsg } from "./feedbacksService";
let api: string = `${process.env.REACT_APP_API}/favCards`

// get cart by id
export function getFavorites(userId: number) {
    return axios.get(`${api}?userId=${userId}&active=true`)
};
// create cart
export function createFavCardList(userId: number) {
    return axios.post(api, { userId, cards: [] })
};
// add to cart / update cart
export async function addToFavCards(userId: number, cardToAdd: Card) {
    try {

        // 1. search for the exising card 
        let res = await getFavorites(userId);
        // 2. add the favorit card to favorits array
        res.data[0].cards.push({ ...cardToAdd });
        // 3. update the favorits object 
        return axios.patch(`${api}/${res.data[0].userId}`, {
            cards: res.data[0].cards,
        });

    } catch (error) {
        console.log(error);
    }
}
export function checkIfFavorite(userId: number, cardIds: number[]) {
    return axios.get(`${api}/${userId}/cards`, {
        params: {
            cardIds: cardIds.join(','),
        },
    });
}

export async function removeFromFavorites(userId: number, cardId: number) {
    try {
        let res = await getFavorites(userId);
        res.data[0].cards = res.data[0].cards.filter((card: Card) => card.id !== cardId);
        return axios.patch(`${api}/${res.data[0].id}`, {
            cards: res.data[0].cards,
        });
    } catch (error) {
        console.log(error);
    }
}

// Put Card by id
export function updateFavCard(updateCard: Card, id: number) {
    return axios.put(`${api}/${id}`, updateCard);
}