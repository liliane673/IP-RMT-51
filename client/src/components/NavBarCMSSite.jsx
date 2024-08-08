import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from "../store/sliceUser";


export default function NavBarCMSSite() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.all)

    const logout = () => {
        localStorage.clear();
        navigate("/")
    }

    useEffect(() => {
        dispatch(fetchUser())
        // console.log(user)
    }, [])


    const handleSubcribe = async () => {
        try {
            const { data } = await axiosInstance({
                method: 'post',
                url: '/connection-midtrans/get-token',
                headers: {
                    'Authorization-AccessToken': "Bearer " + localStorage.getItem("token")
                }
            })

            window.snap.pay(data.midtransToken.token, {
                onSuccess: async function (result) {
                    console.log(result);
                    const data = await axiosInstance({
                        method: 'patch',
                        url: '/connection-midtrans/user-update',
                        headers: {
                            'Authorization-AccessToken': "Bearer " + localStorage.getItem("token")
                        }
                    })
                    console.log(data, '---->>> di client ')
                }
            })


            // console.log(data, '====> dat

        } catch (error) {
            console.log(error)
        }
    }

    return <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-body-tertiary ">
        <div className="col-md" style={{ display: "flex", marginLeft: 30 }}>
            <Link className="navbar-brand" to="/cms/recipes">
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
                <div id="snap-container"></div>
                <button onClick={handleSubcribe}
                    data-mdb-ripple-init=""
                    type="button"
                    className="btn btn-outline-primary"
                >
                    Subscribe
                </button>
                {/* {
                    user?.isSubscribed === "false"
                        ? <button onClick={() => handleSubcribe()}
                            data-mdb-ripple-init=""
                            type="button"
                            className="btn btn-outline-primary"
                        >
                            Subscribe
                        </button>
                        : <button
                            data-mdb-ripple-init=""
                            type="button"
                            className="btn btn-primary me-3"
                        >
                            Subscribed
                        </button>
                } */}
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