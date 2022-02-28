import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import r_groups from './reducers'
import { devToolsEnhancer } from 'redux-devtools-extension'

// import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Home,
  AppRedux,
  AssayRedux,
  Analysis,
  Results,
  Footer,
  SketcherAppRedux,
} from "./components";


const store = createStore(r_groups, compose(applyMiddleware(thunk), devToolsEnhancer()))

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      money: undefined,
      time: undefined,
      };
      this.updateTimeAndMoney();
}
  updateTimeAndMoney = () => {
    const base_url = 'http://127.0.0.1:5000/update_time_money'
    // const base_url = 'http://drug-discovery-game-backend.herokuapp.com/update_time_money'
    fetch(base_url)
      .then((response) => response.json())
      .then(time_and_money => {
        this.setState({ money: time_and_money[0] })
        this.setState({ time: time_and_money[1] })
      })
      .catch(err => {
        throw Error(err.message);
      });
  }

  render() {
    return (
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<AppRedux />} />
          <Route path="/assay" element={<AssayRedux updateTimeAndMoneyCallback={this.updateTimeAndMoney}/>} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/results" element={<Results />} />
          <Route path="/sketcher" element={<SketcherAppRedux />} />
        </Routes>
        <Footer time={this.state.time} money={this.state.money}/>
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
