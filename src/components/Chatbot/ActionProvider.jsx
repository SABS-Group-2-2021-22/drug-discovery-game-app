// ActionProvider.js

import React from 'react';
import { connect } from "react-redux";
import { sendPromptToLLMExternal } from './sendPrompt.js'; // Correct the path if necessary



class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage, props) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
        this.props = props; // Store props
    }

    greet() {
        const greetingMessage = this.createChatBotMessage("Hi, nice to meet you!");
        this.updateChatbotState(greetingMessage);
    }

    async help() {
        const data = await sendPromptToLLMExternal();
        const responseMessage = this.createChatBotMessage(data);
        this.updateChatbotState(responseMessage);
    }

    updateChatbotState(message) {
        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }));
    }
}

export default ActionProvider;
