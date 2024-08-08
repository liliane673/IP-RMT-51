import axiosInstance from "../utils/axios";
import PropTypes from 'prop-types';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OutlineButtons } from "./Buttons";

export default function RecipeCMSCard({ recipe }) {
    const navigate = useNavigate();


    const addMyRecipe = async (recipe) => {
        try {
            let { data } = await axiosInstance({
                method: 'post',
                url: '/my-saved-recipes/' + recipe.id,
                headers: {
                    "Authorization-AccessToken": "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(data, '---> ini di add addMyRecipe');
            navigate("/cms/my-saved-recipes")
        } catch (err) {
            console.log(err)
            console.log(err.response.data)
        }
    }

    return <>
        <div className="card" style={{ width: "24rem" }}>
            <img
                src={recipe.imgUrl}
                className="card-img-top"
                alt="Recipe image"
                height={"250px"}
            />
            <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <div>
                    <span className="card-text">Grams per portion : {recipe.grams_per_portion}</span><br></br>
                    <span className="card-text">Number of serving: {recipe.number_of_servings}</span>
                </div>
                <br></br>
                <span className="badge rounded-pill text-bg-secondary" style={{ fontSize: "15px" }}>Category: {recipe.category}</span>
                <br></br>
                <span className="badge rounded-pill text-bg-secondary" style={{ fontSize: "15px" }}>Type: {recipe.type}</span>
                {/* <div>
                    <p className="card-text" >Ingredients :
                        {
                            recipe.ingredient.map((ingredient) => {
                                console.log(ingredient, '====>disini')
                                return <li>{ingredient.ingredient_description}</li>
                            })
                        }
                    </p>
                </div>
                <div>
                    <p className="card-text" >Directions :
                        {
                            recipe.direction.map((direction) => {
                                console.log(direction, '====>disini')
                                return <li>{direction.direction_description}</li>
                            })
                        }
                    </p>
                </div> */}
                <br></br>
                <br></br>

                <div className="container-fluid d-flex flex-wrap gap-1">
                    <Link to="/">
                        <OutlineButtons className="btn btn-primary">
                            See Detail
                        </OutlineButtons>
                    </Link>
                    <button className="btn btn-primary" onClick={() => addMyRecipe(recipe)}>
                        Add to My Saved Recipe
                    </button>
                </div>
            </div>
        </div >

    </>
}


RecipeCMSCard.propTypes = {
    recipe: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
    }),
}
