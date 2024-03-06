import React from 'react';
//import ReactDOM from 'react-dom';
import "./index.css";
//import { createStore, applyMiddleware, compose } from 'redux'
//import { Provider } from 'react-redux'
//import thunk from 'redux-thunk'
//import r_groups from './reducers'
//import Body from './body'
//import rootReducer from './reducers'
import { connect } from "react-redux";
//import { devToolsEnhancer } from 'redux-devtools-extension'

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import {
  Navigation,
  Home,
  Introduction,
  Loadingpage,
  Builder,
  Docking,
  Assay,
  Analysis,
  Results,
  Footer,
  LoginPage,
  PrivateRoute,
  PublicRoute,
  SketcherAppRedux,
} from "./components/body";


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
          <Route path="/" element={<Navigate to='/home' />} />
          <Route path="/home" element={<Home />} />

          <Route path="*" element={
            <PrivateRoute>
              <Routes>
                {/* <Route path="/progressloader" element={<Progressloader />} /> */}
                <Route path="/introduction" element={<Introduction />} />
                <Route path="/loadingpage" element={<Loadingpage />} />
                <Route path="/build" element={(this.props.gamemode === 'builder') ? <Builder /> : <SketcherAppRedux />} />
                <Route path="/docking" element={<Docking />} />
                <Route path="/assay" element={< Assay />} />
                <Route path="/analysis" element={< Analysis />} />
                <Route path="/results" element={< Results />} />
              </Routes>
            </PrivateRoute>
          }/>
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        </Routes>
        <Footer />
      </Router>
    )
  }
}

function mapStateToProps(state) {
  return {
    gamemode: state.game.gamemode,
  };
}

export default connect(mapStateToProps)(Index);
