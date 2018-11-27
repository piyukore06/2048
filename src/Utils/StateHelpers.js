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
  let state, localScore = 0;
  switch (key) {
    case 'ArrowDown':
      state = defaultTiles
        .reduce(Helpers.transpose, [])
        .map(Helpers.reverseRow)
        .map(field => {
          const {row, score} = Helpers.alterRow(field);
          localScore += score;
          return row;
        });
      return {tiles: Helpers.addRandomField(state)
        .map(Helpers.reverseRow)
        .reduce(Helpers.transpose, []), score: localScore};

    case 'ArrowUp':
      state = defaultTiles
          .reduce(Helpers.transpose, [])
          .map(field => {
            const {row, score} = Helpers.alterRow(field);
            localScore += score;
            return row;
          });
      return {tiles: Helpers.addRandomField(state)
          .reduce(Helpers.transpose, []), score: localScore};

    case 'ArrowRight':
      state = defaultTiles
          .map(Helpers.reverseRow)
          .map(field => {
            const {row, score} = Helpers.alterRow(field);
            localScore += score;
            return row;
          });
      return {tiles: Helpers.addRandomField(state)
          .map(Helpers.reverseRow), score: localScore};

    case 'ArrowLeft':
      state = defaultTiles
        .map(field => {
          const {row, score} = Helpers.alterRow(field);
          localScore += score;
          return row;
        });
      return {tiles: Helpers.addRandomField(state), score: localScore};

    default:
      break;
  }
  return {tiles: defaultTiles, score: localScore};
}