const MessageBubble = ({ message }) => {
  return (
    <div
      style={{
        textAlign: message.sender === "student" ? "right" : "left",
        margin: "10px",
      }}
    >
      {message.text}
    </div>
  );
};

export default MessageBubble;
