import { FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ReactSwitch from "react-switch";
interface NavbarProps {
    userInfo: any;
    setUserInfo: Function;
    theme: any;
    toggleTheme: any;
}

const Navbar: FunctionComponent<NavbarProps> = ({ userInfo, setUserInfo, theme, toggleTheme }) => {
    let roles = (userInfo.role === "isBusiness" || userInfo.role === "isAdmin" || userInfo.role === "isUser");
    let navigate = useNavigate();
    let logout = () => {
        sessionStorage.removeItem("userInfo");
        sessionStorage.removeItem("token");
        setUserInfo({ email: false, role: "defaultUser" });
        navigate("");

    };
    return (
        <nav className="navbar navbar-expand-lg Navbar position-sticky top-0 start-50 shadow z-3">
            <div className="container-fluid w-75">

                <NavLink to="/" className=" bcard " style={{
                    margin: "0 auto", fontFamily: "Rajdhani, sans-serif", fontSize: "1.7rem"
                }} >
                    BCard
                </NavLink>
                <button className="navbar-toggler ms-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
                    <span className="navbar-toggler-icon" data-bs-theme="light"></span>
                </button>
                <div className="collapse navbar-collapse navbarA" id="navbarNav">

                    <ul className="navbar-nav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/about" className="btn text-light mx-2 nav-link" aria-current="page">
                                    ABOUT
                                </NavLink>

                            </li>
                            {roles && (
                                <>
                                    <li className="nav-item">
                                        <NavLink to="favorites" className="btn text-light mx-2 nav-link" aria-current="page">
                                            FAV CARDS
                                        </NavLink></li>
                                    <li className="nav-item">
                                        <NavLink to="/cards" className="btn text-light mx-2 nav-link" aria-current="page">
                                            CARDS
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </ul>
                </div>
                <form className="d-flex" role="search">
                    <div className="switch me-3">
                        <label className="text-light">{theme === "light" ? "Light Mode" : "Dark Mode"}</label>
                        <br />
                        <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
                    </div>
                    {roles ? (
                        <>
                            <div className="mt-1">
                                <button onClick={logout} className="btn text-light">
                                    Logout
                                </button>
                                <NavLink to={`/profile/${userInfo.userId}`}><img src={userInfo.imageUrl} alt="" className="rounded" style={{ width: "40px", objectFit: "cover", height: "40px" }} /></NavLink>
                            </div>
                        </>
                    ) : (<>
                        <><NavLink to="/login" className="btn text-light mx-2">
                            LOGIN
                        </NavLink><NavLink to="/register" className="btn text-light">
                                SIGNUP
                            </NavLink></>
                    </>)}

                </form>


            </div>
        </nav>
    )
}

export default Navbar;