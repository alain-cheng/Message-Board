/*======================================*/
//      Modules and Initials
/*======================================*/

const dgram = require('dgram');
const jsonSocket = require('udp-json');
const PORT = 8005;
const HOST = '127.0.0.1';

const server = dgram.createSocket('udp4');
const json = new jsonSocket(server);

const users = [ 'greg' ];               // stores message board users
var currUser;

server.on('listening', () => {
    console.log(`Server now listening on ${HOST}:${PORT}`);
    console.log('Waiting to receive message...');
    printUsers();
});

/* Receives all incoming messages from the client */
json.on('message-complete', (msg, rinfo) => {
    //console.log(`Message received from ${rinfo.address}:${rinfo.port}`);
    //console.log(msg);

    let data = JSON.parse(msg);

    /* Used to process messages and server responds back with a response message to the client */
    if(data['command'] == 'msg') {  
        console.log(`from ${data['username']} :`, data['message']);
    } else if(data['command'] ==  'register') {
        if(registerUser(data)) {
            json.send(JSON.stringify({ command: 'ret_code', code_no: 401}), rinfo.port, rinfo.address);
        } else {
            json.send(JSON.stringify({ command: 'ret_code', code_no: 502}), rinfo.port, rinfo.address);
        }
    } else if(data['command'] == 'deregister') {

    } else {   // unknown command
        json.send(JSON.stringify({ command: 'ret_code', code_no: 301}), rinfo.port, rinfo.address);
    }
});

server.bind(PORT, HOST);

/*======================================*/
//      Server Functions
/*======================================*/

function printUsers() {
    /* Prints all existing users stored in the server */
    console.log("Users in message board:", users);
}

function registerUser(register) {
    /* 
        Function that registers users onto the server,
        returns true upon success and false otherwise.
    */
    if(users.includes(register.username)) {
        return false;
    } else {
        users.push(register.username);
        currUser = register.username;
        printUsers();
        return true;
    }    
}