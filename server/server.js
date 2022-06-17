const dgram = require('dgram');
const jsonSocket = require('udp-json');

const PORT = 8005;
const HOST = '127.0.0.1';

const users = [ "greg", "john" ];

// Stores the username of the currently logged user
var currUser;

// Create UDP socket
const server = dgram.createSocket('udp4');
const json = new jsonSocket(server);

server.on('listening', () => {
    console.log('Waiting to receive message...');
    printUsers();
});


json.on('message-complete', (msg, rinfo) => {
    /* Receives messages from the client */
    //console.log(`${rinfo.address}:${rinfo.port}`, JSON.parse(msg));
    readMsg(msg);
});

server.bind(PORT, HOST);

/*======================================*/
//      Server Functions below
/*======================================*/

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

function readMsg(msg) {
    /* 
    Accepts JSON strings which parses and reads 
    json strings sent by the client.

    This function is also used to determine the type
    of the message.
    */
    let data = JSON.parse(msg);

    console.log(data);
    
    // Routes the message to an appropriate function
    if(data['command'] == 'msg') {  

    } else if(data["command"] ==  "register") {
        registerUser(data);
    } else if(data["command"] == "deregister") {

    }
}