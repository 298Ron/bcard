import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { getFavorites, removeFromFavorites } from "../services/favCardService";
import { successMsg } from "../services/feedbacksService";
import { Link } from "react-router-dom";
import { render } from "react-dom";

interface FavCardsProps {
    userInfo: any
}

const FavCards: FunctionComponent<FavCardsProps> = ({ userInfo, }) => {


    let [cardChanged, setCardsChanged] = useState<boolean>(false);
    let userId: number = JSON.parse(sessionStorage.getItem("userInfo") as string).userId

    let [favCards, setFavCards] = useState<Card[]>([]);
    useEffect(() => {
        getFavorites(userId)
            .then((res) => { setFavCards(res.data[0].cards) })
            .catch((err) => console.log(err))
    }, [cardChanged]);
    let render = () => {
        setCardsChanged(!cardChanged)
    }
    let handleRemove = (userId: number, cardId: number) => {
        removeFromFavorites(userId, cardId)
            .then((res) => render())
            .catch((err) => console.log(err)
            )
    }
    return (
        <div className="container my-5" >
            <h4 className="display-4 ">FAVORITE CARDS</h4>
            <p className="border-bottom border-dark pb-3">Here you can find your favorite business cards</p>
            <div className="row">
                {favCards.length ? (
                    <div className="row " style={{ margin: "0 auto" }}>
                        {favCards.map((card: Card) => (
                            <div className="card col-md-4 mx-4 shadow" style={{ width: "18rem", }} key={card.id}>
                                <img src={card.image} className="card-img-top object-fit-covers mt-3" alt={card.title} style={{ width: "16.5rem", height: "16.5rem" }} />
                                <div className="card-body">
                                    <h5 className="card-title">{card.title}</h5>
                                    <p className="card-text">{card.paragraph}</p>
                                    <Link to="" onClick={() => handleRemove(userId, Number(card.id))}><i className="fa-solid mx-5 fa-trash text-danger" ></i></Link>
                                    {userInfo.role == "isAdmin" && (<Link to={`/cards/edit/${card.id}`}><i className="fa-solid fa-pen  text-warning"></i></Link>)}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (<p>There is no cards to display</p>)}
            </div>
        </div>
    )
}

export default FavCards;