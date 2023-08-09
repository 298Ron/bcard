import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

interface FooterProps {

}

const Footer: FunctionComponent<FooterProps> = () => {
    return (
        <>
            <footer className="text-light downfooter py-3" style={{ width: "100%" }} >
                <div className="container ">
                    <div className="">
                        <div className="col-4"></div>
                        <div className="col-12 ">


                            <div className="row mt-3">
                                <ul>
                                    <NavLink to=""><i className="col-2  fa-2x  fa-brands  text-light  fa-facebook"></i></NavLink>
                                    <NavLink to=""><i className="col-2  fa-2x  fa-brands  text-light  fa-instagram"></i></NavLink>
                                    <NavLink to=""><i className="col-2  fa-2x  fa-brands  text-light  fa-youtube"></i></NavLink>
                                    <NavLink to=""><i className="col-2  fa-2x  fa-brands  text-light  fa-twitter"></i></NavLink>
                                    <NavLink to=""><i className="col-2  fa-2x  fa-brands  text-light  fa-linkedin"></i></NavLink>

                                </ul>
                                <div className="row" >
                                    <ul className="list-inline " >
                                        <NavLink to="/" className=" text-light mx-4 col-3  fw-bold text-decoration-none" aria-current="page">
                                            HOME
                                        </NavLink>
                                        <NavLink to="/about" className=" text-light col-3  fw-bold text-decoration-none" aria-current="page">
                                            ABOUT
                                        </NavLink>
                                    </ul>
                                </div>
                                <div className="col-md-12 mt-1">
                                    <p>© 2023 BCard. All rights reserved.</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;