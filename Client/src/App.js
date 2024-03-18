import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Body from "./components/UserPage/LandingPage/Body";
import NavHeader from "./components/UserPage/LandingPage/Header";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import {
  fetchUser,
  dispatchGetUser,
  dispatchLogin,
} from "./redux/actions/authAction";
import { io } from "socket.io-client";

function App() {
  //const
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isLogged, token, user } = auth;
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:8000");
  }, []);

  useEffect(() => {
    if (user?._id && socket.current) {
      socket.current.emit("online", user._id);
    }
  }, [user, socket]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log(msg, 1234);
      });
    }
  }, []);

  const getToken = async () => {
    const res = await axios.post("/user/refresh_token", null);
    dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
  };

  const getUser = async () => {
    return fetchUser(token).then((res) => {
      dispatch(dispatchGetUser(res));
    });
  };

  //effect
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      console.log("isLogged", isLogged);
      getToken();
      dispatch(dispatchLogin());
    }
  }, [isLogged]);

  useEffect(() => {
    if (token) getUser();
  }, [token]);

  //render
  return (
    <div>
      <Router>
        <div className="body">
          <Body />
        </div>
        <NavHeader />
      </Router>
    </div>
  );
}

export default App;
