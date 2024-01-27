import React, { useState } from "react";
import "../styles/views/Login.css";
import ScoreTable from "../components/ScoreTable";

export default function Login(props) {
  const [name, setName] = useState("");
  const [showboard, setShowBoard] = useState(true);
  console.log(props.allPlayers);

  const isNewPlayer = (name) => {
    let result = props.allPlayers.find((player) => player.name === name);
    console.log(result);
    if (typeof result === "object") {
      props.onGameStart(result, false); //the player already exist
    } else {
      props.onGameStart(name, true); //new player
    }
  };

  return (
    <div className="Login">
      <h2>Card Game</h2>
      <input
        value={name}
        type="text"
        onInput={(event) => {
          const value = event.target.value;
          setName(value);
        }}
      />
      <button onClick={(e) => isNewPlayer(name)}>Start Game</button>
      <button onClick={(e) => setShowBoard((prevState) => !prevState)}>
        Score Table
      </button>
      {showboard ? <ScoreTable allPlayers={props.allPlayers} /> : <></>}
    </div>
  );
}
