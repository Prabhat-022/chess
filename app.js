const express = require("express");
const socket = require("socket.io");
const http = require("http");
const {Chess} = require("chess.js");
const path = require("path");

const app = express();

//handle the server by socket io
const server = http.createServer(app);
const io =  socket(server);

//handle the view engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


const chess = new Chess();
let player = {};

//handle the current player
let currentPlayer = "W";

//handle the routes
app.get("/", (req, res) => {
  res.render("index", {title: "Chess Game"});
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
