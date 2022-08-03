import {createContext} from "react";

function loginTemplate(token, id){}
function logoutTemplate(){}
export const AuthContext = createContext({
    token : null,
    userId : null,
    login: loginTemplate,
    logout: logoutTemplate
})
