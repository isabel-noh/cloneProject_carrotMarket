import React from "react";
import "./App.css";
import Navbar from "../components/Navbar";
import { Route } from "react-router-dom"; // 경로설정및 이동을위해 꼭 필요함
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/store";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import MyPage from "../pages/MyPage";
import MainPage from "../pages/MainPage";
import PostDetailPage from "../pages/PostDetailPage";
import PostWritePage from "../pages/PostWritePage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { useEffect } from "react";

function App() {
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const isToken = localStorage.getItem('token') ? true: false;
  
  useEffect(() => {
    if(isToken){
      dispatch(userActions.isLogin(localStorage.getItem("token")));
    }
  }, [userId]);

  return (
    <>
      <ConnectedRouter history={history}>
        {/* <Header /> */}
        <Navbar />
        <Route path="/" exact component={MainPage} />
        <Route path="/mypage" exact component={MyPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/post/detail/:postId" exact component={PostDetailPage} />
        <Route path="/post/write" exact component={PostWritePage} />
        <Route path="/signup" exact component={SignUpPage} />
      </ConnectedRouter>
    </>
  );
}

export default App;
