import PropTypes from "prop-types"
import SearchAndOrderFeature from "./SearchAndOrderFeature"
import PageSizeFeature from "./PageSize"
// import FilterFeature from "./FilterFeature"
import PaginationHomePageFeature from "./PaginationHomePage"

import axiosInstance from "../utils/axios";
import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard"

export default function SearchFilterOrder() {
    const [recipe, setRecipe] = useState([]);

    const [search, setSearch] = useState("");
    const [pageSize, setPageSize] = useState(4);
    const [sort, setSort] = useState("title");

    const [currentPage, setCurrentPage] = useState(1);
    const [paginationOption, setPaginationOption] = useState({
        totalData: 0,
        totalPage: 1,
        dataPerPage: 0,
    });

    const [loading, setLoading] = useState()

    const fetchRecipe = async () => {
        try {
            setLoading(true)
            const { data } = await axiosInstance({
                method: 'get',
                url: '/pub/recipes',
                params: {
                    page: {
                        size: pageSize,
                        number: currentPage,
                    },
                    search: search,
                    sort,
                },
            });

            let { totalData, totalPage, dataPerPage } = data;
            console.log(data, 'fetch filter recipe HOMEPAGE===>>')

            setRecipe(data.data);
            setPaginationOption(() => ({ totalData, totalPage, dataPerPage }));
            setLoading(false)
        } catch (err) {
            console.log(err.response.data)
        }
    };

    const submitSearch = () => {
        if (currentPage !== 1) {
            setCurrentPage(1);
        } else {
            fetchRecipe();
        }
    };

    useEffect(() => {
        fetchRecipe();
    }, [pageSize, sort, currentPage]);


    return <>
        <div className="container d-flex flex-wrap justify-content-center" style={{
            marginTop: "20px"
        }}>
            <div className="row ">
                <div className="col-md-7">
                    <SearchAndOrderFeature
                        sort={sort}
                        search={search}
                        setSearch={setSearch}
                        submitSearch={submitSearch}
                        setSort={setSort}
                    />
                </div>
                <div className="col-md-4 ">
                    <PageSizeFeature pageSize={pageSize} setPageSize={setPageSize} />
                </div>
            </div>




        </div>

        <div className="container-fluid d-flex flex-wrap justify-content-center gap-5">
            {recipe.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
            ))}
        </div>

        <div className="w-full d-flex justify-content-center mt-3">
            <PaginationHomePageFeature
                paginationOption={paginationOption}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage} />
        </div>

    </>
}
