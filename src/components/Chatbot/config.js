// config.js
import CustomMessage from './CustomMessage'; // Import your custom message component

const config = {
    initialMessages: ["Hi! I'm your virtual assistant. How can I help you today?"],
    customComponents: {
        // Override the default bot message style
        botAvatar: (props) => null, // This line removes the bot avatar
        botChatMessage: (props) => <CustomMessage {...props} />,
    },
    // ... other configurations
};

export default config;