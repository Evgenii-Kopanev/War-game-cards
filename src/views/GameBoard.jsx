import React, { useEffect, useState } from "react";
import "../styles/views/GameBoard.css";
import getSeperateDecks from "../deckCreator";

const initialGameState = {
  computerWins: 0,
  playerWins: 0,
  currentPlayerCard: 0,
  currentComputerCard: 0,
};

export default function GameBoard(props) {
  const [computerDeck, setComputerDeck] = useState([]);
  const [game, setGame] = useState(initialGameState);
  const [round, setRound] = useState(0);

  console.log(props.player);

  useEffect(() => {
    const [firstDeck, secondDeck] = getSeperateDecks();

    setComputerDeck([...firstDeck]);
    props.onPlayerDeckSet(secondDeck);
  }, []);

  function doTurn() {
    if (props.player.deck.length === 0 && computerDeck.length === 0) {
      const isPlayerWin = game.playerWins > game.computerWins;
      props.onGameEnd(isPlayerWin);
      return;
    }

    // לשלוף את הקלף הראשון בכל מערך
    const playerCard = props.player.deck[0];
    const computerCard = computerDeck[0];

    // להכניס ערך של הקלפים לתוך הסטייט
    // לחשב מי ניצח את הסיבוב
    // לעלות את הנצחונות בסיבוב לפי המנצח
    setGame((prevState) => ({
      ...prevState,
      currentPlayerCard: playerCard.value,
      currentComputerCard: computerCard.value,
      playerWins:
        playerCard.value > computerCard.value
          ? prevState.playerWins + 1
          : prevState.playerWins,
      computerWins:
        computerCard.value > playerCard.value
          ? prevState.computerWins + 1
          : prevState.computerWins,
    }));

    setRound((prevState) => prevState + 1);

    // למחוק את הקלף מהמערך של כל שחקן
    setComputerDeck((prevState) => {
      const copyState = [...prevState];
      copyState.shift();
      return copyState;
    });
    const playerDeckCopy = [...props.player.deck];
    playerDeckCopy.shift();
    props.onPlayerDeckSet(playerDeckCopy);
  }

  return (
    <div className="GameBoard">
      <h4>Computer</h4>
      <div>{game.computerWins}</div>
      <div className="card">{game.currentComputerCard}</div>
      <div className="card">{game.currentPlayerCard}</div>
      <h4>{props.player.name}</h4>
      <div>{game.playerWins}</div>
      <h3>{`The round is: ` + round}</h3>
      <h3>{`Score is: ${props.player.wins} - ${props.player.loses}`}</h3>
      <button onClick={doTurn}>Next</button>
    </div>
  );
}
