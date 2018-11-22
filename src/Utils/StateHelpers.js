import * as Constants from './Constants';
import * as Helpers from './Helpers';

export const getStatus = (defaultStatus, tiles, hightestValueTile, lastHightestValueTile) => {
  const doesProgressMoveTileExist = Constants.ProgressMoveTiles.indexOf(hightestValueTile) !== -1;
  const doesAlmostWinningTileExist = Constants.AlmostWinningTile.indexOf(hightestValueTile) !== -1;

  const doesWinningTileExist = tiles.filter(value => value === Constants.WinningTile).length;
  const doesZeroExist = tiles.filter(value => value === 0).length;
  const randomImage = Helpers.getRandomNumber({ min: 0, max: 3 });
  
  if (!doesZeroExist) {
    return {status: Constants.Status.LOST[randomImage], lost: true};
  } else if (doesProgressMoveTileExist && lastHightestValueTile !== hightestValueTile) {
    return {status: Constants.Status.MOVE[randomImage]};
  } else if (doesAlmostWinningTileExist) {
    return {status: Constants.Status.ALMOST_WON[randomImage]};
  } else if (doesWinningTileExist) {
    return {status: Constants.Status.WON[randomImage], won: true};
  }
  return {status: defaultStatus};
}

  
export const getAlteredTiles = (defaultTiles, key) => {
  let state;
  switch (key) {
    case 'ArrowDown':
      state = defaultTiles
        .reduce(Helpers.transpose, [])
        .map(Helpers.reverseRow)
        .map(Helpers.alterRow);
      return Helpers.addRandomField(state)
        .map(Helpers.reverseRow)
        .reduce(Helpers.transpose, [])

    case 'ArrowUp':
      state = defaultTiles
          .reduce(Helpers.transpose, [])
          .map(Helpers.alterRow);
      return Helpers.addRandomField(state)
          .reduce(Helpers.transpose, []);

    case 'ArrowRight':
      state = defaultTiles
          .map(Helpers.reverseRow)
          .map(Helpers.alterRow);
      return Helpers.addRandomField(state)
          .map(Helpers.reverseRow)

    case 'ArrowLeft':
      state = defaultTiles
        .map(Helpers.alterRow);
      return Helpers.addRandomField(state)

    default:
      break;
  }
  return defaultTiles;
}