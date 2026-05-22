const express = require("express");

const http = require("http");

const { ExpressPeerServer } = require("peer");



const app = express();

const server = http.createServer(app);



// ✅ CREATE PEER SERVER
const peerServer = ExpressPeerServer(server, {

    debug: true,

    path: "/"
});



// ✅ USE PEER ROUTE
app.use("/peerjs", peerServer);



// ✅ TEST ROUTE
app.get("/", (req, res) => {

    res.send("PeerJS Server Running");
});



// ✅ START SERVER
server.listen(9000, () => {

    console.log(
        "PeerJS Server running on port 9000"
    );
});