const dgram = require('dgram');
const PORT = 8005;
const HOST = '127.0.0.1';

// Client
const client = dgram.createSocket('udp4');
const msg = "How are you!";

client.send(msg, PORT, HOST, (err) => {
    if (err) throw err;
    console.log('UDP message sent');
    client.close();
});