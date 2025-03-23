const express = require("express");
const socket = require("socket.io");
const http = require("http");
const {Chess} = require("chess.js");
const path = require("path");
const { log } = require("console");

const app = express();

//handle the server by socket io
const server = http.createServer(app);
const io =  socket(server);

//handle the view engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


const chess = new Chess();
let players = {};

//handle the current player
let currentPlayer = "w";

//handle the routes
app.get("/", (req, res) => {
  res.render("index", {title: "Chess Game"});
});

io.on("connection", (uniquesocket) => {
    console.log("a user connected");

    if(!players.white) {
        players.white = uniquesocket.id;
        uniquesocket.emit("playerRole", "w")
    }

    else if(!players.black){
        players.black = uniquesocket.id;
        uniquesocket.emit("PlayerRole", "b");
    }else{
        uniquesocket.emit("spectatorRole");
    }

    //disconnect the socket 
    uniquesocket.on("disconnect", ()=>{
        if(uniquesocket.id === players.white){
            delete players.white;
        }
        else if(uniquesocket.id === players.black){
            delete players.black
        }
    })

    //move 
    uniquesocket.on("move", (move)=>{
        try{
            if(chess.turn() === "w" && uniquesocket.id !== players.white) return;
            if(chess.turn() === "b" && uniquesocket.id !== players.black) return;

            const result = chess.move(move); 
            
            if(result){
                currentPlayer = chess.turn();
                io.emit("move", move);

                //forsyth-Edwards Notation(FRN)
                io.emit("boardState", chess.fen());
            }
            else{
                console.log("Invalid move :", move);
                uniquesocket.emit(move)
            }
        }
        catch(error){
            console.log("move error:", error);
        }
    })
 
})

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
