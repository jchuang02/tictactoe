import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import Players from "./components/Players";
import "./styles/app.scss";

export default function App() {
  let [game, setGame] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  let [turn, setTurn] = useState(null);
  let [winner, setWinner] = useState(null);

  let onStart = () => {
    setTurn(1);
  };

  let onReset = () => {
    setGame([null, null, null, null, null, null, null, null, null]);
    setWinner(null);
    setTurn(1);
  };

  //Determines if there is a winner
  useEffect(() => {
    if (
      (game[3] === game[4] && game[4] === game[5]) ||
      (game[0] === game[4] && game[4] === game[8]) ||
      (game[2] === game[4] && game[4] === game[6])
    ) {
      setWinner(game[4]);
    } else if (game[3] && game[0] === game[3] && game[3] === game[6]) {
      setWinner(game[3]);
    } else if (game[4] && game[1] === game[4] && game[4] === game[7]) {
      setWinner(game[4]);
    } else if (game[5] && game[2] === game[5] && game[5] === game[8]) {
      setWinner(game[5]);
    } else if (game[7] && game[6] === game[7] && game[7] === game[8]) {
      setWinner(game[7]);
    } else if (game[1] && game[0] === game[1] && game[1] === game[2]) {
      setWinner(game[1]);
    } else if (
      game.every((space) => {
        return space !== null;
      })
    ) {
      setWinner(undefined);
    }
  }, [game]);

  //Announces the winner
  useEffect(() => {
    if (winner) {
      alert("Player " + winner + " is the winner!");
    } else if (winner === undefined) {
      alert("It's a draw");
    }
  }, [winner]);

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <Board game={game} setGame={setGame} turn={turn} setTurn={setTurn} />
      <Players turn={turn} />
      <button onClick={onStart} disabled={turn !== null}>
        Start
      </button>
      <button onClick={onReset} disabled={turn === null}>
        Play Again
      </button>
    </div>
  );
}
