import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { ADD_CAMPERS, REMOVE_CAMPERS, 
    CHANGE_FILTER, BY_LAST_30_DAYS} from './Actions';

const campers = (state = [], action) => {
    switch(action.type) {
        case ADD_CAMPERS:
            return action.campers;
        case REMOVE_CAMPERS: 
            return [];
        default:
            return state;
    }
}

const campersSort = (state = BY_LAST_30_DAYS, action) => {
    switch(action.type) {
        case CHANGE_FILTER:
            return action.filter;
        default: 
            return state;
    }
}

const LeaderBoardApp = combineReducers({
    campers,
    campersSort,
})

const loggerMiddleware = createLogger(); 

export const configureStore = () => createStore(LeaderBoardApp,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
);