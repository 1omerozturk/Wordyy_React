import { FaNotEqual } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

export function Error(){
    return(
        <div className="text-center">
            <h1 className="text-danger">Error 404</h1>
            <NavLink to="/">
            <p className="text-danger">
            Return home page
            </p>
            </NavLink>
        </div>
    )
}