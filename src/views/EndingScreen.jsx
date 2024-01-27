import React, { useEffect } from "react";

export default function EndingScreen(props) {
  console.log(props.allPlayers);
  console.log(props.player);

  const addPlayer = (playerName) => {
    props.setCurrentPage(props.pages.login);

    let currentPlayer = props.allPlayers.find(
      (player) => player.name === playerName.name
    );
    console.log(currentPlayer);
    let currentIndex = props.allPlayers.findIndex(
      (player) => player.name === playerName.name
    );
    console.log(currentIndex);
    if (typeof currentPlayer === "object") {
      props.allPlayers.splice(currentIndex, 1);
      props.allPlayers.push(playerName);
      props.setAllPlayers(() => props.allPlayers);
    } else {
      props.allPlayers.push(playerName); //case of new player
      props.setAllPlayers(() => props.allPlayers); //case of new player
    }
  };

  return (
    <div className="EndingScreen">
      <button onClick={() => addPlayer(props.player)}>Exit</button>
      <h1>{props.player.isPlayerWin ? "Win" : "Lose"}</h1>
      <div>
        {props.player.wins} - {props.player.loses}
      </div>
      <button
        onClick={() => {
          props.onGameStart(props.player, false);
        }}
      >
        Play Again
      </button>
    </div>
  );
}
