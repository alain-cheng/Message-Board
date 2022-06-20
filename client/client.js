/*======================================*/
//      Modules and Initials
/*======================================*/

const dgram = require('dgram');
const jsonSocket = require('udp-json');
const read = require('readline').createInterface({ input: process.stdin, output: process.stdout });

const client = dgram.createSocket('udp4');
const json = new jsonSocket(client);
var PORT = 8005;                // defaults
var HOST = '127.0.0.1';         // defaults

client.on('listening', () => {});

var currUser;

/* Receives server responses after the client sends a message */
/*
json.on('message-complete', (msg, rinfo) => {
    console.log('msg', msg);

});
*/

/*======================================*/
//      Process
/*======================================*/

connect();
register();

/*======================================*/
//      Client Functions
/*======================================*/

/* Reads ip address to request a connection to a server */
function connect() {
    read.question('Enter IP Address of message board server\n> (127.0.0.1) ', address => {
        if(address != '') // leave blank keeps default HOST
            HOST = address;
        register();
    });
}

/* Reads the name of the user and sends it to the server */
function register() {
    read.question('Enter preferred username\n> ', name => {
        console.log(`Registering username ${name}`);
        json.send(JSON.stringify({ command: 'register', username: name}), PORT, HOST);
        json.on('message-complete', (msg, rinfo) => {
            msg = JSON.parse(msg);
            //console.log('readName() msg', msg);
            if(msg['command'] == 'ret_code') {
                if(msg['code_no'] == 401) {
                    console.log('Registered Successfully');
                    currUser = name;
                    message();
                } else if(msg['code_no'] == 502) {
                    console.log('User account already exists in chat room!');
                    console.log('Unsucessful registration. Exiting..');
                    exit();
                } else {
                    console.error('Unknown error occured');
                }
            }
        });
    });
}

/* Allows client to start sending messages to the message board */
function message() {
    read.question('Enter message\n> ', msg => {
        json.send(JSON.stringify({ command: 'msg', username: currUser, message: msg}), PORT, HOST);
        if(msg == 'bye') {
            console.log('Disconnecting');
            json.send(JSON.stringify({ command: 'deregister', username: currUser, message: msg}), PORT, HOST);
            json.on('message-complete', (msg, rinfo) => {
                msg = JSON.parse(msg);
                //console.log('readName() msg', msg);
                if(msg['command'] == 'ret_code') {
                    if(msg['code_no'] == 603) {
                        console.log('User' + currUser + ' exiting...');
                    } else {
                        console.error('Unknown error occured');
                    }
                }
            });
            return false;
        } else {
            message();      // keep recursing until user enters 'bye'
        }
    });
}

/* Use when deregistering or exiting program */
function exit() {
    client.close();
}