import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './Chatbot.css';

const ChatbotBase = ({ saved_mols, selected_mol, Roche, ...props }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Welcome to our service!", user: false }]);
  const [userInput, setUserInput] = useState('');
  const [chatMode, setChatMode] = useState('free'); // 'free' or 'buttons'
  const toggleChatMode = () => {
    setChatMode(chatMode === 'free' ? 'buttons' : 'free');
  };
  
  const apiEndpoint = 'http://localhost:5001/api/chat'; // Your API endpoint

  const chatWithGPT4 = async (input) => {
    const data = {
      prompt: input, // Use directly
    };

    try {
      const response = await axios.post(apiEndpoint, data);
      return response.data.answer.trim();
    } catch (error) {
      console.error('Error communicating with the API:', error.message);
      return 'Error connecting to chatbot';
    }
  };

  const handleUserInput = async (event) => {
    event.preventDefault();
    if (chatMode === 'free') {
      const trimmedInput = userInput.trim();
      if (!trimmedInput) return; // Do nothing if the input is empty

      const userMessage = { text: trimmedInput, user: true };
      setMessages(prevMessages => [...prevMessages, userMessage]);

      const aiMessage = { text: '...', user: false };
      setMessages(prevMessages => [...prevMessages, aiMessage]);

      const response = await chatWithGPT4(trimmedInput);
      const newAiMessage = { text: response || 'Error connecting to chatbot', user: false };
      setMessages(prevMessages => [...prevMessages.slice(0, -1), newAiMessage]);

      setUserInput(''); // Clear the input field after sending
    }
  };

  const handlePresetPrompt = async (presetInput) => {
    if (chatMode === 'buttons') {
      const prompt = presetInput === 'Hello' ? 'Hello, what is the aim of the game?' : 'I need help';
      
      const userMessage = { text: presetInput, user: true };
      setMessages(prevMessages => [...prevMessages, userMessage]);

      const aiMessage = { text: '...', user: false };
      setMessages(prevMessages => [...prevMessages, aiMessage]);

      const response = await chatWithGPT4(prompt);
      const newAiMessage = { text: response || 'Error connecting to chatbot', user: false };
      setMessages(prevMessages => [...prevMessages.slice(0, -1), newAiMessage]);
    }
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
            <button className="chat-mode-toggle" onClick={toggleChatMode}>
              {chatMode === 'free' ? 'Switch to Buttons' : 'Switch to Free'}
            </button>
            <button className="chatbot-close" onClick={toggleChatbot}>✕</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.user ? 'user-message' : 'ai-message'}`}>
                {message.text}
              </div>
            ))}
          </div>
          {chatMode === 'free' && (
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
          )}
          {chatMode === 'buttons' && (
            <div className="chatbot-buttons">
              <button onClick={() => handlePresetPrompt('Hello')}>Hello</button>
              <button onClick={() => handlePresetPrompt('Help')}>Help</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  Roche: state.init.Roche,
  selected_mol: state.selector.selected_mol,
  saved_mols: state.assay.saved_mols,
});

const ConnectedChatbot = connect(mapStateToProps)(ChatbotBase);

export default ConnectedChatbot;
