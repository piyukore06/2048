import * as Constants from './Constants';

// chage row on key press
// defined basically for Keypress ArrowLeft
// Same Logic is used for other Keypress Events changing the array order in appropriate manner 
export const alterRow = (row) => {
  let saveRepeatingIndex = [];
  row.forEach((fieldColumn, columnIndex) => {
    if (columnIndex < Constants.GridSize - 1 && fieldColumn === row[columnIndex + 1]) {
      saveRepeatingIndex.push(columnIndex)
    }
  });
  if (saveRepeatingIndex.length === Constants.GridSize - 1) {
    saveRepeatingIndex = saveRepeatingIndex.filter((repeatingIndex, index) => index % 2 === 0);
  }
  saveRepeatingIndex.forEach(_ => {
    for (let index = 0; index <= row.length; index++) {
      if (index < Constants.GridSize - 1 && row[index] === row[index + 1]) {
        row[index] = row[index] * 2;
        row = [...row.slice(0, index + 1), ...row.slice(index + 2)];
        break;
      }
    }
  });
  row = row.filter(field => field !== 0);
  return [...row, ...Array(Constants.GridSize - row.length).fill(0)];
}

// Random Field is added taking into consideration the default AlterRow Keypress ArrowLeft
// This is to be called immidieately after alterRow to have field creation at correct place
export const addRandomField = (state) => {
  const randomNumber = getRandomNumber({min: 1, max: 2});
  const getLastElements = state.reduce((accumulator, row, index) => {
    return row[Constants.GridSize - 1] === 0 ? [...accumulator, index] : accumulator;
  }, []);
  if (getLastElements.length) {
    const randomRowIndex = getRandomNumber({min: 0, max: getLastElements.length - 1});
    state[getLastElements[randomRowIndex]][Constants.GridSize - 1] = randomNumber;
  }
  return state;
}

export const getRandomNumber = ({ min, max } = { min: 0, max: 2 }) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const getRandomRow = () => {
  return Array(Constants.GridSize).fill(null).map(_ => getRandomNumber());
}

// 2d Matrix transpose method
export const transpose = (prev, next) => next.map((item, i) => (prev[i] || []).concat(next[i]));

export const reverseRow = row => row.reverse();

export const getSwipeDirection = (touches, xDown, yDown) => {
  const xUp = touches.clientX;                                    
  const yUp = touches.clientY;

  const xDiff = xDown - xUp;
  const yDiff = yDown - yUp;

  if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
      if ( xDiff > 0 ) {
        return 'ArrowLeft';
          /* left swipe */ 
      } else {
        return 'ArrowRight';
          /* right swipe */
      }                       
  } else {
      if ( yDiff > 0 ) {
        return 'ArrowUp';
          /* up swipe */ 
      } else { 
        return 'ArrowDown';
          /* down swipe */
      }                                                                 
  }
}