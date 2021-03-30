import { createStore, applyMiddleware, combineReducers } from "redux"
import reduxThunk from "redux-thunk"
import authReducer from "./reducers/authReducer"
import projectReducer from "./reducers/projectReducer"
import logger from "redux-logger"


const middleware = applyMiddleware( reduxThunk, logger )


const store = createStore(combineReducers({
    authReducer,
    projectReducer,
}),middleware);

store.subscribe(() => {

});

export default store

