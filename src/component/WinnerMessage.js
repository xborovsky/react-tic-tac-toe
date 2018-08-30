import React from 'react';
import PropTypes from 'prop-types';

const WinnerMessage = ({winnerId, onGameRestart}) =>
    <div>
        <h1>{winnerId ? `Player ${winnerId} won!` : 'It\'s a draw!'}</h1>
        <button onClick={() => onGameRestart()}>Restart</button>
    </div>
;

WinnerMessage.propTypes = {
    winnerId : PropTypes.number,
    onGameRestart : PropTypes.func.isRequired
};

export default WinnerMessage;