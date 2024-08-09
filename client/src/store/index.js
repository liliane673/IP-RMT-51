import { configureStore } from '@reduxjs/toolkit'
import { recipesReducer } from './sliceRecipe'
import { userReducer } from './sliceUser'

export default configureStore({
    reducer: {
        recipes: recipesReducer,
        user: userReducer
    }
})