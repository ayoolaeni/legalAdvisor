// src/api/chat.ts
export const fetchChatResponse = async (message: string): Promise<string> => {
  try {
    const response = await fetch('http://localhost:5200/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // ✅ Send login session cookie
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    if (data.response) {
      return data.response;
    } else if (data.error) {
      return `⚠️ Error: ${data.error}`;
    } else {
      return '⚠️ Unexpected response from server.';
    }
  } catch (err) {
    return '⚠️ Failed to connect to backend.';
  }
};
