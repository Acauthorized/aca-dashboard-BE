const { Server } = require('socket.io');

require('dotenv').config();

//let io;
let socketio = { url: null }


function init(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: '*',
            
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true,
            transports: ['polling', 'websocket'],
            // 	allowEIO3: true
        },
    });

    io.on('connection', (socket) => {
        console.log(`New connection: ${socket.id}`);

        socket.emit('start', 'start');

       io.on('search', (data) => {
            console.log('SEARCH🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟', data);
            socket.emit('search_cust', data);
            socket.emit('search_server', { ...data, message: 'Search from server with data' });
        });

        io.on('create_cust', (data) => {
            console.log('SEARCH🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟', data);

            socket.emit('create_cust-execute', { ...data, message: 'New Customer created by agent' });
        });

        //io.emit('status', notification);

        io.on('status-customer', (data) => {
            console.log('STATUSSSSSSSSSSSSS🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟', data);

            socket.emit('status', { status: data, message: ' Customer Status changed' });
        });
    });

    return io;
}

// function getIO() {
//     if (!io) {
//         throw new Error("Must initialize socket.io first");
//     }
//     return io;
// }

module.exports = { init, socketio };
