import "./Chat.css";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { FaTelegram } from "react-icons/fa";
import openSocket from "socket.io-client";

const Chat = () => {
  const [chatrooms, setChatrooms] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // const getChatRooms = () => {
    //   fetch("https://tmdt.vercel.app/admin/chatrooms")
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setChatrooms(data);
    //     })
    //     .catch((err) => console.log(err));
    // };

    // getChatRooms();
    const socket = openSocket("http://localhost:5000");
    socket.on("posts", (data) => {
      console.log(data);
    });
    socket.on("send_message", (data) => {
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMessageChat = (roomId) => {
    fetch(`https://tmdt.vercel.app/admin/chatrooms/getById?roomId=${roomId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data.messages))
      .catch((err) => console.log(err));
  };

  const handleSend = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className="chatrooms-container">
        <Sidebar />
        <div className="chatrooms-main">
          <div className="chatrooms-title">
            <h1>Chat</h1>
          </div>
          <div className="chatrooms">
            <div className="chatrooms-navigation">
              <input type="text" placeholder="Search Contact" />
              <hr />
              {chatrooms &&
                chatrooms.map((chatroom) => (
                  <div className="room-id" key={chatroom._id}>
                    <button onClick={() => handleMessageChat(chatroom._id)}>
                      {chatroom._id}
                    </button>
                    <hr />
                  </div>
                ))}
            </div>
            <div className="chatrooms-chatInterface">
              <div className="messages-display">
                <div className="client">
                  {messages && messages.map((mes, i) => <p key={i}>{mes}</p>)}
                </div>
                <div className="admin">
                  <p>admin</p>
                </div>
              </div>
              <div className="send-message">
                <input
                  type="text"
                  placeholder="Type and enter"
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      handleSend(e);
                    }
                  }}
                />
                <a href="#">
                  <FaTelegram size="30" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
