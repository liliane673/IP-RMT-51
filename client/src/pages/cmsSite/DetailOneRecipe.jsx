import PropTypes from "prop-types"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import NavBarCMSSite from "../../components/NavBarCMSSite";
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from "../../store/sliceUser";

export default function DetailOneRecipe() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.all)

    const { id } = useParams();
    const [recipe, setRecipe] = useState({
        id: 0,
        title: "",
        content: "",
        imgUrl: "",
        categoryId: 0,
        authorId: 0
    })
    // const [user, setUser] = useState({})


    const fecthRecipe = async () => {
        try {
            let result = await axiosInstance({
                method: 'get',
                url: '/recipes/' + id,
                headers: {
                    "Authorization-AccessToken": "Bearer " + localStorage.getItem("token")
                },
            })
            // console.log(result.data, `====> data one recipe ${id}`);
            setRecipe(result.data)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fecthRecipe(id)
        dispatch(fetchUser())
        console.log(user, '=====> user')
    }, [id])


    return <>
        <NavBarCMSSite />
        <div className="container">
            {/* Image Detail */}
            <img
                src={recipe.imgUrl}
                className="card-img-top"
                alt=""
                style={{ borderRadius: "10px", width: "500px" }}
            />
        </div>
        <div className="container text-left">
            <div className="row">
                <div className="col">
                    <div className="row" style={{ marginTop: "40px" }}>
                        {/* Post Detail */}
                        <div
                            style={{ justifyContent: "left", alignContent: "left" }}
                        >
                            <div className="card-body">
                                <h1 className="card-title">{recipe.title}</h1>
                                <div>
                                    <span className="card-text">Grams per portion : {recipe.grams_per_portion}</span><br></br>
                                    <span className="card-text">Number of serving: {recipe.number_of_servings}</span>
                                </div>
                                <br></br>
                                <span className="badge rounded-pill text-bg-secondary" style={{ fontSize: "15px", marginBottom: "5px" }}>Category: {recipe.category}</span>
                                <br></br>
                                <span className="badge rounded-pill text-bg-secondary" style={{ fontSize: "15px" }}>Type: {recipe.type}</span>
                            </div>
                            <br></br><br></br>
                            <div>
                                <p className="card-text" >Ingredients :
                                    {
                                        recipe.ingredient?.map((ingredient, index) => {
                                            // console.log(ingredient, '====>disini')
                                            return <li key={index}>{ingredient.ingredient_description}</li>
                                        })
                                    }
                                </p>
                            </div>
                            <br></br><br></br>
                            <div>
                                <p className="card-text" >Directions :
                                    {
                                        recipe.direction?.map((direction, index) => {
                                            // console.log(direction, '====>disini')
                                            return <li key={index}>{direction.direction_description}</li>
                                        })
                                    }
                                </p>
                            </div>
                            <br></br><br></br>


                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="row" style={{ marginTop: "40px" }}>
                        <div className="card-body">
                            <h1 className="card-title">Nutrition Facts</h1>
                        </div>
                        <br></br><br></br>

                        <div>
                            {
                                user.isSubscribed == false ?
                                    <p>Please <b>Subscribe</b> first to access nutrition facts</p>
                                    :
                                    <div>
                                        <ul>
                                            <li>Calories : {recipe.Fact?.calories}</li>
                                            <li>Serving Size : {recipe.Fact?.serving_size}</li>
                                            <li>Calcium : {recipe.Fact?.calcium}</li>
                                            <li>Carbohydrate : {recipe.Fact?.carbohydrate}</li>
                                            <li>Cholesterol : {recipe.Fact?.cholesterol}</li>
                                            <li>Fat : {recipe.Fact?.fat}</li>
                                            <li>Fiber : {recipe.Fact?.fiber}</li>
                                            <li>Iron : {recipe.Fact?.iron}</li>
                                            <li>Monounsaturated Fat : {recipe.Fact?.monounsaturated_fat}</li>
                                            <li>Polyunsaturated_fat : {recipe.Fact?.polyunsaturated_fat}</li>
                                            <li>Potassium : {recipe.Fact?.potassium}</li>
                                            <li>Protein : {recipe.Fact?.protein}</li>
                                            <li>Saturated_fat : {recipe.Fact?.saturated_fat}</li>
                                            <li>Ssodium : {recipe.Fact?.sodium}</li>
                                            <li>Sugar : {recipe.Fact?.sugar}</li>
                                            <li>Trans_fat : {recipe.Fact?.trans_fat}</li>
                                            <li>Vitamin_a : {recipe.Fact?.vitamin_a}</li>
                                            <li>Vitamin_c : {recipe.Fact?.vitamin_c}</li>
                                        </ul>
                                    </div>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
        <div className="container">

        </div >
    </>
}