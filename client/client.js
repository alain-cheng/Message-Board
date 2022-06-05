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

// Objects
var User = function(username) {
                this.username = username;
            }

readAddress();
readName();

// Reads ip address to request a connection to a server
function readAddress() {
    read.question('Enter IP Address of message board server\n> (127.0.0.1) ', address => {
        if(address != "") // leave blank keeps default HOST
            HOST = address;
        readName();
    });
}

// Reads the name of the user and sends it to the server
function readName() {
    read.question('Enter preferred username\n> ', name => {
        console.log(`Registering username ${name}`);
        var registeredUser = new User(name);
        clientSend(JSON.stringify(registeredUser));
        //read.close();
    });
}

/*
    Sends   messages   to    the   server
    This function  accepts  json  objects
    JSON.stringify() when passing objects
*/
function clientSend(req) {
    json.send(req, PORT, HOST, (err) => {
        if(err) {
            console.log('error', err);
            return;
        }
        //console.log('Message sent successfully');
        client.close();
    });
}