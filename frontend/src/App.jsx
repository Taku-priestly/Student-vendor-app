
import { Routes, Route } from "react-router-dom";
import Conversations from "./pages/Conversations";
import Chat from "./pages/Chat";
import Call from "./pages/Call";
import NewConversation from "./pages/NewConversation";

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
