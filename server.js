const net = require('net')
const readline = require('readline')

const { CODES, IP_ADDRESS, MESSAGES, PORT } = require(`${__dirname}/utils/constants`)

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const onError = error => {
    if (error.code === CODES.ERROR.ECONNRESET) {
        console.log(MESSAGES.INFO.CLIENT_DISCONNECTED)
    }
}

const onDisconnection = () => {
    console.log(MESSAGES.INFO.CLIENT_DISCONNECTED)
}

const onData = data => {
    const message = data.toString()
    console.log(message)
}

const handleConnection = socket => {
    socket.on('error', onError)
    socket.on('end', onDisconnection)
    socket.on('data', onData)
    
    interface.addListener('line', line => {
        socket.write(`SERVER: ${line}`)
    })

    console.log(MESSAGES.INFO.CLIENT_CONNECTED)

    socket.write(MESSAGES.SERVER.CHAT_INFORMATION)
}

const server = net.createServer(handleConnection)
server.listen(PORT, IP_ADDRESS)
