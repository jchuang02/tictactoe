import React, { useEffect, useState } from "react";
import "../styles/components/space.scss";

//Represents one space on the tic tac toe board.
export default function Space({ id, game, setGame, turn, setTurn, winner }) {
  let [hover, setHover] = useState(false);

  useEffect(() => {
    if (winner !== null) {
      setHover(false);
    }
  }, [winner]);

  const onClick = () => {
    if (winner === null) {
      if (turn === 1) {
        setTurn(2);
      } else {
        setTurn(1);
      }
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

  const onHoverIn = () => {
    setHover(true);
  };

  const onhoverOut = () => {
    setHover(false);
  };

  return (
    <div
      onClick={winner === null && turn && game[id] === null ? onClick : null}
      onMouseOver={
        winner === null && turn && game[id] === null ? onHoverIn : null
      }
      onMouseOut={
        winner === null && turn && game[id] === null ? onhoverOut : null
      }
      id={id}
      className={
        winner === null && turn && game[id] === null ? "space hover" : "space"
      }
    >
      {game[id] !== null ? game[id] === 1 ? <div>O</div> : <div>X</div> : ""}
      {game[id] === null && hover ? (
        turn === 1 ? (
          <div className="preview">O</div>
        ) : (
          <div className="preview">X</div>
        )
      ) : (
        ""
      )}
    </div>
  );
}
