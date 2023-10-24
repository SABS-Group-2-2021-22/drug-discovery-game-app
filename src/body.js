import {
    Home,
    Progressloader,
    Builder,
    Docking,
    Assay,
    Analysis,
    Results,
    SketcherAppRedux,
    SketcherAssayRedux,
    SketcherAnalysisRedux,
    SketcherResultsRedux,
    Loadingpage
  } from "./components/body";


import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import React from 'react';
import ReactDOM from 'react-dom';

  class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          money: undefined,
          time: undefined,
          };
    }

  render() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/progressloader" element={<Progressloader />} />
            <Route path="/loadingpage" element={<Loadingpage />} />
            <Route path="/app" element={(this.props.gamemode === 'builder') ? <Builder />: <SketcherAppRedux/>} />
            <Route path="/docking" element={<Docking />} />
            <Route path="/assay" element={(this.props.gamemode === 'builder') ?< Assay />: <SketcherAssayRedux/>}  />
            <Route path="/analysis" element={(this.props.gamemode === 'builder') ?< Analysis/>: <SketcherAnalysisRedux/>}  />
            <Route path="/results" element={(this.props.gamemode === 'builder') ?< Results/>: <SketcherResultsRedux/>} />
        </Routes>
    )
  } 
}


function mapStateToProps(state) {
    return {
        gamemode: state.sketcher.gamemode
    };
  }

export default connect(mapStateToProps) (Body)
