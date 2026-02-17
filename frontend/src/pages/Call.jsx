import { useParams } from "react-router-dom";

const Call = () => {
  const { conversationId } = useParams();

  return (
    <div>
      <h2>Call in Progress</h2>
      <p>Conversation ID: {conversationId}</p>

      <button>🔴 End Call</button>
    </div>
  );
};

export default Call;
