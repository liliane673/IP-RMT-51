import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import { OutlineButtons } from "./Buttons";

export default function NavBarCMSSite() {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear();
        navigate("/")
    }

    const [user, setUser] = useState({})
    const fecthUser = async () => {
        try {
            let { data } = await axiosInstance({
                method: 'get',
                url: '/get-user',
                headers: {
                    'Authorization-AccessToken': "Bearer " + localStorage.getItem("token")
                }
            })
            // console.log(data, '====> data user di cms');
            setUser(data)
        } catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        fecthUser()
        // console.log(user)
    }, [])

    return <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-body-tertiary ">
        <div className="col-md" style={{ display: "flex", marginLeft: 30 }}>
            <Link className="navbar-brand" to="/cms/posts">
                Hack Healthy Recipes
            </Link>
        </div>
        <div
            className="col-md"
            style={{ display: "flex", justifyContent: "center" }}
        >
            <ul className="navbar-nav" style={{ marginLeft: 30 }}>
                <li className="nav-item">
                    <Link className="nav-link" to="/cms/recipes">
                        Recipes
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/cms/my-saved-recipes">
                        My Saved Recipes
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/cms/recipe-recommendation">
                        Recipe Recommendation
                    </Link>
                </li>
            </ul>
        </div>
        <div className="col-md">
            <div
                className="d-flex"
                style={{ justifyContent: "end", alignItems: "center", columnGap: 20 }}
            >
                <span>Hai, {user.username} !</span>
                {
                    user?.isSubscribed === "false"
                        ? <OutlineButtons onClick={() => logout()}
                            data-mdb-ripple-init=""
                            type="button"
                            className="btn btn-primary me-3"
                        >
                            Subscribe
                        </OutlineButtons>
                        : <button onClick={() => logout()}
                            data-mdb-ripple-init=""
                            type="button"
                            className="btn btn-primary me-3"
                        >
                            Subscribed
                        </button>
                }
                <button onClick={() => logout()}
                    data-mdb-ripple-init=""
                    type="button"
                    className="btn btn-primary me-3"
                >
                    Log Out
                </button>
            </div>
        </div>
    </nav>
}