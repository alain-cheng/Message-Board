const dgram = require('dgram');
const jsonSocket = require('udp-json');

const PORT = 8005;
const HOST = '127.0.0.1';

// Objects
const example = {
    "key1": "value1",
    "key2": "value2",
    "key3": "value3",
    "key4": 7,
    "key5": null,
    "favFriends": ["Kolade", "Nithya", "Dammy", "Jack"],
    "favPlayers": {"one": "Kante", "two": "Hazard", "three": "Didier"}
}

const users = [
    {"username": "greg"},
    {"username": "john"},
    {"username": "wick"}
]

// Create UDP socket
const server = dgram.createSocket('udp4');
const json = new jsonSocket(server);

server.on('listening', () => {
    console.log('Waiting to receive message...');
    printObj(users);
});

json.on('message-complete', (msg, rinfo) => {
    console.log(`${rinfo.address}:${rinfo.port}`, msg);
});

function printObj(obj) {
    console.log("Users in message board:", obj);
}

server.bind(PORT, HOST);