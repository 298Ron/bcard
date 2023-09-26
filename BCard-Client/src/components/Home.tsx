import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { getCards } from "../services/cardService";
import { useNavigate } from "react-router-dom";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
    let navigate = useNavigate()
    let [cardChanged, setCardsChanged] = useState<boolean>(false);
    let [cards, setCards] = useState<Card[]>([]);
    useEffect(() => {
        getCards()
            .then((res) => { setCards(res.data) })
            .catch((err) => console.log(err))
    }, [cardChanged]);
    return (
        <>

            <div className="pb-3" style={{ zIndex: "2", backgroundImage: "url(images/ppl.png)", backgroundAttachment: "fixed", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "right", height: "100vh" }}>
                <h3 className="display-3  py-3  w-100 text-dark" >HOME</h3>
                <div className="row w-100" >
                    <h2 className="col-md-6"></h2>

                    <h5 className="ps-5 mb-5  text-dark col-md-6 display-6 fs-4" style={{ height: "100%" }} >Attention business owners and entrepreneurs! Are you ready to take your company to new heights of success? Look no further than BCard. We are a dynamic and innovative company dedicated to helping businesses thrive in today's competitive landscape. By registering on our website, you gain access to a wide range of exclusive benefits and resources tailored to meet your specific needs. From strategic partnerships to industry insights, our platform is designed to empower you and drive your business forward. Don't miss out on this opportunity to unlock growth and discover new possibilities. Join us today and let's embark on a journey of success together!</h5>
                </div>
            </div >
            <div className="py-5">
                <h4 className="display-4 ">OUR BUSINESS GALLERY</h4>
                <p className=" pb-3" style={{ margin: "0 auto" }}>Here you can find business cards from all categories</p>
                <div className="" >
                    {cards.length ? (
                        <div className="row border-top border-dark w-75 column-gap-4" style={{ margin: "0 auto" }}>
                            {cards.map((card: Card) => (
                                <div className="card col-md-4 my-4 shadow" style={{ width: "18rem", margin: "0 auto" }} key={card._id}>
                                    <img src={card.image} onClick={() => navigate(`/cards/info/${card._id}`)} className="card-img-top object-fit-cover mt-2" alt={card.title} style={{ width: "16.5rem", height: "16.5rem" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{card.title}</h5>
                                        <p className="card-text">{card.description}</p>

                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (<p>There is no cards to display</p>)}
                </div>
            </div>
        </>
    )
};


export default Home;