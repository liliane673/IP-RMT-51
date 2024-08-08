import PropTypes from "prop-types"
import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
    return <div className="card" style={{ width: 400, margin: "10px 10px" }}>
        <img
            src={recipe.imgUrl}
            className="card-img-top"
            alt="Fissure in Sandstone"
            height={"250px"}
        />
        <div className="card-body">
            <h5 className="card-title">{recipe.title}</h5>
            <p className="card-text">
                Category : {recipe.category}
                {/* tes */}
            </p>
            <Link to={"/recipe/detail/" + recipe.id} className="btn btn-primary" data-mdb-ripple-init="">
                Recipe Detail
            </Link>
        </div>
    </div>
}

RecipeCard.propTypes = {
    recipe: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        grams_per_portion: PropTypes.string,
        number_of_servings: PropTypes.number,
        ingredient: PropTypes.string,
        direction: PropTypes.string,
        imgUrl: PropTypes.string,
        category: PropTypes.string,
        type: PropTypes.string,
        factId: PropTypes.number,
    }),
}