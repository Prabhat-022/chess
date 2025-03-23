# CHESS GAME 

This is a chess game built with socket.io and chess.js. The game is not perfect and there are many things that can be improved. However, the game is fully functional and can be played with a friend. The game is built with express.js and uses ejs as the templating engine.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the dependencies.

```bash
npm install 
```

## Usage

```python
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

//handle the chess
const chess = new Chess();

//handle the routes
app.get("/", (req, res) => {
  res.render("index");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change. The game is written in 
javascript and uses the chess.js library to handle the chess logic. The 
game uses express.js as the web server and socket.io to handle the 
communication between the clients. The game is built with ejs as the 
templating engine.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)