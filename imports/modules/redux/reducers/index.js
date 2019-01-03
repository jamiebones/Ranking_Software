
import { combineReducers } from 'redux';
import tryReducers from './tryreducers';


export default combineReducers({
    trial : tryReducers,
})