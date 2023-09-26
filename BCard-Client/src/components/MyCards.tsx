import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { deleteCard, getCardsByOwner } from "../services/cardService";
import { successMsg } from "../services/feedbacksService";
import { addRemoveFavorites, getFavorites } from "../services/favCardService";
import { Link, useNavigate } from "react-router-dom";
interface MyCardsProps {
    userInfo: any;
}

const MyCards: FunctionComponent<MyCardsProps> = ({ userInfo }) => {
    let navigate = useNavigate();
    let [cards, setCards] = useState<Card[]>([]);
    let [dataUpdated, setDataUpdated] = useState<boolean>(false);
    let [favorites, setFavorites] = useState<string[]>([])
    let render = () => setDataUpdated(!dataUpdated);
    let handleAddToFavorites = (card: Card) => {
        if (favorites.includes(card._id as string)) {
            addRemoveFavorites(card._id as string)
                .then((res) => {
                    setFavorites(favorites.filter((_id) => _id !== card._id))
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
    let removeCard = (card: Card) => {
        if (window.confirm("Are you sure?") === true) {
            deleteCard(card._id as string)
                .then((res) => {
                    render();
                    successMsg("Card deleted successfully!")
                    navigate("/cards")
                })
                .catch((err) => console.log(err))
        }
    }


    useEffect(() => {
        if (userInfo.userId) {
            getFavorites(userInfo.userId).then((res) => {
                let defaultCardIds: string[] = res.data?.cards.map((card: any) => card._id) || [];
                setFavorites(defaultCardIds)
            }).catch((err) => console.log(err))
        }
        getCardsByOwner()
            .then((res) => {
                setCards(res.data)
            })
            .catch((err) => console.log(err));
    }, [dataUpdated, userInfo.userId]);


    return (
        <>
            <div className="container my-5">
                <h4 className="display-4">CARDS</h4>
                <p className="border-bottom border-dark pb-3">Here you can find business cards from all categories</p>
                <div className="row">
                    {cards.length ? (
                        <div className="row" style={{ margin: "0 auto" }}>
                            {cards.map((card: Card) => (
                                <div className="card my-3 col-md-4 shadow" style={{ width: "18rem", margin: "0 auto" }} key={card._id as string} >
                                    <img src={card.image} onClick={() => navigate(`info/${card._id}`)} className="card-img-top object-fit-cover mt-3" alt={card.title} style={{ width: "16.5rem", height: "16.5rem" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{card.title}</h5>
                                        <p className="card-text">{card.category}</p>
                                        {userInfo.email && (favorites.includes(card._id as string) ? (
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
                                        {((userInfo.role === "isAdmin") || (userInfo.userId === card.creatorId)) && (<Link to={`/cards/edit/${card._id as string}`}><i className="fa-solid fa-pen mx-5 text-warning"></i></Link>)}
                                        {((userInfo.role === "isAdmin") || (userInfo.userId === card.creatorId)) && (<Link to="" onClick={() => removeCard(card)} ><i className="fa-solid fa-trash text-danger ms-3" ></i></Link>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (<p style={{ height: "40vh" }}>There is no cards to display</p>)}
                </div>
                {(userInfo.role === "isBusiness" || userInfo.role === "isAdmin") && (<Link to="add" className="btn text-light rounded-5 fw-bold position-fixed end-0 m-3 newCard" style={{ top: "70%" }}><i className="fa-solid fa-plus me-2"></i>Add card</Link>)}
            </div>

        </>
    )
};

export default MyCards;