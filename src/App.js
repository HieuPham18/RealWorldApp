import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ArticlePage from "./components/ArticlePage/ArticlePage.jsx";
import Home from "./components/Home/Home";
import ModalArticle from "./components/ModalArticle/ModalArticle.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Setting from "./components/Setting/Setting.jsx";
import SignIn from "./components/SignIn/SignIn.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import DefaultLayout from "./layouts/DefaultPageLayout";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' exact element={
          <DefaultLayout>
            <Home />
          </DefaultLayout>
        } />
        <Route path='/article/:slug' exact element={
          <DefaultLayout>
            <ArticlePage />
          </DefaultLayout>
        } />
        <Route path='/editor/' exact element={
          <DefaultLayout>
            <ModalArticle />
          </DefaultLayout>
        } />
        <Route path='/editor/:slug' exact element={
          <DefaultLayout>
            <ModalArticle />
          </DefaultLayout>
        } />
        <Route path='/settings/' exact element={
          <DefaultLayout>
            <Setting />
          </DefaultLayout>
        } />
        <Route path='/profile/@:username' exact element={
          <DefaultLayout>
            <Profile />
          </DefaultLayout>
        } />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/login" exact element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
