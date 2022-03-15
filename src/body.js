import {
    Home,
    Builder,
    Assay,
    Analysis,
    Results,
    SketcherAppRedux,
    SketcherAssayRedux,
    SketcherAnalysisRedux,
    SketcherResultsRedux,
  } from "./components/body";


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/app" element={(this.props.gamemode === 'builder') ? <Builder />: <SketcherAppRedux/>} />
            <Route path="/assay" element={(this.props.gamemode === 'builder') ?< Assay updateTimeAndMoneyCallback={this.updateTimeAndMoney}/>: <SketcherAssayRedux/>}  />
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