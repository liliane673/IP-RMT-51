import PropTypes from "prop-types"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import NavBarCMSSite from "../../components/NavBarCMSSite";

export default function DetailOneRecipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({
        id: 0,
        title: "",
        content: "",
        imgUrl: "",
        categoryId: 0,
        authorId: 0
    })

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
    }, [id])

    return <>
        <NavBarCMSSite />
        <div className="container">
            <div className="column" style={{ marginTop: "40px" }}>
                {/* Image Detail */}
                <div className="col-md-8">
                    <img
                        src={recipe.imgUrl}
                        className="card-img-top"
                        alt=""
                        style={{ borderRadius: "10px", width: "500px" }}
                    />
                </div>
                {/* Post Detail */}
                <div
                    className="col-md-8"
                    style={{ justifyContent: "center", alignContent: "center" }}
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
                                recipe.ingredient?.map((ingredient) => {
                                    // console.log(ingredient, '====>disini')
                                    return <li>{ingredient.ingredient_description}</li>
                                })
                            }
                        </p>
                    </div>
                    <br></br><br></br>
                    <div>
                        <p className="card-text" >Directions :
                            {
                                recipe.direction?.map((direction) => {
                                    // console.log(direction, '====>disini')
                                    return <li>{direction.direction_description}</li>
                                })
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
}