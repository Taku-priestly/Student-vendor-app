import { useParams } from "react-router-dom";
import { useEffect,  useState} from "react";
import { createConversation } from "../api/api";  

function Conversations() {

  const chats = [
    {
      id: 1,
      name: "Campus Grill",
      message: "Your burger is ready for pickup!",
      time: "2M AGO",
      avatar: "https://i.imgur.com/8Km9tLL.png",
    },
    {
      id: 2,
      name: "Baker & Sons",
      message: "We’ve run out of sourdough...",
      time: "15M AGO",
      avatar: "https://i.imgur.com/8Km9tLL.png",
    },
    {
      id: 3,
      name: "Smoothie King",
      message: "Thank you for your order!",
      time: "YESTERDAY",
      avatar: "https://i.imgur.com/8Km9tLL.png",
    },
    {
      id: 4,
      name: "Pizzeria Romana",
      message: "Your delivery driver is nearby!",
      time: "2 DAYS AGO",
      avatar: "https://i.imgur.com/8Km9tLL.png",
    },
  ];

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      background: "#f5f6f8",
      height: "100vh",
    },

    title: {
      marginBottom: "15px",
    },

    search: {
      width: "100%",
      padding: "12px",
      borderRadius: "20px",
      border: "none",
      background: "#eaecef",
      marginBottom: "15px",
    },

    tabs: {
      display: "flex",
      gap: "10px",
      marginBottom: "15px",
    },

    tabBtn: {
      border: "none",
      padding: "8px 15px",
      borderRadius: "20px",
      background: "#eaecef",
      cursor: "pointer",
    },

    activeTab: {
      background: "#0aa2d4",
      color: "white",
    },

    chatList: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },

    chatItem: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
      background: "white",
      padding: "10px",
      borderRadius: "12px",
      cursor: "pointer",
    },

    avatar: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
    },

    chatInfo: {
      flex: 1,
    },

    topRow: {
      display: "flex",
      justifyContent: "space-between",
    },

    time: {
      fontSize: "12px",
      color: "gray",
    },

    message: {
      fontSize: "14px",
      color: "gray",
      margin: "3px 0 0",
    },

    callBtn: {
      position: "fixed",
      bottom: "30px",
      right: "30px",
      background: "#0aa2d4",
      border: "none",
      color: "white",
      padding: "18px",
      borderRadius: "50%",
      fontSize: "20px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Messages</h2>

      <input
        style={styles.search}
        placeholder="Search vendors or orders"
      />

      <div style={styles.tabs}>
        <button style={{ ...styles.tabBtn, ...styles.activeTab }}>
          All Chats
        </button>
        <button style={styles.tabBtn}>Unread</button>
        <button style={styles.tabBtn}>Support</button>
      </div>

      <div style={styles.chatList}>
        {chats.map((chat) => (
          <div key={chat.id} style={styles.chatItem}>
            <img src={chat.avatar} alt="" style={styles.avatar} />

            <div style={styles.chatInfo}>
              <div style={styles.topRow}>
                <h4 style={{ margin: 0 }}>{chat.name}</h4>
                <span style={styles.time}>{chat.time}</span>
              </div>

              <p style={styles.message}>{chat.message}</p>
            </div>
          </div>
        ))}
      </div>

      <button style={styles.callBtn}>📞</button>
    </div>
  );
}

export default Conversations;
