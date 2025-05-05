const WebSocket = require('ws');

// Create a WebSocket server on the specified IP and port
const wss = new WebSocket.Server({ host: '192.168.1.7', port: 3000 });

console.log('WebSocket server is running on ws://192.168.1.7:3000');

wss.on('connection', (ws) => {
    console.log('A new client connected.');

    // Send a welcome message to the client
    ws.send('Welcome to the WebSocket server!');

    // Listen for messages from the client
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);

        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Broadcast: ${message}`);
            }
        });
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('A client disconnected.');
    });
});