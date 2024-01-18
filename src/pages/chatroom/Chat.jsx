import "./Chat.css";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { FaTelegram } from "react-icons/fa";
import openSocket from "socket.io-client";
import { handlerError } from "../../utils/notification";
import { getAllChatRooms, getChatroom, postMessage } from "../../api/admin";
import Spin from "../../components/Suspense/BoostrapSpinner/Spin";
import { useCallback } from "react";
import Messages from "./Components/Message";

const Chat = () => {
  const [chatrooms, setChatrooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const userId = localStorage.getItem("id_user");
  const fetchAllChatroom = async () => {
    try {
      const res = await getAllChatRooms();
      console.log(res.data);
      setChatrooms(res.data);
    } catch (err) {
      handlerError(err);
    }
  };
  const fetchChatroom = useCallback(
    async (roomId, allowLoading) => {
      if (allowLoading) {
        setLoading(true);
      }
      try {
        const res = await getChatroom(roomId);
        setMessages(res.data.messages);
      } catch (err) {
        handlerError(err);
      } finally {
        setLoading(false);
      }
    },
    [roomId, messages]
  );
  useEffect(() => {
    fetchAllChatroom();
    const socket = openSocket("http://localhost:5000");
    socket.on("posts", (data) => {
      // console.log(data);
      if (data.action === "post_mesage") {
        if (roomId === data.newMess.roomId) {
          fetchChatroom(data.newMess.roomId, false);
        } else {
          setRoomId(data.newMess.roomId);
          fetchAllChatroom();
        }
      }
      if (data.action === "delete_chatroom") {
        fetchAllChatroom();
        setMessages([]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSelectChatroom = (roomId) => {
    setRoomId(roomId);
    fetchChatroom(roomId, true);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!userId || !text) return;
    try {
      const data = {
        message: text,
        roomId,
        userId,
      };

      await postMessage(data);

      setText("");
      fetchChatroom(roomId, false);
    } catch (err) {
      handlerError(err);
    }
  };

  return (
    <div>
      <Header />
      <div className="chatrooms-container">
        <Sidebar />
        <div className="chatrooms-main">
          <div className="chatrooms">
            <div className="chatrooms-navigation">
              <input
                type="text"
                placeholder="Search Contact"
                className="form-control p-3"
              />
              <hr />
              <div className="rooms-list">
                {chatrooms.length > 0 &&
                  chatrooms.map((chatroom) => (
                    <div
                      className={`room-item ${
                        chatroom._id === roomId ? "active" : ""
                      }`}
                      key={chatroom._id}
                      onClick={() => handleSelectChatroom(chatroom._id)}
                    >
                      <span>{chatroom.user.fullName}</span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="chatrooms-chatInterface">
              {loading ? (
                <Spin size={"md"} color={"primary"} />
              ) : (
                <Messages messages={messages} />
              )}

              <div className="send-message">
                <input
                  type="text"
                  placeholder="Type your message"
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      handleSend(e);
                    }
                  }}
                  className="form-control col-11"
                />

                <FaTelegram
                  onClick={(e) => handleSend(e)}
                  size="30"
                  color="#246cb0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
