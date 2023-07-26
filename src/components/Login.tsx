import { FunctionComponent } from "react";
import { useFormik } from "formik";
import { checkUser } from "../services/usersService";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../services/feedbacksService";
interface LoginProps {
    setUserInfo: Function;
}

const Login: FunctionComponent<LoginProps> = ({ setUserInfo }) => {
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: yup.object({
            email: yup.string().required().email(),
            password: yup.string().required().min(6),
        }),
        onSubmit(values) {
            checkUser(values)
                .then((res) => {
                    if (res.data.length) {
                        navigate("/");
                        successMsg(`You're logged in as ${values.email}`);
                        sessionStorage.setItem(
                            "userInfo",
                            JSON.stringify({
                                imageURL: res.data[0].imageUrl,
                                email: res.data[0].email,
                                role: res.data[0].role,
                                userId: res.data[0].id

                            })
                        );
                        setUserInfo(
                            JSON.parse(sessionStorage.getItem("userInfo") as string)
                        );
                    } else errorMsg("Wrong email or password")
                })
                .catch((err) => console.log(err));
        },
    })
    return (
        <>
            <div className="container col-md-4 mt-5" style={{ height: "70vh", }}>
                <h2 className="display-6 my-3">LOGIN</h2>
                <form className="form row" onSubmit={formik.handleSubmit}>
                    <div className="form-floating">
                        <input type="email" className="form-control shadow mb-2"
                            id="floatingEmail"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Email" />
                        <label htmlFor="floatingEmail" className="ms-4 darkText">Email</label>
                        {formik.touched.email && formik.errors.email && (
                            <small className="text-danger">{formik.errors.email}</small>)}
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control shadow mb-2"
                            name="password"
                            id="floatingPassword"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="password" />
                        <label htmlFor="floatingPassword" className="ms-4 darkText">password</label>
                        {formik.touched.password && formik.errors.password && (
                            <small className="text-danger">{formik.errors.password}</small>)}
                    </div>
                    <div className="my-2">

                        <button className="btn btn-secondary col-md-12 my-2" type="submit" disabled={!formik.isValid || !formik.dirty}>SUBMIT</button>
                    </div>
                </form>
                <button className="btn btn-danger col-md-5 mx-1 mb-3">Cancel</button>
                <button className="btn btn-primary col-md-5 mx-1 mb-3"><i className="fa-solid fa-rotate"></i></button>
            </div>
        </>
    )
}

export default Login;