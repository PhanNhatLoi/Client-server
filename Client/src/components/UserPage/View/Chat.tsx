import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SidebarChat from "../../Chat/Sidebar";
import { Avatar, Button, Input } from "antd";
import {
  ExclamationCircleOutlined,
  PhoneOutlined,
  SendOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import HeaderChat from "../../Chat/Header";
import ChatContent from "../../Chat/ChatContent";
import { io } from "socket.io-client";
import { UserType } from "@/src/type";
import { useSelector } from "react-redux";

const ChatStyled = styled.div`
  padding: 10px 40px 0 40px;

  .circle-online {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: green;
    margin-right: 5px;
  }

  .circle-offline {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: gray;
    margin-right: 5px;
  }

  .chat {
    margin: 10px;
    border: solid 0.5px gray;
    border-radius: 8px;
    height: 80vh;
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .sidebar {
      width: 30%;
      height: 100%;
      border-right: solid 0.5px gray;
      @media (max-width: 700px) {
        width: 60px;
      }

      .sidebar-title {
        @media (max-width: 700px) {
          display: none;
        }
        padding: 10px;
        font-weight: 700;
        width: 100%;
        height: 80px;
        font-size: 40px;
        span.number {
          color: gray;
        }
      }
      .sidebar-scroll {
        height: calc(100% - 80px);
        overflow: hidden;
        overflow-y: auto;
      }
    }

    .chat-container {
      position: relative;
      height: 100%;
      width: 70%;
      display: flex;
      flex-wrap: wrap;

      @media (max-width: 700px) {
        width: calc(100% - 60px);
      }

      .chat-header {
        padding: 10px;
        width: 100%;
        height: 80px;
        border-bottom: solid 0.5px gray;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
      }

      .chat-content {
        position: absolute;
        top: 80px;
        width: 100%;
        height: calc(100% - 80px - 80px);
        overflow-y: auto;
        padding: 10px;
      }
      .chat-input {
        background: white;
        width: 100%;
        border-top: solid 0.5px gray;
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: flex-end;
      }
    }
  }
`;

const Chat = () => {
  const [value, setValue] = useState<string>("");
  const socket: any = useRef();
  const currentChat: UserType = useSelector((state: any) => state.currentChat);

  useEffect(() => {
    socket.current = io("http://localhost:8000");
  }, []);

  const handleChat = () => {
    socket.current.emit("send-msg", {
      to: currentChat._id,
      msg: value,
    });
    setValue("");
  };
  return (
    <ChatStyled>
      <div className="chat">
        <SidebarChat />
        <div className="chat-container">
          <HeaderChat />
          <ChatContent />
          <div className="chat-input">
            <Input
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onPressEnter={() => {
                handleChat();
              }}
              value={value}
              placeholder="Chat some thing..."
              // autoSize={{ minRows: 1, maxRows: 2 }}
              style={{ fontSize: "40px", width: "90%" }}
            />
            <Button
              style={{ width: "15%", height: "100%" }}
              type="text"
              onClick={() => {
                handleChat();
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </ChatStyled>
  );
};

export default Chat;
