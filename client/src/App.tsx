import React, {useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {AdminPage} from "./pages/admin-pages/admin-page/AdminPage";
import {MainPage} from "./pages/main-page/MainPage";
import {changeTitle} from "./methods/changeTitle.method";
import {EUrl} from "./enums";
import {MyPage} from "./pages/my-pages/my-page/MyPage";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {usePath} from "./hooks/path.hook";
import {ErrorPage} from "./pages/error-page/ErrorPage";
import {Loading} from "./components/loading/Loading";

function App() {

    const path = usePath();
    // Смена тайтла страницы
    useEffect(()=>{
        changeTitle(path);
    }, [path])

    const { token, userId, waitingChanges, waitingVerification } = useAuth();

    return (
      <BrowserRouter>
          <AuthContext.Provider value={{token, userId}}>
              <Routes>
                  <Route element={<MainPage/>} path={EUrl.main.url}/>
                  <Route element={<AdminPage/>} path="/admin/*"/>
              </Routes>
          </AuthContext.Provider>
      </BrowserRouter>
  );
}

export default App;
