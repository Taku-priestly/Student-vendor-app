class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(token) {
    console.log('Mock socket connection with token:', token);
    // Mock connection
    return {
      on: (event, callback) => {
        console.log(`Listening for ${event}`);
        if (event === 'new_message') {
          // Simulate receiving a message
          setTimeout(() => {
            callback({
              text: 'Mock message from server',
              senderId: 'vendor_123',
              timestamp: new Date().toISOString()
            });
          }, 1000);
        }
      },
      emit: (event, data) => {
        console.log(`Emitting ${event}:`, data);
      }
    };
  }

  disconnect() {
    console.log('Mock socket disconnected');
  }
}

export const socketService = new SocketService();