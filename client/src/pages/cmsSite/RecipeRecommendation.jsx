import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import NavBarCMSSite from "../../components/NavBarCMSSite";
import { OutlineButtons } from "../../components/Buttons";
import { Link } from "react-router-dom";


export default function RecipeRecommendation() {
    const [recommendationRecipes, setRecommendationRecipes] = useState([]);
    const [user, setUser] = useState({})

    const handleRecommendationRecipe = async () => {
        console.log('fetch recommendation===>>>>')
        try {
            let { data } = await axiosInstance({
                method: 'post',
                url: '/recipe-recommendation',
                headers: {
                    "Authorization-AccessToken": "Bearer " + localStorage.getItem("token")
                },
                data: {
                    preference: user.preference
                }
            });
            console.log(data)

            const newData = JSON.parse(data);
            console.log(newData, '---> ini di setRecommendationRecipes')
            setRecommendationRecipes(data)
        } catch (err) {
            console.log(err)
            console.log(err.response.data)
        }
    }


    const fecthUser = async () => {
        try {
            let { data } = await axiosInstance({
                method: 'get',
                url: '/get-user',
                headers: {
                    'Authorization-AccessToken': "Bearer " + localStorage.getItem("token")
                }
            })
            setUser(data)
            // console.log(data, '====> data user di cms');
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fecthUser()
        // console.log(user)
    }, [])

    const handleEditUser = () => {
        console.log('tes=>>>>')
    }

    const handleClick = () => {
        console.log('this is:', this);
    };

    return <>
        <NavBarCMSSite />

        <div className="container d-flex flex-wrap gap-10" style={{ marginTop: "30px" }}>
            <div className="row" style={{ padding: "20px" }}>
                <div>
                    <h1>Personal Recipe Recommendation</h1>
                    <p>Here's Personal Recipe Recommendation for {user.username} !</p>
                </div>
                <div style={{ marginTop: "30px" }}>
                    <h3>Your Personal Data</h3>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Your Body Weight : {user.bodyweight} kg</li>
                        <li className="list-group-item">Your Height :{user.height} cm</li>
                        <li className="list-group-item">Your Preference : to {user.preference}</li>
                    </ul>
                    <Link to="/update-my-data">
                        <OutlineButtons className="btn btn-primary">
                            Edit
                        </OutlineButtons>
                    </Link>
                </div>
                <div style={{ marginTop: "30px" }}>
                    <h5>Click Here to See Personal Recipes Recommendation for You !</h5>
                    <button className="btn btn-primary" onClick={() => handleRecommendationRecipe()}>
                        Click Here
                    </button>
                </div>
                <div>
                    <p>{recommendationRecipes}</p>
                    <p>{recommendationRecipes.Response}</p>
                </div>
                <div>
                    <h2>{recommendationRecipes.Response}</h2>
                    <ul>
                        {/* {recommendationRecipes["Recommendation Recipes"].map((recipe, index) => (
                            <li key={index}>
                                <h3>{recipe["Recipe Name"]}</h3>
                                <p><strong>Why:</strong> {recipe.Why}</p>
                                <p><strong>How to Enhance:</strong> {recipe["How to Enhance"]}</p>
                            </li>
                        ))} */}
                    </ul>
                </div>
            </div>
        </div>
    </>
}