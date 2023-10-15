import style from "./Square.module.css";

type Player = "X" | "O" | "BOTH" | null;

interface SquareProps {
  value: Player;
  winner: Player;
  onClick: () => void;
}

function Square(props: SquareProps) {
  const { value, onClick, winner } = props;
  if (!value) {
    return (
      <button
        className={style.square}
        onClick={onClick}
        disabled={Boolean(winner)}
      />
    );
  }
  return (
    <>
      <button className={style[`square_${value.toLocaleLowerCase()}`]} disabled>
        {value}
      </button>
    </>
  );
}

export default Square;
