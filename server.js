const net = require('net')
const readline = require('readline')

const { CODES, IP_ADDRESS, MESSAGES, PORT } = require(`${__dirname}/utils/constants`)

const clients = []

const handleConnection = socket => {
    clients.push(socket)

    console.log(socket.nickname)

    const onData = data => {
        const message = data.toString()
        broadcast(data, socket)
    }

    const onError = error => {
        if (error.code === CODES.ERROR.ECONNRESET) {
            clients.splice(clients.indexOf(socket), 1)
            console.log(MESSAGES.INFO.CLIENT_DISCONNECTED)
        }
    }
    
    const onDisconnection = () => {
        console.log(MESSAGES.INFO.CLIENT_DISCONNECTED)
    }

    socket.on('error', onError)
    socket.on('end', onDisconnection)
    socket.on('data', onData)

    console.log(MESSAGES.INFO.CLIENT_CONNECTED)

    socket.write(MESSAGES.SERVER.CHAT_INFORMATION)
}

const server = net.createServer(handleConnection)
server.listen(PORT, IP_ADDRESS)

function broadcast(message, whoSent) {
    clients.forEach(client => {
        if (client !== whoSent) {
            client.write(message)
        }
    })
}

console.log(`Server listening on port: ${PORT}`)
