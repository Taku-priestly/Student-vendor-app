import axios from 'axios';

// Base URL for your communication service backend
const API_BASE_URL = 'http://localhost:5173'; // Update with your actual port

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const chatAPI = {
  // Get chat history
  getChatHistory: (userId, vendorId) => 
    api.get(`/chats/history/${userId}/${vendorId}`),
  
  // Get user's conversations
  getConversations: (userId) => 
    api.get(`/chats/conversations/${userId}`),
  
  // Mark messages as read
  markAsRead: (chatId) => 
    api.put(`/chats/mark-read/${chatId}`),
  
  // Get unread count
  getUnreadCount: (userId) => 
    api.get(`/chats/unread/${userId}`),
};

export const callAPI = {
  // Initiate a call
  initiateCall: (callData) => 
    api.post('/calls/initiate', callData),
  
  // End a call
  endCall: (callId) => 
    api.put(`/calls/end/${callId}`),
  
  // Get call history
  getCallHistory: (userId) => 
    api.get(`/calls/history/${userId}`),
};

export const notificationAPI = {
  // Get notifications
  getNotifications: (userId) => 
    api.get(`/notifications/${userId}`),
  
  // Mark notification as read
  markNotificationRead: (notificationId) => 
    api.put(`/notifications/read/${notificationId}`),
};

export default api;