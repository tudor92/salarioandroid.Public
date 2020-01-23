import { combineReducers } from 'redux';
import items from './firebaseAPI';
import itemsF from './filterJob';
import addS from './addSalary';
import sortReducer from './sortReducer';
import recommendedItems from './findRecommendations';

const rootReducer = combineReducers({
    items,
    itemsF,
    addS,
    sortReducer,
    recommendedItems
});

export default rootReducer;