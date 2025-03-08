import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.echogpt.live/v1',
  headers: {
    'x-api-key': 'YOUR_API_KEY', // Replace with your actual API key
    'Content-Type': 'application/json'
  }
});

export const sendMessage = async (userMessage) => {
  try {
    const response = await apiClient.post('/chat/completions', {
      model: "EchoGPT",
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userMessage }
      ]
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('API Error:', error);
    return 'Error: Failed to get response from AI';
  }
};

export default apiClient;