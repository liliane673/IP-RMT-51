import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import NavBarCMSSite from "../../components/NavBarCMSSite";
import { OutlineButtons } from "../../components/Buttons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from "../../store/sliceUser";
import Markdown from 'react-markdown'


export default function RecipeRecommendation() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.all)
    // console.log(user, '======INI REDUX')

    const [recommendationRecipes, setRecommendationRecipes] = useState('');
    // const [user, setUser] = useState({})

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
            //             console.log(data.text.split("\n"))
            //             console.log(data.text.split("***")[0].slice(8, -4))
            //             console.log(JSON.parse(data.text.split(` 

            // *`)[0].slice(8, -4)))
            // const count = data.length;
            // console.log(count, count - 3);

            // const newData = console.log(data.substr(7, count - 3), '====substring')
            // const dataparse = JSON.parse(newData);
            // console.log(newData, '---> ini di setRecommendationRecipes')
            setRecommendationRecipes(data.text)
        } catch (err) {
            console.log(err)
            console.log(err.response.data)
        }
    }


    useEffect(() => {
        dispatch(fetchUser())
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
                <br></br><br></br>
                <div>
                    <Markdown>
                        {recommendationRecipes}
                        {/* {JSON.parse(recommendationRecipes).response} */}
                    </Markdown>
                </div>
            </div>
        </div>
    </>
}