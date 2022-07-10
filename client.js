const net = require('net')
const readline = require('readline')

const { CODES, IP_ADDRESS, MESSAGES, PORT, TIMEOUT } = require(`${__dirname}/utils/constants`)

const client = new net.Socket()

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const onError = (error) => {
    if (error.code === CODES.ERROR.ECONNRESET) {
        console.log(MESSAGES.INFO.CONNECTION_SHUTDOWN)
    } else if (error.code === CODES.ERROR.ECONNREFUSED) {
        console.log(MESSAGES.INFO.SERVER_UNAVAILABLE)
    }
}

const onConnect = () => {
    console.log(MESSAGES.INFO.CONNECTED)
}

const onDisconnection = () => {
    console.log(MESSAGES.INFO.DISCONNECTED)
}

const onData = data => {
    console.log(data.toString())
}

const socket = client.connect(PORT, IP_ADDRESS, () => {
    interface.addListener('line', line => {
        client.write(`CLIENT: ${line}`)
    })
})

socket.on('connect', onConnect)
socket.on('data', onData)
socket.on('end', onDisconnection)
socket.on('error', onError)
