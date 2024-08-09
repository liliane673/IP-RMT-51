import PropTypes from "prop-types"

export default function PageSizeFeature({ pageSize, setPageSize }) {
    return (

        <div className="container d-flex align-items-center">
            <label htmlFor="page-size">Page Size : </label>
            <select
                id="page-size"
                className="form-select w-50 ms-3"
                aria-label="Default select example"
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
            >
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="12">12</option>
            </select>
        </div>
    );
}

PageSizeFeature.propTypes = {
    pageSize: PropTypes.number,
    setPageSize: PropTypes.number,
}