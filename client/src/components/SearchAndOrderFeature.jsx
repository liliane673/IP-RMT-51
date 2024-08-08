import PropTypes from "prop-types"

export default function SearchAndOrderFeature({
    sort,
    search,
    setSearch,
    submitSearch,
    setSort,
}) {
    const handleSearch = (e) => {
        e.preventDefault();
        submitSearch(search);
    };

    return <div className="d-flex justify-content-end">
        <div className="container d-flex align-items-center" style={{ columnGap: "none" }}>
            <label htmlFor="sort-by">Sort by : </label>
            <select
                id="sort-by"
                className="form-select w-50 ms-3"
                aria-label="Default select example"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
            >
                <option
                    className="form-check-input me-3"
                    name="sort-by"
                    value=""
                    id="sort-by"
                    disabled
                >
                    ---Select Order By---
                </option>
                <option value="title"> A - Z</option>
                <option value="-title">Z - A</option>
                <option value="-createdAt">Newest</option>
                <option value="createdAt">Oldest</option>
            </select>
        </div>

        <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary" type="submit" >
                Search
            </button>
        </form>
    </div>
}

SearchAndOrderFeature.propTypes = {
    sort: PropTypes.string,
    search: PropTypes.string,
    setSearch: PropTypes.string,
    submitSearch: PropTypes.func,
    setSort: PropTypes.string,
}
