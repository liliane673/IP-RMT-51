import React from 'react'

import {
    createBrowserRouter,
    redirect,
} from "react-router-dom";


import Home from './pages/pubSite/Home.jsx'
import Login from './pages/cmsSite/Login.jsx';
import RegisterPage from './pages/cmsSite/RegisterPage.jsx';
import MainPage from './pages/cmsSite/MainPage.jsx';
import MySavedRecipes from './pages/cmsSite/MySavedRecipes.jsx';
import RecipeRecommendation from './pages/cmsSite/RecipeRecommendation.jsx';
import UpdateMyData from './pages/cmsSite/UpdateMyData.jsx';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/register",
        loader: () => {
            const token = localStorage.getItem("token");
            // console.log(token, "---->token")
            if (token) {
                throw redirect("/");
            }
            return null;
        },
        element: <RegisterPage />
    },
    {
        path: "/login",
        loader: () => {
            const token = localStorage.getItem("token");
            // console.log(token, "---->token")
            if (token) {
                throw redirect("/");
            }
            return null;
        },
        element: <Login />
    },
    {
        loader: () => {
            const token = localStorage.getItem("token");
            if (!token) {
                throw redirect("/login");
            }
            return null;
        },
        children: [
            {
                path: "/cms/recipes",
                element: <MainPage />
            },
            {
                path: "/cms/recipes/:id",
                element: <DetailOnePostPub />
            },
            {
                path: "/cms/my-saved-recipes",
                element: <MySavedRecipes />
            },
            {
                path: "/cms/recipe-recommendation",
                element: <RecipeRecommendation />
            },
            {
                path: "/update-my-data",
                element: <UpdateMyData />
            },
        ]
    }

]);