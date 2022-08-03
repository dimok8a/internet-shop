import React from "react";


export const ErrorPage: React.FunctionComponent = () => {
    document.title = "Ошибка"
    return (
        <h3 className="center">Упс... Этой страницы не существует</h3>
    )
}
