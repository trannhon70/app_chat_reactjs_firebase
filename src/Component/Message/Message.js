import React, { useEffect, useRef } from "react";
import Moment from "react-moment";
function Message({ msg, user1 }) {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);
  return (
    <div
      className={`Layout__Home-right-messenger-text ${
        msg.from === user1 ? "own" : ""
      }`}
      ref={scrollRef}
    >
      <p className={msg.from === user1 ? "Layout__Home-right-messenger-text-me" : "Layout__Home-right-messenger-text-friend"}>
        {msg.media ? <img src={msg.media} alt={msg.text} /> : null}
        <br/>
        <br/>
        {msg.text}
        <br />
        <small>
          {/* {moment(msg.createAt.toDate()).subtract(10, "days").calendar()} */}
          <Moment fromNow>{msg.createAt.toDate()}</Moment>
        </small>
      </p>
    </div>
  );
}

export default Message;
