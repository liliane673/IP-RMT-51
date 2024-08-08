import PropTypes from "prop-types"
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { Buttons } from "../../components/Buttons";
import { toast } from "react-toastify";


export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = async (event) => {

        event.preventDefault()
        // console.log('login')
        try {
            let { data } = await axiosInstance({
                method: 'post',
                url: '/login',
                data: {
                    email, password
                }
            });
            // console.log(data, '====>access token')

            localStorage.setItem("token", data.access_token)
            navigate("/cms/recipes")

        } catch (err) {
            console.log(err)
            toast.error(err.response?.data.message || err.message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }
    }

    async function handleCredentialResponse(response) {
        try {
            // console.log("Encoded JWT ID token: " + response.credential);

            let { data } = await axiosInstance({
                method: 'post',
                url: '/google-login',
                data: {
                    googleToken: response.credential
                }
            });
            // console.log(data, '====>data google login')
            localStorage.setItem("token", data.access_token)
            navigate("/cms/recipes")
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        google.accounts.id.initialize({
            client_id: "983383379443-icooqvrf2s1lfgng04dr1430gnlt6ej2.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
        );
        // google.accounts.id.prompt(); // also display the One Tap dialog
    }, [])

    return <div className="container" id="login-section">
        <div className="row" style={{ padding: "20px" }}>
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <img
                            src="https://www.sme-news.co.uk/wp-content/uploads/2021/11/Login.jpg"
                            className="card-img-top"
                            alt="Login image"
                        />
                    </div>
                    <div className="col-md-4">
                        <div className="form-signin m-auto" >
                            <form id="login-form" onSubmit={handleLogin}>
                                <p style={{ fontSize: 50, fontWeight: "bold" }}>
                                    Log in to your account
                                </p>
                                <span>Log in to access Hack Healthy Recipes</span>
                                <div className="mb-3 mt-3">
                                    <div className="d-flex justify-content">
                                        <label htmlFor="login-email">Email</label>
                                        <label className="text-danger text-end fw-bold">*</label>
                                    </div>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="login-email"
                                        placeholder="Enter email address ..."
                                        autoComplete="off"
                                        required=""
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                </div>
                                <div className="mb-4">
                                    <div className="d-flex justify-content">
                                        <label htmlFor="login-password">Password</label>
                                        <label className="text-danger text-end fw-bold">*</label>
                                    </div>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="login-password"
                                        placeholder="Enter your password ..."
                                        autoComplete="off"
                                        required=""
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                </div>

                                <Buttons>Login</Buttons>
                                <br></br>  <br></br>

                                <div id="buttonDiv"></div>

                                <div className="d-flex" style={{ marginTop: "30px", alignContent: "center", justifyContent: "center" }}>
                                    <p>Don't have an account ? <Link to="/register">Register </Link>here</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div >
}