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

       socket.on('search', (data) => {
        socket.emit('start', 'start search');
            console.log('SEARCH🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟', data);
           // io.emit('search_cust', data);
           io.sockets.emit('search_server', { ...data, message: 'Search from server with data' });
        });

    socket.on('create_cust', (data) => {
        socket.emit('start', 'start create customer');
            console.log('SEARCH🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟', data);

            io.sockets.emit('create_cust-execute', { ...data, message: 'New Customer created by agent' });
        });

        //io.emit('status', notification);

        socket.on('status-customer', (data) => {
            socket.emit('start', 'start status change');
            console.log('STATUSSSSSSSSSSSSS🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟', data);

            io.sockets.emit('status', { status: data, message: ' Customer Status changed' });
        });
    });



    //return io;
}

// function getIO() {
//     if (!io) {
//         throw new Error("Must initialize socket.io first");
//     }
//     return io;
// }

module.exports = { init, socketio };
