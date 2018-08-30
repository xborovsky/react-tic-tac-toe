import React, { Component } from 'react';
import Board from './Board';
import WinnerMessage from './WinnerMessage';
import { player1, player2 } from '../constants/players';

import './Game.css';

const pickRandomPlayer = () => {
    return Math.random() >= 0.5 ? player2 : player1;
};

export default class Game extends Component {
    state = {};

    componentDidMount() {
        this.setState({playing : pickRandomPlayer()});
    }

    handlePlayerChange = () => {
        const { playing } = this.state;
        this.setState({
            playing : playing === player1 ? player2 : player1
        });
    };

    handleGameRestart = () => {
        this.setState({playing : pickRandomPlayer(), winner : null, finished : false});
    };

    handleGameFinished = (winner) => {
        this.setState({finished : true, winner : winner});
    };

    render() {
        const { playing, finished, winner } = this.state;

        return(
            finished ?
                <WinnerMessage winnerId={winner} onGameRestart={this.handleGameRestart} /> :
            playing ?
                <div>
                    <div id="player-info">Current player: <strong>Player { playing.id }</strong></div>
                    <Board playingPlayer={playing}
                           onChangePlayer={this.handlePlayerChange}
                           onGameRestart={this.handleGameRestart}
                           onGameFinished={this.handleGameFinished} />
                </div>
                : null
        );
    };
}