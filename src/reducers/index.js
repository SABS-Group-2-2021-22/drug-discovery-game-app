import { combineReducers } from "redux";
import { analysisReducer } from "./analysis_reducer";
import { gameReducer } from "./game_reducer";
import { initReducer } from "./init_reducer";
import { selectorReducer } from "./selector_reducer";
import { assayReducer } from "./assay_reducer";
import { loginReducer } from "./login_reducer"

const appReducer = combineReducers({
  analysis: analysisReducer,
  game: gameReducer,
  init: initReducer,
  selector: selectorReducer,
  assay: assayReducer,
  login: loginReducer,
});

export default appReducer;
