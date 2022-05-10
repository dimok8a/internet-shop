import React from "react";
import {Link} from "react-router-dom";

export const AdminSelector: React.FunctionComponent = () => {
    return (
        <div className="container admin_container">
            <Link to="addItem" className="waves-effect waves-light btn-large admin_btn">Добавить вещь</Link>
            <Link to="removeItem" className="waves-effect waves-light btn-large admin_btn">Удалить вещь</Link>
        </div>
    )
}