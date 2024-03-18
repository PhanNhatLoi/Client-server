import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

function Home() {
  const history = useHistory();
  const socket = useRef();
  const user = useSelector((state) => state.auth.user);

  //   const [newMessage, setNewMessage] = useState(null);

  useEffect(() => {
    // socket.current = io("http://localhost:8000");
  }, []);

  useEffect(() => {
    // console.log(user, 1234);
    // if (user._id) {
    //   socket.current.emit("online", user._id);
    // }
  }, [user]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log(msg, 1234);
      });
    }
  }, []);

  return (
    <div className="home-page">
      <h2 style={{ color: "black", fontSize: "250px" }}>Home Page</h2>
      <Button
        onClick={() => {
          history.push("/chat");
        }}
      >
        Go to chat
      </Button>
      {/* <span>{newMessage}</span>
      <button
        onClick={() => {
          socket.current.emit("send-msg", {
            to: "65efff969c2c0835ae291a87",
            msg: "test chat",
          });
        }}
      >
        get Time
      </button> */}
    </div>
  );
}

export default Home;
