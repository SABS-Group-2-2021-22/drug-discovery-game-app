import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const ChatbotBase = ({ saved_mols, selected_mol, Roche, ...props }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Type your message to get started!", user: false }
  ]);
  const [userInput, setUserInput] = useState('');

  const chatWithGPT3 = async (input) => {
    const apiEndpoint = ''; // Your API endpoint
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_API_KEY` // Your actual API key
    };

    const data = {
      prompt: input, // Directly use the user input as the prompt
      max_tokens: 150
    };

    try {
      const response = await axios.post(apiEndpoint, data, { headers });
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error communicating with the API:', error.message);
      return 'Error connecting to chatbot';
    }
  };

  const handleUserInput = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return; // Do nothing if the input is empty

    const userMessage = { text: trimmedInput, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const aiMessage = { text: '...', user: false };
    setMessages((prevMessages) => [...prevMessages, aiMessage]);

    const response = await chatWithGPT3(trimmedInput);
    const newAiMessage = { text: response || 'Error connecting to chatbot', user: false };
    setMessages((prevMessages) => [...prevMessages.slice(0, -1), newAiMessage]);

    setUserInput(''); // Clear the input field after sending
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <>
      <button className="chatbot-toggle" onClick={toggleChatbot}>
        {isChatbotOpen ? '✕' : 'Chat'}
      </button>

      {isChatbotOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <button className="chatbot-close" onClick={toggleChatbot}>✕</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.user ? 'user-message' : 'ai-message'}`}>
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleUserInput} className="chatbot-input-form">
            <input
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="chatbot-input"
            />
            <button type="submit" className="send-message-button">Send</button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatbotBase;
