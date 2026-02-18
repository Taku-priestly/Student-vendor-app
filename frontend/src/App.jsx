import { Routes, Route } from "react-router-dom";
import Conversations from "./pages/Conversations.jsx";
import Chat from "./pages/Chat.jsx";
import Call from "./pages/Call.jsx";
import NewConversation from "./pages/NewConversation.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Conversations />} />
      <Route path="/new" element={<NewConversation />} />
      <Route path="/chat/:conversationId" element={<Chat />} />
      <Route path="/call/:conversationId" element={<Call />} />
    </Routes>
  );
}

export default App;