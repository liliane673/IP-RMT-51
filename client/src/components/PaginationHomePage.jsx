import PropTypes from "prop-types"

export default function PaginationHomePageFeature({
    paginationOption,
    currentPage,
    setCurrentPage,
}) {
    const { totalPage } = paginationOption;
    console.log(paginationOption, 'paginationOption')

    const handleChangePage = (page) => {
        if (page < 1 || page > totalPage) return;
        setCurrentPage(page);
    };

    const pageNumbers = () => {
        let numbers = [];
        for (let i = 1; i <= totalPage; i++) {
            console.log(i, '====> index pages')
            numbers.push(
                <li className="page-item" key={i}>
                    {/* create Link to corresponding page number */}
                    <button
                        className={
                            "page-link " +
                            (currentPage === i ? "fw-semibold link-underline-primary" : "")
                        }
                        onClick={() => handleChangePage(i)}
                    >
                        {i}
                    </button>
                </li>
            );
        }
        return numbers;
    };

    return (
        <ul className="pagination">
            <li className="page-item">
                {/* create link to previous page that will not work if at the first page */}
                <button
                    className="page-link"
                    onClick={() => handleChangePage(currentPage - 1)}
                >
                    Previous
                </button>
            </li>
            {/* render the page number generated from pageNumbers */}
            {pageNumbers()}
            <li className="page-item">
                {/* create link to next page that will not work if at the lastest page */}
                <button
                    className="page-link"
                    onClick={() => handleChangePage(currentPage + 1)}
                >
                    Next
                </button>
            </li>
        </ul>
    );
}

PaginationHomePageFeature.propTypes = {
    paginationOption: PropTypes.shape({
        totalData: PropTypes.number,
        totalPage: PropTypes.number,
        dataPerPage: PropTypes.number,
    }),
    currentPage: PropTypes.number,
    setCurrentPage: PropTypes.number,
}