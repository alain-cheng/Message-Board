const dgram = require('dgram');
const jsonSocket = require('udp-json');
const PORT = 8005;
const HOST = '127.0.0.1';

const server = dgram.createSocket('udp4');
const json = new jsonSocket(server);

const users = [ 'greg' ];               // stores existing users
var currUser;

server.on('listening', () => {
    console.log('Waiting to receive message...');
    printUsers();
});

/* Receives all messages from the client */
json.on('message-complete', (msg, rinfo) => {
    console.log(rinfo);
    readMsg(msg);      // Used to process messages
});

server.bind(PORT, HOST);

/*======================================*/
//      Server Functions below
/*======================================*/

function readMsg(msg) {
    /* 
    Accepts JSON strings which parses and reads 
    json strings sent by the client.

    This function is also used to determine the type
    of the message.
    */
    console.log('message received', msg);
    let data = JSON.parse(msg);
    console.log('data received', data);
    
    // Routes the message to an appropriate function
    if(data['command'] == 'msg') {  

    } else if(data["command"] ==  "register") {
        registerUser(data);
    } else if(data["command"] == "deregister") {

    }
}

function printUsers() {
    /* Prints all existing users stored in the server */
    console.log("Users in message board:", users);
}

function registerUser(register) {
    /* 
        Function that registers users onto the server,
        sends {"command":"ret_code", "code_no":401}
        upon success.
        
        Should send an error code to the client when 
        username already exists in the server
        {"command":"ret_code", "code_no":502}
    */
    if(users.includes(register.username)) {
        console.log("error: Register unsuccessful");
        return false;
    } else {
        users.push(register.username);
        printUsers();
        return true;
    }    
}