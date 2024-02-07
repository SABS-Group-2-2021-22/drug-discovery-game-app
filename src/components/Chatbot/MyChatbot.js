// MyChatbot.js
import React from 'react';
import ChatBot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';

const MyChatbot = () => {
    return (
        <div className="App">
            <header className="App-header">
                <ChatBot
                    config={config}
                    actionProvider={ActionProvider} // Make sure this is a class, not an instance
                    messageParser={MessageParser}
                />
            </header>
        </div>
    );
};

export default MyChatbot;
