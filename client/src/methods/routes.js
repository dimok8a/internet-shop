import {AuthPage} from "../pages/my-pages/profile-pages/auth-page/AuthPage";
import {PersonPage} from "../pages/my-pages/profile-pages/person-page/PersonPage";


export const useRoutes = (isAuth) => {
    if (isAuth) {
        return (
            <PersonPage/>
        )
    }
    return (
        <AuthPage/>
    )
}
