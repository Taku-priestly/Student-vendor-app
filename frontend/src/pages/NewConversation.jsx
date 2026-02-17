import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewConversation = () => {
  const [vendorId, setVendorId] = useState("");
  const navigate = useNavigate();

  const startConversation = () => {
    // Later connect backend
    navigate(`/chat/123`);
  };

  return (
    <div>
      <h2>Start Conversation</h2>

      <input
        placeholder="Vendor ID"
        value={vendorId}
        onChange={(e) => setVendorId(e.target.value)}
      />

      <button onClick={startConversation}>Start</button>
    </div>
  );
};

export default NewConversation;
