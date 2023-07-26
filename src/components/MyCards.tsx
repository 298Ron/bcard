import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { deleteCard, getCards } from "../services/cardService";
import { successMsg } from "../services/feedbacksService";
import { addToFavCards, getFavorites, removeFromFavorites } from "../services/favCardService";
import { Link } from "react-router-dom";
interface MyCardsProps {
    userInfo: any;
}

const MyCards: FunctionComponent<MyCardsProps> = ({ userInfo }) => {
    let [favorites, setFavorites] = useState<number[]>([])
    let [cards, setCards] = useState<Card[]>([])
    let [cardChanged, setCardsChanged] = useState<boolean>(false);
    let handleAddToFavorites = (card: Card) => {
        if (favorites.includes(card.id as number)) {
            removeFromFavorites(userInfo.userId, card.id as number)
                .then((res) => {
                    setFavorites(favorites.filter((id) => id !== card.id));
                    successMsg(`${card.title} business card was removed from favorites!`);
                })
                .catch((err) => { console.log(err); });
        } else {
            addToFavCards(userInfo.userId, card)
                .then((res) => {
                    setFavorites([...favorites, card.id as number]);
                    successMsg(`${card.title} business card was added to favorites!`);
                })
                .catch((err) => { console.log(err); });
        }
    };


    useEffect(() => {
        getFavorites(userInfo.userId).then((res) => {
            let userFavorites = res.data.find((fav: any) => fav.userId === userInfo.userId);
            console.log(userFavorites);
            let defaultCardIds: number[] = userFavorites?.cards.map((card: any) => card.id) || [];
            console.log(defaultCardIds);
            setFavorites(defaultCardIds)
        }).catch((err) => console.log(err))
        getCards().then((res) => setCards(res.data)).catch((err) => console.log(err));

    }, [cardChanged, userInfo.userId]);

    let userId: number = JSON.parse(sessionStorage.getItem("userInfo") as string).userId

    return (
        <>
            <div className="container my-5">
                <h4 className="display-4">CARDS</h4>
                <p className="border-bottom border-dark pb-3">Here you can find business cards from all categories</p>
                <div className="row">
                    {cards.length ? (
                        <div className="row " style={{ margin: "0 auto" }}>
                            {cards.map((card: Card) => (
                                <div className="card col-md-4 m-5 shadow" style={{ width: "18rem", }} key={card.id}>
                                    <img src={card.image} className="card-img-top object-fit-cover mt-3" alt={card.title} style={{ width: "16.5rem", height: "16.5rem" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{card.title}</h5>
                                        <p className="card-text">{card.paragraph}</p>
                                        {userInfo.email && (favorites.includes(card.id as number) ? (
                                            <Link to="" className="btn col text-success" onClick={() => {
                                                handleAddToFavorites(card);
                                            }}    >
                                                <i className="fa-solid fa-heart"></i>
                                            </Link>
                                        ) : (
                                            <Link to="" className="btn col" onClick={() => { handleAddToFavorites(card); }}    >
                                                <i className="fa-solid fa-heart"></i>
                                            </Link>)
                                        )}
                                        {userInfo.role == "isAdmin" || userId === card.creatorId && (<Link to={`/cards/${card.id}`}><i className="fa-solid fa-pen mx-5 text-warning"></i></Link>)}
                                        {userInfo.role == "isAdmin" || userId === card.creatorId && (<Link to="" ><i className="fa-solid fa-trash text-danger ms-3" ></i></Link>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (<p>There is no cards to display</p>)}
                </div>
                {(userInfo.role == "isBusiness" || userInfo.role == "isAdmin") && (<Link to="add" className="btn btn-dark rounded-5 fw-bold position-fixed end-0 m-3" style={{ top: "70%" }}><i className="fa-solid fa-plus me-2"></i>Add card</Link>)}
            </div>

        </>
    )
};

export default MyCards;