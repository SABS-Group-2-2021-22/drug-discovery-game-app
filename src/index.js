import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
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
  LoginPage
} from "./components/body";

const store = createStore(rootReducer, compose(applyMiddleware(thunk), devToolsEnhancer()))

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      money: undefined,
      time: undefined,
      };
      // this.updateTimeAndMoney();
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
          <Route path="/builder" element={<Builder />} />
          {/* <Route path="/assay" element={<Assay updateTimeAndMoneyCallback={this.updateTimeAndMoney}/>} /> */}
          <Route path="/assay" element={<Assay/>} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/results" element={<Results/>} />
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
