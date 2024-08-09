import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    // baseURL: "https://hack-healthy-recipes.liliane-ernestin.site"
})

export default axiosInstance