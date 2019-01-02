import React, { Component } from 'react';
import './App.css';

function getLocalPlayers() {
  return localStorage.getItem('players') && JSON.parse(localStorage.getItem('players'));
}

class App extends Component {

  state = {
    players: getLocalPlayers() || [],
    categories: [
      'army',
      'coins',
      'wonders',
      'blueCards',
      'yellowCards',
      'purpleCards',
      'greenCards'
    ]
  }

  isNumeric = (input) => {
    const RE = /^-{0,1}\d*\.{0,1}\d+$/;
    return (RE.test(input));
}

  total = (e) => {
    // remove any non numeric characters
    e.target.value = e.target.value.replace(/[^\d]+/g,'');
    
    const column = document.getElementsByName(e.target.name);
    let total = 0;
    
    column.forEach(e => {
      if (e.value) {
        total += parseInt(e.value);
      }
    });
    
    const totalElement = document.getElementById(`${e.target.name}Score`);
    totalElement.innerHTML = total;
  }

  savePlayers = () => {
    const playerNames = document.getElementsByName('playerName');
    const players = [];

    playerNames.forEach(playerName => {
      if (playerName.value) {
        players.push(playerName.value);
      }
    });
    localStorage.setItem('players', JSON.stringify(players));

    this.setState({
      players
    });
  }

  resetScore = () => {
    const inputs = document.querySelectorAll('table input[type="number"]');
    inputs.forEach(input => input.value = "");

    const playersScores = document.querySelectorAll('.playerScore');
    playersScores.forEach(e => e.innerHTML = "");
  }

  resetPlayers = () => {
    localStorage.removeItem('players');
  
    this.setState({
      players: []
    })
  }

  render() {
    if (!this.state.players.length) {
      return (
        <div className="playersNames">
          <input name="playerName" placeholder="Name" />
          <input name="playerName" placeholder="Name" />
          <input name="playerName" placeholder="Name" />
          <input name="playerName" placeholder="Name" />
          <input name="playerName" placeholder="Name" />
          <input name="playerName" placeholder="Name" />
          <input name="playerName" placeholder="Name" />

          <button onClick={() => this.savePlayers()}> Save </button>
        </div>
      )
    }

    return (
      <div className="App">
        <table border="1" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <td className="playerImage"></td>
              { this.state.players.map(player => <td key={player}>{player}</td>) }
            </tr>
            {
              this.state.categories.map((category) => (
                <tr key={category}>
                  <td className={`${category}Image firstColumn`}></td>
                  { 
                    this.state.players.map((player) => 
                      <td key={player}>
                        <input 
                          type="number" 
                          name={`${player}`} 
                          pattern="-?[0-9]*"
                          step="1"
                          onChange={this.total} />
                      </td>
                    )
                  }
                </tr>
              ))
            }
            <tr>
            <td className="totalPoints"></td>
              { this.state.players.map(player => <td key={player} id={`${player}Score`} className="playerScore"></td>) }
            </tr>
          </tbody>
        </table>
        <button onClick={() => this.resetScore()} className="resetButton">Reset Score</button>
        <button onClick={() => this.resetPlayers()} className="resetButton">Reset Players</button>
      </div>
    );
  }
}

export default App;
