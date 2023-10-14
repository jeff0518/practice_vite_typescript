import { useState } from "react";
import Square from "./Square";
import style from "./Board.module.css";

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
    Math.round(Math.random() * 1 === 1 ? "X" : "O")
  );
  const [winner, setWinner] = useState(null);

  function setSquareValue(index) {
    const newData = squares.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return val;
    });
    setSquares(newData);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }
  return (
    <div>
      <p>Hey {currentPlayer}, it's your turn</p>
      <div className={style.grid}>
        {Array(9)
          .fill(null)
          .map((_, i) => {
            return (
              <Square
                key={i}
                winner={winner}
                onClick={() => setSquareValue(i)}
                value={squares[i]}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Board;
