import React from "react";
import "../styles/components/board.scss";
import Space from "./Space";

//Creates the tictactoe board, passing in game state and turn state to each Space.
let createBoard = (game, setGame, turn, setTurn, winner) => {
  let board = [];
  for (let i = 0; i < 9; i++) {
    board.push(
      <Space
        key={i}
        id={i}
        game={game}
        setGame={setGame}
        turn={turn}
        setTurn={setTurn}
        winner={winner}
      />
    );
  }
  return board;
};

//The tic tac toe board.
export default function Board({ game, setGame, turn, setTurn, winner }) {
  return (
    <div id="board">{createBoard(game, setGame, turn, setTurn, winner)}</div>
  );
}
