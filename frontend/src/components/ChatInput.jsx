import { useState } from "react";

const ChatInput = () => {
  const [text, setText] = useState("");

  const sendMessage = () => {
    console.log(text);
    setText("");
  };

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatInput;
