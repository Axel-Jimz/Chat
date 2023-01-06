import React from "react";

const Friend = ({ socket, name, setRoom, setShowChat }) => {

  const startChat = () => {
    socket.emit('startChat', name)
    setRoom(name)
    setShowChat(true)
  };

  return (
    <div className="friend" onClick={startChat}>
      <span>{name}</span>
    </div>
  );
};

export default Friend;
