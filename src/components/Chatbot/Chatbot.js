import { connect } from 'react-redux';
import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const ChatbotBase = ({ saved_mols, selected_mol, Roche, ...props }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Use the buttons to get help with whatever you need :)", user: false }
  ]);


  const constructPrompt = (userInput) => {

    const myMolecule = saved_mols[selected_mol]?.data.drug_props;
    const rocheMolecule = Roche.data.drug_props;


    const myMoleculeData = `Mouse clearance: ${myMolecule.clearance_mouse}, Human clearance: ${myMolecule.clearance_human}, logD: ${myMolecule.logd}, PAMPA: ${myMolecule.pampa}, pIC50: ${myMolecule.pic50}`;
    const rocheMoleculeData = `Mouse clearance: ${rocheMolecule.clearance_mouse}, Human clearance: ${rocheMolecule.clearance_human}, logD: ${rocheMolecule.logd}, PAMPA: ${rocheMolecule.pampa}, pIC50: ${rocheMolecule.pic50}`;

    return `I am designing a drug to bind a target molecule. My binding molecule is a dipeptide which consists of two R groups. My test results are: ${myMoleculeData}. The ideal test results are ${rocheMoleculeData}. ${userInput}`;
  };

  const chatWithGPT3 = async (userInput) => {
    const apiEndpoint = ''; 
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `*` 
    };

    const data = {
      prompt: constructPrompt(userInput), 
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

  const handlePresetPrompt = async (presetInput) => {
      const prompt = constructPrompt(presetInput);
      const userMessage = { text: presetInput, user: true };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      
      const aiMessage = { text: '...', user: false };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
  
      const response = await chatWithGPT3(prompt);
      const newAiMessage = { text: response || 'Error connecting to chatbot', user: false };
      setMessages((prevMessages) => [...prevMessages.slice(0, -1), newAiMessage]);
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
          <div className="chatbot-buttons">
            <button onClick={() => handlePresetPrompt('Hello')}>Hello</button>
            <button onClick={() => handlePresetPrompt('Help')}>Help</button>
            {/* Add more buttons as needed */}
          </div>
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