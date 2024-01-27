import { useEffect, useState } from "react";
import "./App.css";
import Login from "./views/Login";
import GameBoard from "./views/GameBoard";
import EndingScreen from "./views/EndingScreen";
import ScoreTable from "./components/ScoreTable";

const pages = {
  login: 0,
  gameBoard: 1,
  endingScreen: 2,
};

const initialPlayerState = {
  id: 3,
  name: "",
  deck: [],
  wins: 0,
  loses: 0,
  totalGame: 0,
  isLastGameWin: false,
};

function App() {
  const [currentPage, setCurrentPage] = useState(pages.login);
  const [player, setPlayer] = useState(initialPlayerState);
  const [allPlayers, setAllPlayers] = useState([]);

  //פונקציה שמקבלת מערך אובייקטים ואובייקט ומחזירה את המערך
  // אובייקטים והאובייקט וערך בוליאני האם הוא קיים או לא
  const playerExistanceCheck = (allPlayers, playerName) => {
    const result = allPlayers.find((player) => player.name === playerName);
    if (typeof result === "object") {
      const index = allPlayers.findIndex(
        (player) => player.name === playerName
      );
      return {
        array: allPlayers,
        player: result,
        index: index,
        isExist: true,
      };
    } else {
      return {
        array: allPlayers,
        player: playerName,
        index: index,
        isExist: false,
      };
    }
  };

  function getPage() {
    if (currentPage === pages.login) {
      return (
        <Login
          onGameStart={onGameStart}
          allPlayers={allPlayers}
          playerExistanceCheck={playerExistanceCheck}
        ></Login>
      );
    } else if (currentPage === pages.gameBoard) {
      return (
        <GameBoard
          onGameEnd={onGameEnd}
          onPlayerDeckSet={onPlayerDeckSet}
          player={player}
        ></GameBoard>
      );
    } else if (currentPage === pages.endingScreen) {
      return (
        <EndingScreen
          onGameStart={onGameStart}
          player={player}
          setCurrentPage={setCurrentPage}
          pages={pages}
          setAllPlayers={setAllPlayers}
          allPlayers={allPlayers}
          playerExistanceCheck={playerExistanceCheck}
        ></EndingScreen>
      );
    }
  }

  function onPlayerDeckSet(deck) {
    setPlayer((prevState) => ({ ...prevState, deck: deck }));
  }

  function onGameStart(name, isNewPlayer) {
    if (isNewPlayer) {
      setPlayer((prevState) => ({
        ...prevState,
        name: name,
        wins: 0,
        loses: 0,
      }));
    } else {
      setPlayer((prevState) => ({
        ...prevState,
        name: name.name,
        wins: name.wins,
        loses: name.loses,
      }));
    }
    setCurrentPage(pages.gameBoard);
  }

  function onGameEnd(isPlayerWin) {
    setPlayer((prevState) => ({
      ...prevState,
      isPlayerWin: isPlayerWin,
      wins: isPlayerWin ? prevState.wins + 1 : prevState.wins,
      loses: !isPlayerWin ? prevState.loses + 1 : prevState.loses,
    }));
    setCurrentPage(pages.endingScreen);
  }

  return <>{getPage()}</>;
}

export default App;
