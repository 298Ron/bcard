import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { addRemoveFavorites, getFavorites } from "../services/favCardService";
import { successMsg } from "../services/feedbacksService";
import { Link, useNavigate } from "react-router-dom";
import { getCards } from "../services/cardService";

interface FavCardsProps {
    userInfo: any
}

const FavCards: FunctionComponent<FavCardsProps> = ({ userInfo }) => {

    let navigate = useNavigate()
    let [cards, setCards] = useState<Card[]>([]);
    let [dataUpdated, setDataUpdated] = useState<boolean>(false);
    let [favorites, setFavorites] = useState<string[]>([])
    let render = () => setDataUpdated(!dataUpdated);
    let handleAddToFavorites = (card: Card) => {
        if (favorites.includes(card._id as string)) {
            addRemoveFavorites(card._id as string)
                .then((res) => {
                    setFavorites(favorites.filter((_id) => _id != card._id));
                    successMsg(`${card.title} business card was removed from favorites!`);
                })
                .catch((err) => { console.log(err); });
        } else {
            addRemoveFavorites(card._id as string)
                .then((res) => {
                    setFavorites([...favorites, card._id as string]);
                    successMsg(`${card.title} business card was added to favorites!`);
                })
                .catch((err) => { console.log(err); });
        }
    };
    // THE PROBLEM IS HERE -->>>>>
    /* TypeError: Cannot read properties of undefined (reading 'map')
    at MyCards.tsx: 29: 1 */

    useEffect(() => {
        getFavorites(userInfo.userId).then((res) => {
            let defaultCardIds: string[] = res.data?.cards.map((card: any) => card._id) || [];
            setFavorites(defaultCardIds)
        }).catch((err) => console.log(err))
    }, [dataUpdated, userInfo.userId]);

    // END OF THE PROBLEM 

    useEffect(() => {
        getCards().then((res) => {
            setCards(res.data.filter((card: Card) => favorites.includes(card._id as string)));
        }).catch((err) => console.log(err));
    }, [favorites]);


    return (
        <div className="container my-5" >
            <h4 className="display-4 ">FAVORITE CARDS</h4>
            <p className="border-bottom border-dark pb-3">Here you can find your favorite business cards</p>
            <div className="row">
                {cards.length ? (
                    <div className="row " style={{ margin: "0 auto" }}>
                        {cards.map((card: Card) => (
                            <div className="card my-3 col-md-4 shadow" style={{ width: "18rem", margin: "0 auto" }} key={card._id}>
                                <img src={card.image} onClick={() => navigate(`/cards/info/${card._id}`)} className="card-img-top object-fit-covers mt-3" alt={card.title} style={{ width: "16.5rem", height: "16.5rem" }} />

                                <div className="card-body">
                                    <h5 className="card-title">{card.title}</h5>
                                    <p className="card-text">{card.description}</p>
                                    {userInfo.email && (favorites.includes(card._id as string) ? (
                                        <Link to="" className="btn col text-danger" onClick={() => {
                                            handleAddToFavorites(card)
                                        }} >
                                            <i className="fa-solid fa-heart"></i>
                                        </Link>
                                    ) : (
                                        <Link to="" className="btn col " onClick={() => { handleAddToFavorites(card) }}    >
                                            <i className="fa-solid fa-heart"></i>
                                        </Link>)
                                    )}

                                    {userInfo.role === "isAdmin" && (<Link to={`/cards/edit/${card._id}`}><i className="fa-solid col-3 fa-pen  text-warning"></i></Link>)}

                                </div>
                            </div>
                        ))}
                    </div>
                ) : (<p style={{ height: "40vh" }}>There is no cards to display</p>)}
            </div>
        </div>
    )
}

export default FavCards;