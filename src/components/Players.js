import React from "react";
import "../styles/components/players.scss";

//Displays the players and highlights the player who's turn is active
export default function Players({ turn }) {
  return (
    <div className="players" aria-live="polite">
      <div role="marquee" className={turn === 1 ? `player active` : `player`}>
        Player One: O
      </div>
      <div role="marquee" className={turn === 2 ? `player active` : `player`}>
        Player Two: X
      </div>
    </div>
  );
}
