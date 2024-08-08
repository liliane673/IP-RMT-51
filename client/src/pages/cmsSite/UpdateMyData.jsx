import { useParams } from "react-router-dom";
import FormUpdateMyData from "../../components/FormUpdateMyData";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import NavBarCMSSite from "../../components/NavBarCMSSite";
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from "../../store/sliceUser";

export default function UpdateMyData() {
    const { id } = useParams()

    // const [user, setUser] = useState({});
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.all)


    useEffect(() => {
        dispatch(fetchUser())
    }, [id])



    return <>
        <NavBarCMSSite />
        <FormUpdateMyData user={user} />
    </>
}