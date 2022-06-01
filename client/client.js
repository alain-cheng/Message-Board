const dgram = require('dgram');
const jsonSocket = require('udp-json');
const read = require('readline').createInterface({ // module to read from console
    input: process.stdin,
    output: process.stdout
});

var PORT = 8005; // default
var HOST = '127.0.0.1'; // default

// Create UDP socket
const client = dgram.createSocket('udp4');
const json = new jsonSocket(client);

// send a json message
json.send({message: 'Hello World'}, PORT, HOST, (err) => {
    if(err) {
        console.log('error', err);
        return;
    }
    console.log('Message sent successfully');
    readName();
    client.close();
});

function readName() {
    read.question('Enter preferred username\n> ', name => {
        console.log(`Hello ${name}!`);
        read.close();
    });
}