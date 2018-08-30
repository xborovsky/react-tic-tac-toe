import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Board.css';

import { player1, player2 } from '../constants/players';
import { isGameFisnished } from '../utils/game-helper';
import { GAME_STATE } from '../utils/game-config';

const resetBoard = () => {
    return [
        Array(3).fill(null),
        Array(3).fill(null),
        Array(3).fill(null)
    ];
};

export default class Board extends Component {
    state = {
        board : resetBoard()
    };

    constructor(props) {
        super(props);
    }

    onFieldClick = (rowIdx, colIdx) => {
        const { playingPlayer, onChangePlayer } = this.props;
        var boardCopy = [...this.state.board];

        if (!boardCopy[rowIdx][colIdx]) {
            boardCopy[rowIdx][colIdx] = playingPlayer.id;

            this.setState(
                {board : boardCopy},
                () => {
                    this.endIfGameFinished();
                    onChangePlayer();
                }
            );
        }
    };

    endIfGameFinished = () => {
        const { board } = this.state,
              { playingPlayer, onGameFinished } = this.props,
              currentGameState = isGameFisnished(board, playingPlayer.id);

        switch (currentGameState) {
            case GAME_STATE.UNFINISHED:
                break;
            case GAME_STATE.PLAYER_WON:
                onGameFinished(playingPlayer.id);
                break;
            case GAME_STATE.DRAW:
                onGameFinished();
                break;
            default:
                throw 'Unknown game state!';
        }
    };

    handleGameRestart = () => {
        this.setState({
            board : resetBoard()
        });
        this.props.onGameRestart();
    };

    render() {
        const { board } = this.state;

        return(
            <div className="board">
                {
                    board.map((row, rowIdx) =>
                        <div className="board-row" key={rowIdx}>
                            {
                                row.map((item, colIdx) =>
                                    <div className="board-item"
                                        key={`${rowIdx}_${colIdx}`}
                                        onClick={() => this.onFieldClick(rowIdx, colIdx)}>
                                            { item === null ? '' : item === player1.id ? player1.char : player2.char }
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        );
    };
}

Board.propTypes = {
    playingPlayer : PropTypes.shape({
        id : PropTypes.number,
        char : PropTypes.char
    }).isRequired,
    onChangePlayer : PropTypes.func.isRequired,
    onGameRestart : PropTypes.func.isRequired,
    onGameFinished : PropTypes.func.isRequired
};