import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axios'

const userSlice = createSlice({
    name: "user",
    initialState: {
        all: {}
    },
    reducers: {
        fetchUserSuccess(state, action) {
            state.all = action.payload
        }
    }
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer

export const fetchUser = () => {
    return async (dispatch) => {
        try {
            let { data } = await axiosInstance({
                method: 'get',
                url: '/get-user',
                headers: {
                    'Authorization-AccessToken': "Bearer " + localStorage.getItem("token")
                }
            })
            dispatch(userActions.fetchUserSuccess(data))
            // setUser(data)
            console.log(data, '====> data user di cms');
        } catch (err) {
            console.log(err)
        }
    }
}
