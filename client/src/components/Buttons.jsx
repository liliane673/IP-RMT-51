import PropTypes from "prop-types"
import { Link } from "react-router-dom";

export function SubmitButton() {
    return <button
        type="submit"
        className="btn btn-primary" style={{ marginRight: "10px" }}
    >
        Submit
    </button>
}

export function CancelButton() {
    return <button
        className="btn btn-outline-primary"
        type="cancel"
    >
        Cancel
    </button>

}

export function Buttons(props) {
    return <button
        className="btn btn-primary"
        type="submit"
    >
        {props.children}
    </button>
}

export function OutlineButtons(props) {
    return <button
        className="btn btn-outline-primary"
        type="submit"
    >
        {props.children}
    </button>
}

Buttons.propTypes = {
    props: PropTypes.element
}


export default { SubmitButton, CancelButton, Buttons, OutlineButtons }