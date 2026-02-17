import { io } from 'socket.io-client';

class RealSocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.backendUrl = 'http://localhost:3003'; // Your communication service port
  }

  connect(token) {
    console.log(`🔌 Connecting to real backend: ${this.backendUrl}`);
    
    this.socket = io(this.backendUrl, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
    });

    this.socket.on('connect', () => {
      console.log('✅ Connected to real backend');
      this.isConnected = true;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Disconnected from backend:', reason);
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error.message);
      this.isConnected = false;
    });

    return this.socket;
  }

  sendMessage(messageData) {
    if (this.socket && this.isConnected) {
      this.socket.emit('send_message', messageData);
      return true;
    }
    console.warn('Cannot send message: Socket not connected');
    return false;
  }

  joinChat(chatData) {
    if (this.socket && this.isConnected) {
      this.socket.emit('join_chat', chatData);
      return true;
    }
    return false;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  getConnectionStatus() {
    return this.isConnected;
  }
}

export const realSocketService = new RealSocketService();