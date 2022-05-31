const dgram = require('dgram');
const PORT = 8005;
const HOST = '127.0.0.1';

// Server
const server = dgram.createSocket('udp4');
server.bind(PORT, HOST);

server.on('listening', () => {
    console.log('UDP Server listening.');
});

server.on('message', (msg, rinfo) => {
    console.log(`${rinfo.address}:${rinfo.port} - ${msg}`);
});