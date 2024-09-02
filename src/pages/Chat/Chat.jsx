import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import ChatBox from "../../components/ChatBox/ChatBox";
import RightSideBar from "../../components/RightSidebar/RightSideBar";
import { AppContext } from "../../context/AppContext";

const Chat = () => {
  const { chatData, userData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (chatData && userData) {
      setLoading(false);
    }
  });
  return (
    <div className="chat">
      {loading ? (
        <p className="loading">Loading....</p>
      ) : (
        <div className="chat-container">
          <LeftSidebar />
          <ChatBox />
          <RightSideBar />
        </div>
      )}
    </div>
  );
};

export default Chat;
