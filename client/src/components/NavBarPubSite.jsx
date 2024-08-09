import PropTypes from "prop-types"
import { Link, NavLink } from "react-router-dom";
import { Buttons, OutlineButtons } from "./Buttons";

export default function NavBarPubSite() {
    return <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-body-tertiary ">
        <div className="col-md" style={{ display: "flex", marginLeft: 30 }}>
            <Link className="navbar-brand" to="/">
                Hack Healthy Recipes
            </Link>
        </div>
        <div className="col-md">
            <div
                className="d-flex"
                style={{ display: "flex", justifyContent: "end", alignItems: "center", columnGap: 20, marginRight: 30 }}
            >
                <div className="d-flex align-items-center">
                    <Link to="/login">
                        <Buttons>Login</Buttons>
                    </Link>
                </div>
                <div className="d-flex align-items-center">
                    <Link to="/register">
                        <OutlineButtons>Register</OutlineButtons>
                    </Link>
                </div>
            </div>
        </div>
    </nav>
}