const net = require('net')
const readline = require('readline')

const { CODES, IP_ADDRESS, MESSAGES, PORT, TIMEOUT } = require(`${__dirname}/utils/constants`)

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const chooseNickname = new Promise(resolve => {
    interface.question(MESSAGES.INFO.ENTER_NICKNAME, nickname => {
        resolve(nickname)
    })
})

chooseNickname.then(nickname => {
    const client = new net.Socket()

    client.nickname = nickname

    const onConnect = () => {
        console.log(MESSAGES.INFO.CONNECTED)
        socket.write(`${nickname} ${MESSAGES.INFO.HAS_CONNECTED}`)
    }

    const onDisconnection = () => {
        console.log(MESSAGES.INFO.DISCONNECTED)
    }

    const onData = data => {
        console.log(data.toString())
    }

    const socket = client.connect(PORT, IP_ADDRESS, () => {
        interface.addListener('line', message => {
            client.write(`${nickname}: ${message}`) 
        })
    })

    const onError = (error) => {
        if (error.code === CODES.ERROR.ECONNRESET) {
            console.log(MESSAGES.INFO.CONNECTION_SHUTDOWN)
            socket.write(`${nickname} ${MESSAGE.INFO.HAS_DISCONNECTED}.`)
        } else if (error.code === CODES.ERROR.ECONNREFUSED) {
            console.log(MESSAGES.INFO.SERVER_UNAVAILABLE)
        }
    }

    socket.on('connect', onConnect)
    socket.on('data', onData)
    socket.on('end', onDisconnection)
    socket.on('error', onError)
    })
