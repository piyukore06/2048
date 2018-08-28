import initialState from './initialState';
import { KEY_PRESS, RESTART } from '../actions/actionTypes';

const tiles = (state = initialState.tiles, action) => {
  switch (action.type) {
    case KEY_PRESS:
      
      return state;
  
    case RESTART:
      return initialState;
    default:
    return state;
  }
}

export default tiles;