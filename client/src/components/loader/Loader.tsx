import React from "react";
import "./Loader.css"
export const Loader: React.FunctionComponent = () => {
    return (
        <svg className="loader" viewBox="0 0 50 50">
            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"/>
        </svg>
    )
}
