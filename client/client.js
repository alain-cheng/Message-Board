const dgram = require('dgram');
const jsonSocket = require('udp-json');
const PORT = 8005;
const HOST = '127.0.0.1';

// Client
const client = dgram.createSocket('udp4');
const json = new jsonSocket(client, {maxPayload: 496, timeout: 1000});

client.send("Hello.", PORT, HOST, (err) => {
    if (err) throw err;
    console.log('UDP message sent');
    client.close();
});

json.send({dummy: 'baka'}, PORT, HOST, (err) => {
    if(err) {
        console.log('error', err);
        return;
    }
    console.log('Message Sent');
});

//client.send(msg, 0, 12, PORT, HOST);