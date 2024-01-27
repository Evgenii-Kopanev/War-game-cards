import React, { useState } from "react";

export default function ScoreTable(props) {
  const sort = (array) => {
    const newArray = array.sort((a, b) => b.wins - a.wins);
    return newArray;
  };

  sort(props.allPlayers);

  return (
    <div>
      <table
        style={{
          border: `1px solid white`,
          borderRadius: `50px`,
          borderCollapse: `collapse`,
        }}
      >
        <tbody key={1}>
          <tr style={{ border: `1px solid white` }}>
            <td style={{ border: `1px solid white` }}>Player Name</td>
            <td style={{ border: `1px solid white` }}>Wins</td>
            <td style={{ border: `1px solid white` }}>Loses</td>
          </tr>
        </tbody>

        {props.allPlayers.map((player, index) => (
          <tbody key={index}>
            <tr style={{ border: `1px solid white` }}>
              <td style={{ border: `1px solid white` }}>{player.name}</td>
              <td style={{ border: `1px solid white` }}>{player.wins}</td>
              <td style={{ border: `1px solid white` }}>{player.loses}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
