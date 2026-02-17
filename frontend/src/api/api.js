import axios from "axios";

// Base URL of your backend
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ===== CONVERSATIONS =====
export const createConversation = (data) =>
  API.post("/conversations", data);

// ===== MESSAGES =====
export const sendMessage = (data) =>
  API.post("/messages", data);

export const getMessages = (conversationId) =>
  API.get(`/messages/${conversationId}`);
