import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialEmployees = {
  data: []
};

const tableReducer = (state = initialEmployees, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  table: tableReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
