import axiosInstance from "../utils/axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { CancelButton } from "./Buttons";

export default function FormUpdate({ user }) {
    const navigate = useNavigate();
    const [bodyweight, setBodyweight] = useState(user.bodyweight ? user.bodyweight : "")
    const [height, setHeight] = useState(user.height ? user.height : "")
    const [preference, setPreference] = useState(user.preference ? user.preference : "")

    const handleUpdateUserData = async (e) => {
        e.preventDefault()
        try {
            let { data } = await axiosInstance({
                method: 'put',
                url: '/edit-profile/' + Number(user.id),
                data: {
                    bodyweight,
                    height,
                    preference
                },
                headers: {
                    "Authorization-AccessToken": "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(data, '---> ini update oneCoin');
            navigate('/cms/recipe-recommendation')
        } catch (err) {
            console.log(err)
            console.log(err.response.data)
        }
    }


    return <>
        <div className="container" style={{ width: "500px", marginTop: "30px" }}>
            <h1> Update My Data</h1>
            {/* <img src={oneCoin.Coin?.logo} className="card-img-top" alt="coin-image" style={{ width: "100px" }} />
            <div className="card-body">
                <h5 className="card-title">{oneCoin.Coin?.symbol}</h5>
                <h5 className="card-title">{oneCoin.Coin?.name}</h5>
            </div> */}
            <form onSubmit={handleUpdateUserData}>
                <div className="mb-3">
                    <label htmlFor="bodyweight" className="form-label">
                        Body Weight (in kg)
                    </label>
                    <input
                        value={bodyweight}
                        onChange={(e) => setBodyweight(e.target.value)}
                        type="number"
                        className="form-control"
                        id="bodyweight"
                        aria-describedby="bodyweight"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="height" className="form-label">
                        Height (in cm)
                    </label>
                    <input
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        type="number"
                        className="form-control"
                        id="height"
                        aria-describedby="height"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="register-preference">Preference</label>
                    <select class="form-select" id="register-preference" name="preference" onChange={(e) => setPreference(e.target.value)}>
                        value={preference}
                        <option selected disabled>Choose...</option>
                        <option value="maintain bodyweight" >maintain bodyweight</option>
                        <option value="loose bodyweight">loose bodyweight</option>
                        <option value="gain bodyweight" >gain bodyweight</option>
                    </select>
                </div>

                <div className="column column-gap-3">
                    <button type="submit" className="btn btn-primary" style={{ marginRight: "5px" }} onClick={() => handleUpdateUserData}>
                        Update
                    </button>
                    <Link to="/cms/recipe-recommendation">
                        <CancelButton />
                    </Link>
                </div>
            </form>

        </div>

    </>
}

FormUpdate.propTypes = {
    coin: PropTypes.shape({
        id: PropTypes.number,
        UserId: PropTypes.number,
        quantity: PropTypes.number,
        CoinId: PropTypes.number,
        Coin: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            symbol: PropTypes.string,
            logo: PropTypes.string,
            description: PropTypes.string,
        })
    }),
}