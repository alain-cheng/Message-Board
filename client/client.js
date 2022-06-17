const dgram = require('dgram');
const jsonSocket = require('udp-json');
const client = dgram.createSocket('udp4');
const json = new jsonSocket(client);
// Module that reads from the console
const read = require('readline').createInterface({ input: process.stdin, output: process.stdout });

// defaults
var PORT = 8005;
var HOST = '127.0.0.1';

/*======================================*/
//      Process
/*======================================*/

readAddress();
readName();

/*======================================*/
//      Client Functions below
/*======================================*/

// Reads ip address to request a connection to a server
function readAddress() {
    read.question('Enter IP Address of message board server\n> (127.0.0.1) ', address => {
        if(address != '') // leave blank keeps default HOST
            HOST = address;
        readName();
    });
}

// Reads the name of the user and sends it to the server
function readName() {
    read.question('Enter preferred username\n> ', name => {
        console.log(`Registering username ${name}`);
        clientSend(JSON.stringify({
            command: 'register',
            username: name
        }));
    });
}

/*
    Sends   messages   to    the   server
    This function  accepts  json  objects
    JSON.stringify() when passing objects
*/
function clientSend(req) {
    json.send(req, PORT, HOST, (err, res) => {
        if(err) {
            console.log('error', err);
            return;
        } else {
            console.log('response', res);
        }
    });
}