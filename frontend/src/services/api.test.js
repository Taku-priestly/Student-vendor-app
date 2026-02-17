import axios from 'axios';

const API_BASE = 'http://localhost:3003';

export const testBackendEndpoints = async () => {
  const tests = [
    {
      name: 'Health Check',
      endpoint: '/health',
      method: 'GET'
    },
    {
      name: 'Get Chats',
      endpoint: '/api/chats',
      method: 'GET'
    },
    {
      name: 'Create Chat',
      endpoint: '/api/chats',
      method: 'POST',
      data: {
        participant1: 'student_123',
        participant2: 'vendor_456',
        type: 'order_chat'
      }
    }
  ];

  console.log('🧪 Testing Backend Endpoints...');
  
  for (const test of tests) {
    try {
      const response = await axios({
        method: test.method,
        url: `${API_BASE}${test.endpoint}`,
        data: test.data,
        timeout: 5000
      });
      console.log(`✅ ${test.name}:`, response.status, response.data);
    } catch (error) {
      console.log(`❌ ${test.name}:`, error.message);
    }
  }
};

// Run tests when imported
if (typeof window !== 'undefined') {
  setTimeout(() => {
    testBackendEndpoints();
  }, 2000);
}