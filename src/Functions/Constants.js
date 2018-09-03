import move0 from './../Images/move0.jpg'
import move1 from './../Images/move1.jpg'
import move2 from './../Images/move2.jpg'
import lost from './../Images/lost.jpg'
import won from './../Images/won.jpg'
import start from './../Images/start.jpg'
import almost from './../Images/almost.jpg'

export const TileProgression = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
export const HighestStartingTile = TileProgression[0];

export const GridSize = 4;
export const WinningTile = TileProgression[10];
export const AlmostWinningTile = TileProgression[9];
export const ProgressMoveTiles = TileProgression.slice(3, 9);


export const Status = {
  START: start,
  WON: won,
  LOST: lost,
  MOVE: [move0, move1, move2],
  ALMOST_WON: almost
};