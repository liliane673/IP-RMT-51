import { useEffect, useState } from "react";
import RecipeCMSCard from "../components/RecipeCMSCard";
import axiosInstance from "../utils/axios";

export default function AllRecipesCMSCard() {
    const [recipeList, setRecipeLists] = useState([]);

    const fetchRecipes = async () => {
        try {
            let { data } = await axiosInstance({
                method: 'get',
                url: '/recipes',
                headers: {
                    "Authorization-AccessToken": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(data, '---> ini di AllRecipesCMSCard');
            setRecipeLists(data)
        } catch (err) {
            console.log(err)
            console.log(err.response.data)
        }
    }

    useEffect(() => {
        fetchRecipes()
    }, [])

    return <>
        <div className="container-fluid d-flex flex-wrap gap-5" style={{
            padding: "100px",
            alignItems: "center",
        }}>
            {
                recipeList.map((recipe) => {
                    return <RecipeCMSCard key={recipe.id} recipe={recipe} />
                })
            }
        </div>

    </>
}