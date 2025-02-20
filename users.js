import net from "net";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = net.createConnection({ port: 5000 }, () => {
    console.log("Connected to server");
});

client.on("data", (data) => {
    console.log(data.toString().trim());
});

rl.on("line", (message) => {
    client.write(message);
});

client.on("end", () => {
    console.log("Disconnected from server");
});
