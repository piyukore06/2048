export const TileProgression = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
export const HighestStartingTile = TileProgression[0];

export const GridSize = 4;
export const WinningTile = TileProgression[10];
export const AlmostWinningTile = TileProgression[9];
export const ProgressMoveTiles = TileProgression.slice(3, 9);


export const Status = {
  START: ['Hello there 👋🏼', '👋🏼 🌈', 'Heyy heyy', 'Start playin ✌🏻'],
  WON: ['You made it 🥇', 'You Win 🏆', 'Yuhuu 🎉', 'This calls for Italys finest 🍾'],
  LOST: ['Game Over 🛑', 'Oops 🐒', 'Better luck next time 😵', 'Ohh Shit 💩'],
  MOVE: ['Cool 🤓', 'Awesome 😎', 'Firee 🔥', 'Yaasss 🙌🏻'],
  ALMOST_WON: ['Wow 😍', 'Nice Move 🤩', '👉🏻🤨👈🏻', '🕺💃🏻']
};