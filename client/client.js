const dgram = require('dgram');
const jsonSocket = require('udp-json');
const PORT = 8005;
const HOST = '127.0.0.1';

// Client
const client = dgram.createSocket('udp4'); // create udp socket
const json = new jsonSocket(client);

json.send({message: 'Hello World'}, PORT, HOST, (err) => {
    if(err) {
        console.log('error', err);
        return;
    }
    console.log('UDP Message Sent');
    client.close();
});