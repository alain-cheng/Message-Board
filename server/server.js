const dgram = require('dgram');
const jsonSocket = require('udp-json');
const PORT = 8005;
const HOST = '127.0.0.1';

// Server
const server = dgram.createSocket('udp4');
const json = new jsonSocket(server);

server.on('listening', () => {
    console.log('UDP Server listening.');
});

server.on('message', (msg, rinfo) => {
    console.log(`${rinfo.address}:${rinfo.port} - ${msg}`);
});

json.on('message-complete', (msg, rinfo) => {
    console.log('Message received', rinfo, msg);
});

server.bind(PORT, HOST);