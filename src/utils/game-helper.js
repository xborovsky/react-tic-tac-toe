import { BOARD_SIZE, GAME_STATE } from './game-config';

export const isGameFisnished = (board, playerId) => {
    let rowCnt = 0,
        colCnt = 0,
        diagCnt1 = 0,
        diagCnt2 = 0,
        totalCnt = 0;

    for (let i=0; i<BOARD_SIZE; i++) {
        for (let j=0; j<BOARD_SIZE; j++) {
            if (board[i][j]) {
                totalCnt++;
            }

            // check rows
            if (board[i][j] === playerId) {
                rowCnt++;
            }

            // check cols
            if (board[j][i] === playerId) {
                colCnt++;
            }
        }

        if (rowCnt === BOARD_SIZE || colCnt === BOARD_SIZE) {
            return GAME_STATE.PLAYER_WON;
        }

        rowCnt = colCnt = 0;

        // check diagonals
        if (board[i][i] === playerId) {
            diagCnt1++;
        }

        if (board[i][BOARD_SIZE-i-1] === playerId) {
            diagCnt2++;
        }
    }

    // check if all fields already filled
    if (totalCnt === BOARD_SIZE * BOARD_SIZE) {
        return GAME_STATE.DRAW;
    }

    return (diagCnt1 === BOARD_SIZE) || (diagCnt2 === BOARD_SIZE) ?
        GAME_STATE.PLAYER_WON : GAME_STATE.UNFINISHED;
};