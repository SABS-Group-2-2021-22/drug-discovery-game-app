import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import r_groups from './reducers'
import Body from './body'
import rootReducer from './reducers'
import { devToolsEnhancer } from 'redux-devtools-extension'

// import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Home,
  Builder,
  Assay,
  Analysis,
  Results,
  Footer,
  LoginPage,
  SketcherAppRedux,
  SketcherAssayRedux,
  SketcherAnalysisRedux,
  SketcherResultsRedux,
} from "./components/body";

const store = createStore(rootReducer, compose(applyMiddleware(thunk), devToolsEnhancer()))

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      money: undefined,
      time: undefined,
      };
}


  render() {
    return (
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/build" element={(this.props.gamemode === 'builder') ? <Builder />: <SketcherAppRedux/>} />
            <Route path="/assay" element={(this.props.gamemode === 'builder') ?< Assay updateTimeAndMoneyCallback={this.updateTimeAndMoney}/>: <SketcherAssayRedux/>}  />
            <Route path="/analysis" element={(this.props.gamemode === 'builder') ?< Analysis/>: <SketcherAnalysisRedux/>}  />
            <Route path="/results" element={(this.props.gamemode === 'builder') ?< Results/>: <SketcherResultsRedux/>} />
        
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer/>
      </Router>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>,


  document.getElementById("root")
);

// serviceWorker.unregister();
