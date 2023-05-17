import { useRef } from "react";
import { formatTime } from "../../../utils/formatTimeZone";
import { useEffect } from "react";

const Messages = ({ messages }) => {
  const messageRef = useRef();
  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="messages-container">
      {messages &&
        messages.length > 0 &&
        messages.map((mes, i) => (
          <div
            className={`text-container ${
              mes.sender.role !== "user" ? "owner" : ""
            }`}
            key={i}
            ref={messageRef}
          >
            <p className="msg">{mes.message}</p>
            <span className="time-stamp">
              {mes.timestamp
                ? formatTime(mes.timestamp)
                : formatTime(new Date())}
            </span>
          </div>
        ))}
    </div>
  );
};
export default Messages;
