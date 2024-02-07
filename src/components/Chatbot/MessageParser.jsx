// MessageParser.js
class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }

    parse(message) {
        const lowerCaseMessage = message.toLowerCase();

        if (lowerCaseMessage.includes("hello")) {
            this.actionProvider.greet();

        } if (lowerCaseMessage.includes("help")) {
            this.actionProvider.help()
        }
        // Add more conditions for handling user inputs here
    }
}

export default MessageParser;
