import net from "net";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const clients = [];
const server = net.createServer((socket) => {
    let username = "";

    socket.write("Enter your username:");

    socket.on("data", (data) => {
        const message = data.toString().trim();

        if (!username) {
            if (clients.includes(message) ) {
                socket.write("Username already taken. Please enter a different username:")
            } else {
                username = message;
                clients.push({ socket, username });
                socket.write(`Welcome, ${username}!\n`);
                broadcast(`${username} has joined the chat.`, socket);
            }
        } else {
            console.log(`${username}: ${message}`);
            broadcast(`${username}: ${message}`, socket);
        }
    });

    socket.on("end", () => {
        clients.splice(clients.indexOf(socket), 1);
        console.log(`${username} left the chat.`);
        broadcast(`${username} has left the chat.`, socket);
    });
});

function broadcast(message, sendersocket) {
    clients.forEach(client => {
        if (client.socket !== sendersocket) {
            client.socket.write(message + "\n");
        }
    });
}

server.listen(5000, () => {
    console.log("Server listening on port 5000");
});

