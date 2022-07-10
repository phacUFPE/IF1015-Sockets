const MESSAGES = {
    INFO: {
        CLIENT_CONNECTED: 'INFO: Client connected.',
        CLIENT_DISCONNECTED: 'INFO: Client disconnected.',
        CONNECTED: 'INFO: You\'re connected.',
        CONNECTION_SHUTDOWN: 'INFO: Server connection shutdown.',
        DISCONNECTED: 'INFO: Disconnected.',
        SERVER_UNAVAILABLE: 'INFO: Server unavailable. Please try again later.'
    },
    SERVER: {
        CHAT_INFORMATION: 'SERVER: Welcome to PHAC chat\'s, to exit the chat type twice CTRL + C.'
    }
}

const CODES = {
    ERROR: {
        ECONNREFUSED: 'ECONNREFUSED',
        ECONNRESET: 'ECONNRESET'
    }
}

module.exports = {
    CODES,
    IP_ADDRESS: '127.0.0.1' || process.env.IP_ADDRESS,
    MESSAGES,
    PORT: 4000,
    TIMEOUT: 5000,
}