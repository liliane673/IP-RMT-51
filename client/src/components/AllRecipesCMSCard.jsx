import { useEffect, useState } from "react";
import RecipeCMSCard from "../components/RecipeCMSCard";
import axiosInstance from "../utils/axios";
import { useSelector, useDispatch } from 'react-redux'
import { fetchRecipes } from "../store/sliceRecipe";

export default function AllRecipesCMSCard() {
    // const [recipeList, setRecipeLists] = useState([]);
    const dispatch = useDispatch()
    const recipes = useSelector(state => state.recipes.all)

    useEffect(() => {
        dispatch(fetchRecipes())
    }, [])

    return <>
        <div className="container-fluid d-flex flex-wrap gap-5" style={{
            padding: "100px",
            alignItems: "center",
        }}>
            {
                recipes.map((recipe) => {
                    return <RecipeCMSCard key={recipe.id} recipe={recipe} />
                })
            }
        </div>

    </>
}