import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { getCards, getCardsById } from "../services/cardService";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import User from "../interfaces/User";

interface CardsInfoProps {
    userInfo: User;
}

const CardsInfo: FunctionComponent<CardsInfoProps> = ({ userInfo }) => {
    let navigate = useNavigate()
    const params = useParams();
    let [cards, setCards] = useState<Card>();
    useEffect(() => {
        getCardsById(Number(params.id))
            .then((res) => {
                setCards(res.data)
            })
            .catch((err) => console.log(err))
    }, []);


    return (
        <>
            <div className="container my-5">
                <h4 className="display-4">{cards?.title}</h4>
                <div className="row my-5" style={{ width: "60%", margin: "0 auto" }}>
                    <img src={cards?.image} alt={cards?.title} style={{ width: "300px", objectFit: "cover" }} className="col-md-6 rounded-5" />

                    <div className="col-md-6 mt-3 fs-3">
                        <h4>{cards?.description}</h4>
                        <h4 className="mt-4 fs-3">Address: {cards?.country}, {cards?.city}, {cards?.street}, {cards?.houseNumber}</h4>
                        <NavLink className="text-light text-decoration-none my-4 " target="_blank" to={`${cards?.mapLink}`}><i className="fa-solid fa-map-location-dot "></i> SEE LOCATION ON MAP</NavLink>
                        <h4 className="mt-4">Phone: {cards?.phone}</h4></div>


                </div>
            </div>
        </>
    )
}

export default CardsInfo;