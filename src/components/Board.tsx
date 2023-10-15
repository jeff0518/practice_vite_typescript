import { useEffect, useState } from "react";
import Square from "./Square";
import style from "./Board.module.css";
type Player = "X" | "O" | "BOTH" | null;
type BoardState = Player[];

function calculateWinnerHandler(boardState: BoardState) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return boardState[a];
    }
  }
  return null;
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
    Math.round(Math.random()) === 1 ? "X" : "O"
  );
  const [winner, setWinner] = useState<Player>(null);

  function setSquareValue(index: number) {
    const newData = squares.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return val;
    });
    setSquares(newData);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  function resetHandler() {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random()) === 1 ? "X" : "O");
  }
  useEffect(() => {
    const win = calculateWinnerHandler(squares);
    if (win) {
      setWinner(win);
    }

    //當沒有空格時還未出現贏家，跳出平手！！！
  }, [squares]);
  // useEffect(() => {
  //   const win: string | null = calculateWinnerHandler(squares);
  //   if (win) {
  //     setWinner(win);
  //   }

  //   if (!win || !squares.filter((square) => !square).length) {
  //     setWinner("BOTH");
  //   }
  // }, [squares]);
  return (
    <div className={style.container}>
      {!winner && <p>Hey {currentPlayer}, it's your turn</p>}
      {winner && winner !== "BOTH" && <p>Congratulations {winner}</p>}
      {winner && winner === "BOTH" && (
        <p>Congratulations you're both winners</p>
      )}
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
      <button className={style.reset} onClick={resetHandler}>
        Reset
      </button>
    </div>
  );
}

export default Board;
