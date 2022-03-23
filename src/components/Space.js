import React from "react";
import "../styles/components/space.scss";

//Represents one space on the tic tac toe board.
export default function Space({ id, game, setGame, turn, setTurn }) {
  const onClick = () => {
    if (turn === 1) {
      setTurn(2);
    } else {
      setTurn(1);
    }
    setGame(
      game.map((_, index) => {
        if (index === id) {
          return turn;
        } else {
          return game[index];
        }
      })
    );
  };

  return (
    <div
      onClick={turn && game[id] === null ? onClick : null}
      id={id}
      className={turn && game[id] === null ? "space hover" : "space"}
    >
      {game[id] !== null ? game[id] === 1 ? <div>O</div> : <div>X</div> : ""}
    </div>
  );
}
