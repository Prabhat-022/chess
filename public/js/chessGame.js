const socket = io();
const chess = new chess();
const boardElement = document.querySelector(".chessboard")

let dreggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";

    board.forEach((row, rowindex) => {

        row.forEach((square, squareindex) => {

            const squareElement = document.createElement("div")

            squareElement.classList.add("square", (rowindex + squareindex) % 2 === 0 ? "light" : "dark")
            
            squareElement.dataset.row = rowindex;
            squareElement.dataset.col = squareindex;

            if (square) {
                const pieceElement = document.createElement("div")
                pieceElement.classList.add("piece", square.color === 'w' ? "white" : "black");

                pieceElement.innerHTML = getPieceUnicode(square);
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        dreggedPiece = pieceElement;
                        sourceSquare = { row: rowindex, col: squareindex }

                        e.dataTransfer.setData("text/plain", "")
                    }
                })

                pieceElement.addEventListener("dragend", (e) => {
                    dreggedPiece = null;
                    sourceSquare = null;
                })
                squareElement.appendChild(pieceElement)

            }
            squareElement.addEventListener("dragover", (e)=>{
                e.preventDefault();
            })

            squareElement.addEventListener("drop", (e)=>{
                e.preventDefault();

                if(dreggedPiece){
                    const targetSource ={
                        row:parseInt(squareElement.dataset.row),
                        col:parseInt(squareElement.dataset.col)
                    }

                    handleMove(sourceSquare, targetSource);
                }


            })

            boardElement.appendChild(squareElement)
        })

    });

}

const handleMove = () => {

}

const getPieceUnicode = () => {
    const unicodePieces = {
        p:"♙",
        n:"♘",
        b:"♗",
        r:"♖",
        q:"♕",
        k:"♔",
        P:"♟",
        N:"♞",
        B:"♝",
        R:"♜",
        Q:"♛",
        K:"♚"
    }

    return unicodePieces[piece.type] || "";
}
renderBoard();