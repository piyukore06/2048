import {combineReducers} from 'redux';
import tiles from './tilesReducer';

const rootReducer = combineReducers({
  tiles
});

export default rootReducer;