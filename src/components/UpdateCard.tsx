import { useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup"
import { getCardsById, updateCard } from "../services/cardService";
import { successMsg } from "../services/feedbacksService";
import Card from "../interfaces/Card";
interface UpdateCardProps {
    userInfo: any
}

const UpdateCard: FunctionComponent<UpdateCardProps> = ({ userInfo }) => {
    const params = useParams();
    let { id } = useParams();
    let [card, setCard] = useState<Card>({
        image: "",
        title: "",
        description: "",
        phone: "",
        country: "",
        city: "",
        street: "",
        creatorId: "",
        houseNumber: "",
        mapLink: "",
        category: ""

    })

    useEffect(() => {
        // get product by id
        getCardsById(params.id as string)
            .then((res) => setCard(res.data))
            .catch((err) => console.log(err))
    }, [params.id]);

    let navigate = useNavigate()
    let formik = useFormik({
        initialValues: { image: card.image, title: card.title, description: card.description, phone: card.phone, country: card.country, city: card.city, street: card.street, houseNumber: card.houseNumber, creatorId: card.creatorId, mapLink: card.mapLink, category: card.category },

        validationSchema: yup.object({
            image: yup.string().url(),
            title: yup.string().required().min(2),
            description: yup.string().required().min(2),
            phone: yup.string().required().min(9).max(14),
            country: yup.string().required().min(3),
            city: yup.string().required().min(3),
            street: yup.string().required().min(3),
            houseNumber: yup.string().required().min(1),
            category: yup.string().required(),
        }),
        enableReinitialize: true,
        onSubmit(values) {
            updateCard(values, id as string)
                .then((res) => {
                    successMsg("Card was updated successfully!")
                    navigate("/cards")
                })
                .catch((err) => console.log(err)
                )

        }
    })
    let clear = () => {
        formik.resetForm()
    }
    return (
        <>
            <div className="container col-md-8 " style={{ height: "83vh" }}>
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
                                    name="description"
                                    className="form-control shadow" placeholder="Description"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description} />
                                <label className="darkText" >Description</label>
                                {formik.touched.description && formik.errors.description && (
                                    <small className="text-danger">{formik.errors.description}</small>)}
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
                            <div className="form-floating mb-3">
                                <input type="text"
                                    name="category"
                                    className="form-control shadow" placeholder="category"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.category} />
                                <label className="darkText" >Category</label>
                                {formik.touched.category && formik.errors.category && (
                                    <small className="text-danger">{formik.errors.category}</small>)}
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
                            <div className="form-floating mb-3">
                                <input type="text"
                                    name="mapLink"
                                    className="form-control" placeholder="Map URL"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.mapLink} />
                                <label className="darkText ms-2" >Map URL</label>
                                {formik.touched.mapLink && formik.errors.mapLink && (
                                    <small className="text-danger">{formik.errors.mapLink}</small>)}
                            </div>
                        </div>

                    </div>
                    <button type="submit" className="btn btn-success w-50 mb-3" disabled={!formik.isValid || !formik.dirty}>Update card</button>
                </form>
                <button className="btn btn-primary col-md-3 mx-1 mb-3" onClick={clear}>Restore last saved</button>
                <NavLink to="/cards" className="btn btn-danger col-md-3 mx-1 mb-3">Cancel</NavLink>

            </div>
        </>
    )
}

export default UpdateCard;