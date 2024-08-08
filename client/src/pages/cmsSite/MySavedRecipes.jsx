import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import MySavedRecipeCard from "../../components/MySavedRecipeCard";
import NavBarCMSSite from "../../components/NavBarCMSSite";

export default function MySavedRecipes() {
    const [mySavedRecipe, setMySavedRecipe] = useState([]);

    const fetchMySavedRecipes = async () => {
        // console.log('fetch m recipe')
        try {
            let { data } = await axiosInstance({
                method: 'get',
                url: '/my-saved-recipes',
                headers: {
                    "Authorization-AccessToken": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(data, '---> ini di mySavedRecipe');
            setMySavedRecipe(data)
        } catch (err) {
            console.log(err)
            console.log(err.response.data)
        }
    }

    useEffect(() => {
        fetchMySavedRecipes()
    }, [])

    const deleteMySavedRecipe = async (recipe) => {
        // console.log("deletemySavedRecipet===>")
        // console.log(recipe, 'recipe')
        try {
            let { data } = await axiosInstance({
                method: 'delete',
                url: '/my-saved-recipes/' + recipe.id,
                headers: {
                    "Authorization-AccessToken": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(data, '---> ini di delete recipe');
            fetchMySavedRecipes()
        } catch (err) {
            console.log(err)
            console.log(err.response.data)
        }
    }


    return <>
        <NavBarCMSSite />
        <div className="container d-flex flex-wrap gap-3" style={{ marginTop: "30px" }}>
            {
                mySavedRecipe.map((recipe) => {
                    return <MySavedRecipeCard key={recipe.id} recipe={recipe} deleteMySavedRecipe={deleteMySavedRecipe} />
                })
            }
        </div>

    </>
}