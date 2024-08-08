import { useParams } from "react-router-dom";
import FormUpdateMyData from "../../components/FormUpdateMyData";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import NavBarCMSSite from "../../components/NavBarCMSSite";

export default function UpdateMyData() {
    const { id } = useParams()

    const [user, setUser] = useState({});

    const fetchDataUser = async () => {
        // console.log(id, '===>id');
        try {
            let { data } = await axiosInstance({
                method: 'get',
                url: '/get-user',
                headers: {
                    "Authorization-AccessToken": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(data, '---> ini user');
            setUser(data)
        } catch (err) {
            console.log(err)
            console.log(err.response.data)
        }
    }

    useEffect(() => {
        fetchDataUser()
    }, [id])



    return <>
        <NavBarCMSSite />
        <FormUpdateMyData user={user} />
    </>
}