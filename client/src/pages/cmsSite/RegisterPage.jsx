import PropTypes from "prop-types"
// import NavBarCMSSite from "../../components/NavBarCMSSite"
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { Buttons } from "../../components/Buttons";
import { toast } from "react-toastify";

export default function RegisterPage() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [bodyweight, setBodyweight] = useState("")
    const [height, setHeight] = useState("")
    const [preference, setPreference] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddUser(username, email, password, phoneNumber, address, bodyweight, height, preference)
    }


    const handleInput = (event) => {
        switch (event.target.name) {
            case "username":
                setUsername(event.target.value)
                break;
            case "email":
                setEmail(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
            case "phoneNumber":
                setPhoneNumber(event.target.value);
                break;
            case "address":
                setAddress(event.target.value);
                break;
            case "bodyweight":
                setBodyweight(event.target.value);
                break;
            case "height":
                setHeight(event.target.value);
                break;
            case "preference":
                // console.log(event.target.value, '====>>>disni')
                setPreference(event.target.value);
                break;
        }
    }

    const handleAddUser = async (username, email, password, phoneNumber, address, bodyweight, height, preference) => {
        // console.log(username, email, password, phoneNumber, address, bodyweight, height, preference, " di REGISTER page===>>")
        try {
            let result = await axiosInstance({
                method: 'post',
                url: '/register',
                data: {
                    username, email, password, phoneNumber, address, bodyweight, height, preference
                },
            })
            // console.log(result, '====> data di handle REISTER USER');
            navigate("/login")
        } catch (err) {
            console.log(err.response.data)
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

    return <>
        {/* <NavBarCMSSite /> */}
        <div className="container" id="login-section">
            <div className="row" style={{ padding: "20px" }}>
                <div>
                    <div className="row">
                        <div className="col-md-8">
                            <img
                                src="https://www.sme-news.co.uk/wp-content/uploads/2021/11/Login.jpg"
                                className="card-img-top"
                                alt="Register image"
                            />
                        </div>
                        <div className="col-md-4">
                            <div className="form-signin m-auto">
                                <form id="register-form" onSubmit={handleSubmit}>
                                    <p style={{ fontSize: 50, fontWeight: "bold" }}>
                                        Register account
                                    </p>
                                    <div className="mb-3">
                                        <div className="d-flex justify-email">
                                            <label htmlFor="register-username">Username</label>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="register-username"
                                            placeholder="Enter username ..."
                                            autoComplete="off"
                                            required=""
                                            value={username}
                                            name="username"
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex justify-email">
                                            <label htmlFor="register-email">Email</label>
                                            <label className="text-danger text-end fw-bold">*</label>
                                        </div>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="register-email"
                                            placeholder="Enter email address ..."
                                            autoComplete="off"
                                            required=""
                                            value={email}
                                            name="email"
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex justify-email">
                                            <label htmlFor="register-password">Password</label>
                                            <label className="text-danger text-end fw-bold">*</label>
                                        </div>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="register-password"
                                            placeholder="Enter password ..."
                                            autoComplete="off"
                                            required=""
                                            value={password}
                                            name="password"
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="register-phone">Phone Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="register-phone"
                                            placeholder="Enter phone number (optional) ..."
                                            autoComplete="off"
                                            value={phoneNumber}
                                            name="phoneNumber"
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="register-address">Address</label>
                                        <textarea
                                            id="register-address"
                                            className="form-control"
                                            rows={3}
                                            placeholder="Enter address (optional) ..."
                                            autoComplete="off"
                                            defaultValue={""}
                                            value={address}
                                            name="address"
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="register-bodyweight">Body Weight</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="register-bodyweight"
                                            placeholder="Enter body weight in kg..."
                                            autoComplete="off"
                                            value={bodyweight}
                                            name="bodyweight"
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="register-height">Height</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="register-height"
                                            placeholder="Enter height in cm ..."
                                            autoComplete="off"
                                            value={height}
                                            name="height"
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="register-preference">Preference</label>
                                        <select class="form-select" id="register-preference" name="preference" onChange={handleInput}>
                                            <option selected disabled>Choose...</option>
                                            <option value="maintain bodyweight" >maintain bodyweight</option>
                                            <option value="loose bodyweight">loose bodyweight</option>
                                            <option value="gain bodyweight" >gain bodyweight</option>
                                        </select>
                                    </div>
                                    <Buttons>Register</Buttons>

                                    <div style={{ marginTop: "30px" }}>
                                        <p>Already have an account ? <Link to="/login">Login </Link>here</p>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>

}