import { combineReducers } from "redux";
import { analysisReducer } from "./analysis_reducer";
import { gameReducer } from "./game_reducer";
import { initReducer } from "./init_reducer";
import { selectorReducer } from "./selector_reducer";
import { assayReducer } from "./assay_reducer";
import { loginReducer } from "./login_reducer";
import { sketcherReducer } from "./sketcher_reducer";

//Combines all reducers of the app into appReducer
const appReducer = combineReducers({
  analysis: analysisReducer,
  game: gameReducer,
  init: initReducer,
  selector: selectorReducer,
  assay: assayReducer,
  login: loginReducer,
  sketcher: sketcherReducer,
});

/**
 * Function resets the app states and the redux store
 * @param {state} state The state of application
 * @param {action} action The action that resets the game
 * @returns {reducer} A reset appReducer and thus store
 */
const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
