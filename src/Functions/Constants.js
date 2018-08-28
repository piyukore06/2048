import move0 from './../Images/move0.jpg'
import move1 from './../Images/move1.jpg'
import move2 from './../Images/move2.jpg'
import lost from './../Images/lost.jpg'
import won from './../Images/won.jpg'
import start from './../Images/start.jpg'
import almost from './../Images/almost.jpg'

export const GridSize = 4;
export const WinningTile = 2048;
export const AlmostWinningTile = 1024;
export const ProgressMoves = [512, 256, 128, 64];
export const Status = {
  START: start,
  WON: won,
  LOST: lost,
  MOVE: [move0, move1, move2],
  ALMOST_WON: almost
};