import { useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import * as yup from "yup";
import { deleteUserById, getUserDetails, updateUser } from "../services/usersService";
import { NavLink, useNavigate } from "react-router-dom";
import { successMsg } from "../services/feedbacksService";
import User from "../interfaces/User";

interface ProfileProps {
    userInfo: any;
    setUserInfo: Function;
}

const Profile: FunctionComponent<ProfileProps> = ({ userInfo, setUserInfo }) => {


    let userId = JSON.parse(
        sessionStorage.getItem("userInfo") as string
    ).userId;
    let [user, setUser] = useState<User>({ firstName: "", middleName: "", lastName: "", phone: "", email: "", password: "", imageUrl: "", imageAlt: "", state: "", country: "", city: "", street: "", houseNumber: "", zip: "", role: "", });

    let formik = useFormik({
        initialValues: { firstName: user.firstName, middleName: user.middleName, lastName: user.lastName, phone: user.phone, email: user.email, password: user.password, imageUrl: user.imageUrl, imageAlt: user.imageAlt, state: user.state, country: user.country, city: user.city, street: user.street, houseNumber: user.houseNumber, zip: user.zip, role: user.role, },
        enableReinitialize: true,
        validationSchema: yup.object({
            firstName: yup.string().required().min(2),
            middleName: yup.string().min(2),
            lastName: yup.string().required().min(2),
            phone: yup.string().required().min(2),
            email: yup.string().required().min(2).email(),
            password: yup.string().required().min(6),
            imageUrl: yup.string().min(2).url(),
            imageAlt: yup.string().min(2),
            state: yup.string().min(2),
            country: yup.string().required().min(2),
            city: yup.string().required().min(2),
            street: yup.string().required().min(2),
            houseNumber: yup.string().required().min(1),
            zip: yup.string().min(2),
            isBuisnesUser: yup.boolean(),
        }),
        onSubmit(values) {

            updateUser(values, userId)
                .then((res) => {
                    sessionStorage.setItem(
                        "userInfo",
                        JSON.stringify({
                            imageUrl: res.data.imageUrl,
                            email: res.data.email,
                            userId: res.data.id,
                            role: res.data.role
                        }
                        )
                    );
                    successMsg(`Information was updated successfuly!`);
                }).catch((err) => console.log(err)
                )


        },

    })
    let clear = () => {
        formik.resetForm()
    }

    let navigate = useNavigate();
    let handleRemoveUser = (id: string) => {
        if (window.confirm("Are you sure?") === true) {
            navigate("/");
            successMsg("User deleted successfully!")
            deleteUserById(id)
                .then((res) => {
                    let logout = () => {
                        sessionStorage.removeItem("userInfo");
                        sessionStorage.removeItem("token");
                        setUserInfo({ email: false, role: "defaultUser" });
                    };
                    logout();
                }
                ).catch((err) => console.log(err))
        }
    }
    useEffect(() => {
        getUserDetails()
            .then((res) => {
                setUser(res.data)

            }
            )
            .catch((err) => console.log(err));
    }, []);
    return (
        <>
            <div className="container col-md-6">
                <h2 className="display-6 my-3 border-bottom border-dark p-3">PROFILE</h2>
                <form className="form row w-100 mt-4" onSubmit={formik.handleSubmit} style={{ margin: "0 auto" }}>
                    {/* LEFT COLUMN */}
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control shadow mb-2"
                                name="firstName"
                                id="floatingFirstName"
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                                onBlur={formik.handleBlur}
                                placeholder="First name" />
                            <label className="darkText" htmlFor="floatingInputFirstName">First name</label>
                            {formik.touched.firstName && formik.errors.firstName && (
                                <small className="text-danger">{formik.errors.firstName}</small>)}
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control shadow mb-2"
                                name="lastName"
                                id="floatingLastName"
                                onChange={formik.handleChange}
                                value={formik.values.lastName}
                                onBlur={formik.handleBlur}
                                placeholder="Last Name" />
                            <label className="darkText" htmlFor="floatingLastName">Last Name</label>
                            {formik.touched.lastName && formik.errors.lastName && (
                                <small className="text-danger">{formik.errors.lastName}</small>)}
                        </div>
                        <div className="form-floating">
                            <input type="email" className="form-control shadow mb-2"
                                name="email"
                                id="floatingEmail"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                                placeholder="Email" />
                            <label className="darkText" htmlFor="floatingEmail">Email</label>
                            {formik.touched.email && formik.errors.email && (
                                <small className="text-danger">{formik.errors.email}</small>)}
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control shadow mb-2"
                                name="imageUrl"
                                id="floatingImageUrl"
                                onChange={formik.handleChange}
                                value={formik.values.imageUrl}
                                onBlur={formik.handleBlur}
                                placeholder="Image url" />
                            <label className="darkText" htmlFor="floatingImageUrl">Image url</label>
                            {formik.touched.imageUrl && formik.errors.imageUrl && (
                                <small className="text-danger">{formik.errors.imageUrl}</small>)}
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control shadow mb-2"
                                name="state"
                                id="floatingState"
                                onChange={formik.handleChange}
                                value={formik.values.state}
                                onBlur={formik.handleBlur}
                                placeholder="State" />
                            <label className="darkText" htmlFor="floatingState">State</label>
                            {formik.touched.state && formik.errors.state && (
                                <small className="text-danger">{formik.errors.state}</small>)}
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control shadow mb-2"
                                name="city"
                                id="floatingCity"
                                onChange={formik.handleChange}
                                value={formik.values.city}
                                onBlur={formik.handleBlur}
                                placeholder="City" />
                            <label className="darkText" htmlFor="floatingCity">City</label>
                            {formik.touched.city && formik.errors.city && (
                                <small className="text-danger">{formik.errors.city}</small>)}
                        </div>
                        <div className="form-floating">
                            <input type="number" className="form-control shadow mb-2"
                                name="houseNumber"
                                id="floatingHouseNumber"
                                onChange={formik.handleChange}
                                value={formik.values.houseNumber}
                                onBlur={formik.handleBlur}
                                placeholder="House number" />
                            <label className="darkText" htmlFor="floatingHouseNumber">House number</label>
                            {formik.touched.houseNumber && formik.errors.houseNumber && (
                                <small className="text-danger">{formik.errors.houseNumber}</small>)}
                        </div>
                    </div>
                    {/* RIGHT COLUMN */}
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control shadow mb-2"
                                name="middleName"
                                id="floatingMiddleName"
                                onChange={formik.handleChange}
                                value={formik.values.middleName}
                                onBlur={formik.handleBlur}
                                placeholder="Middle name" />
                            <label className="darkText" htmlFor="floatingMiddleName">Middle name</label>
                            {formik.touched.middleName && formik.errors.middleName && (
                                <small className="text-danger">{formik.errors.middleName}</small>)}
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control shadow mb-2"
                                name="phone"
                                id="floatingPhone"
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                                onBlur={formik.handleBlur}
                                placeholder="Phone" />
                            <label className="darkText" htmlFor="floatingPhone">Phone</label>
                            {formik.touched.phone && formik.errors.phone && (
                                <small className="text-danger">{formik.errors.phone}</small>)}
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control shadow mb-2"
                                name="password"
                                id="floatingPassword"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                placeholder="password" />
                            <label className="darkText" htmlFor="floatingPassword">password</label>
                            {formik.touched.password && formik.errors.password && (
                                <small className="text-danger">{formik.errors.password}</small>)}
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control shadow mb-2"
                                name="imageAlt"
                                id="floatingImageAlt"
                                onChange={formik.handleChange}
                                value={formik.values.imageAlt}
                                onBlur={formik.handleBlur}
                                placeholder="Image alt" />
                            <label className="darkText" htmlFor="floatingImageAlt">Image alt</label>
                            {formik.touched.imageAlt && formik.errors.imageAlt && (
                                <small className="text-danger">{formik.errors.imageAlt}</small>)}
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control shadow mb-2"
                                name="country"
                                id="floatingCountry"
                                onChange={formik.handleChange}
                                value={formik.values.country}
                                onBlur={formik.handleBlur}
                                placeholder="Country" />
                            <label className="darkText" htmlFor="floatingCountry">Country</label>
                            {formik.touched.country && formik.errors.country && (
                                <small className="text-danger">{formik.errors.country}</small>)}
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control shadow mb-2"
                                name="street"
                                id="floating"
                                onChange={formik.handleChange}
                                value={formik.values.street}
                                onBlur={formik.handleBlur}
                                placeholder="Street" />
                            <label className="darkText" htmlFor="floatingStreet">Street</label>
                            {formik.touched.street && formik.errors.street && (
                                <small className="text-danger">{formik.errors.street}</small>)}
                        </div>
                        <div className="form-floating">
                            <input type="number" className="form-control shadow mb-2"
                                name="zip"
                                id="floatingZip"
                                onChange={formik.handleChange}
                                value={formik.values.zip}
                                onBlur={formik.handleBlur}
                                placeholder="Zip" />
                            <label className="darkText" htmlFor="floatingZip">Zip</label>
                            {formik.touched.zip && formik.errors.zip && (
                                <small className="text-danger">{formik.errors.zip}</small>)}
                        </div>
                    </div>
                    {userInfo.role === "isAdmin" ? (<p className="display-6 text-danger mt-4">USER IS ADMIN</p>) : (<div className="form-check ms-3 text-start fw-bold">
                        <input className="form-check-input" type="checkbox" id="roleCheckbox"
                            name="role"
                            checked={formik.values.role === "isBusiness"}
                            onChange={(e) => {
                                formik.setFieldValue("role", e.target.checked ? "isBusiness" : "isUser");
                            }}
                            onBlur={formik.handleBlur} />
                        <label className="form-check-label " htmlFor="roleCheckbox">
                            User Status is Business
                        </label>
                        {formik.touched.role && formik.errors.role && (
                            <p className="text-danger">{formik.errors.role}</p>)}
                    </div>)}
                    <div className="my-2">
                        <button type="submit" className="btn btn-secondary col-md-12 my-2" disabled={!formik.isValid || !formik.dirty}>SUBMIT</button>

                    </div>

                </form>
                {((userInfo.role === "isAdmin") || (userInfo.email === formik.values.email)) && (<button className="btn btn-danger col-md-3 mx-1 mb-3" onClick={() =>
                    handleRemoveUser(userInfo.userId)
                } >Delete User</button>)}

                <button className="btn btn-primary col-md-3 mx-1 mb-3" onClick={clear} >Restore last saved</button>
                <NavLink to="/" className="btn btn-warning col-md-3 mx-1 mb-3">Cancel</NavLink>

            </div>
        </>
    )
}

export default Profile;