import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axios'

const recipeSlice = createSlice({
    name: "recipes",
    initialState: {
        all: []
    },
    reducers: {
        fetchRecipeSuccess(state, action) {
            state.all = action.payload
        }
    }
})

export const recipesActions = recipeSlice.actions
export const recipesReducer = recipeSlice.reducer

export const fetchRecipes = () => {
    return async (dispatch) => {
        try {
            let { data } = await axiosInstance({
                method: 'get',
                url: '/recipes',
                headers: {
                    "Authorization-AccessToken": "Bearer " + localStorage.getItem("token")
                }
            });
            dispatch(recipesActions.fetchRecipeSuccess(data))
            // console.log(data, '---> ini di AllRecipesCMSCard');
            // setRecipeLists(data)
        } catch (err) {
            console.log(err)
            console.log(err.response.data)
        }
    }
}

