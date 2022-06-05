const dgram = require('dgram');
const jsonSocket = require('udp-json');

const PORT = 8005;
const HOST = '127.0.0.1';

// Objects
const user = [
    {"username": "greg"},
    {"username": "john"}
]

// Create UDP socket
const server = dgram.createSocket('udp4');
const json = new jsonSocket(server);

server.on('listening', () => {
    console.log('Waiting to receive message...');
    printUsers(user);
});

// Message from client received
json.on('message-complete', (msg, rinfo) => {
    console.log(`${rinfo.address}:${rinfo.port}`, msg);
});

function printUsers(obj) {
    console.log("Users in message board:", obj);
}

server.bind(PORT, HOST);