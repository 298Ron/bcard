import { useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup"
import { getCards, getCardsById, updateCard } from "../services/cardService";
import { successMsg } from "../services/feedbacksService";
import Card from "../interfaces/Card";
interface UpdateCardProps {
    userInfo: any
}

const UpdateCard: FunctionComponent<UpdateCardProps> = ({ userInfo }) => {


    let [card, setCard] = useState<Card>({
        image: "",
        title: "",
        paragraph: "",
        phone: "",
        country: "",
        city: "",
        street: "",
        creatorId: 0,
        houseNumber: ""

    })

    useEffect(() => {
        // get product by id
        getCardsById(3)
            .then((res) => setCard(res.data))
            .catch((err) => console.log(err))
    }, []);
    let { id } = useParams();
    let navigate = useNavigate()
    let formik = useFormik({
        initialValues: { image: card.image, title: card.title, paragraph: card.paragraph, phone: card.phone, country: card.country, city: card.city, street: card.street, houseNumber: card.houseNumber, creatorId: card.creatorId },

        validationSchema: yup.object({
            image: yup.string().url(),
            title: yup.string().required().min(2),
            paragraph: yup.string().required().min(2),
            phone: yup.string().required().min(9).max(12),
            country: yup.string().required().min(3),
            city: yup.string().required().min(3),
            street: yup.string().required().min(3),
            houseNumber: yup.string().required().min(3),
        }),
        enableReinitialize: true,
        onSubmit(values) {
            updateCard(values, Number(id))
                .then((res) => {
                    navigate("/cards")
                    successMsg("Card was updated successfuly!");
                    console.log(values)
                })
                .catch((err) => console.log(err))
        }
    })

    return (
        <>
            <div className="container col-md-8 " style={{ height: "75vh" }}>
                <h4 className="display-4 border-bottom pb-3 mt-5">UPDATE CARD</h4>
                <form className="form" onSubmit={formik.handleSubmit}>
                    <div className="row">
                        {/*LEFT COLUMN*/}
                        <div className="col-md-6">
                            <div className="form-floating mb-3">
                                <input type="text"
                                    name="image"
                                    className="form-control shadow" placeholder="Image url"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.image} />
                                <label className="darkText" >Image url</label>
                                {formik.touched.image && formik.errors.image && (
                                    <small className="text-danger">{formik.errors.image}</small>)}
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text"
                                    name="title"
                                    className="form-control shadow" placeholder="Title"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.title} />
                                <label className="darkText" >Title</label>
                                {formik.touched.title && formik.errors.title && (
                                    <small className="text-danger">{formik.errors.title}</small>)}
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text"
                                    name="paragraph"
                                    className="form-control shadow" placeholder="Description"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.paragraph} />
                                <label className="darkText" >Description</label>
                                {formik.touched.paragraph && formik.errors.paragraph && (
                                    <small className="text-danger">{formik.errors.paragraph}</small>)}
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text"
                                    name="phone"
                                    className="form-control shadow" placeholder="Phone"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone} />
                                <label className="darkText" >Phone</label>
                                {formik.touched.phone && formik.errors.phone && (
                                    <small className="text-danger">{formik.errors.phone}</small>)}
                            </div>
                        </div>
                        {/*RIGHT COLUMN*/}
                        <div className="col-md-6">
                            <div className="form-floating mb-3">
                                <input type="text"
                                    name="country"
                                    className="form-control shadow" placeholder="Country"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.country} />
                                <label className="darkText" >Country</label>
                                {formik.touched.country && formik.errors.country && (
                                    <small className="text-danger">{formik.errors.country}</small>)}
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text"
                                    name="city"
                                    className="form-control shadow" placeholder="City"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.city} />
                                <label className="darkText" >City</label>
                                {formik.touched.city && formik.errors.city && (
                                    <small className="text-danger">{formik.errors.city}</small>)}
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text"
                                    name="street"
                                    className="form-control shadow" placeholder="Street"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.street} />
                                <label className="darkText" >Street</label>
                                {formik.touched.street && formik.errors.street && (
                                    <small className="text-danger">{formik.errors.street}</small>)}
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text"
                                    name="houseNumber"
                                    className="form-control shadow" placeholder="House Number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.houseNumber} />
                                <label className="darkText" >House Number</label>
                                {formik.touched.houseNumber && formik.errors.houseNumber && (
                                    <small className="text-danger">{formik.errors.houseNumber}</small>)}
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success w-25 mb-3" disabled={!formik.isValid || !formik.dirty}>Update card</button>
                </form>
            </div>
        </>
    )
}

export default UpdateCard;