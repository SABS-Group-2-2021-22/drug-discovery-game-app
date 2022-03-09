import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import pymolpic from "./pymolMMP12.png";
import { connect } from 'react-redux'
import { fetchRGroup, selectRGroup, setGamemodeAction } from "../actions";


class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(fetchRGroup());
    this.props.dispatch(
      selectRGroup(
        this.props.selected_r_groups["A"],
        this.props.selected_r_groups["B"],
        "800,800"
      )
    );
  }

  setBuilderMode = () => {
    this.props.dispatch(setGamemodeAction('builder'))
  }

  setSketcherMode = () => {
    this.props.dispatch(setGamemodeAction('sketcher'))
  }

  render() {
    return (
      <div className="wrapper">
        <div className="home">
          <div className="hometitle">Welcome to the Drug Discovery Game </div>
          <div className="pic-and-text">
            <div className="picture">
              {" "}
              <img src={pymolpic} />{" "}
            </div>
            <div className="text">
              MMP-12 is an 18 kDa, monomeric enzyme implicated in emphysema and
              asthma, and has been identified as a target with therapeutic
              potential. Your job is to design a potent inhibitor of MMP12 with
              good lipophilicity, medium to high permeability, and good
              metabolic stability. You have 30 weeks and £100,000 to design,
              assay, and screen your molecules. At the end you will have to pick
              a final molecule to take forward.
            </div>
          </div>
          <div className="button-area">
            <div className="control-panel">
            {/* <Link to="/app"> */}
              <button onClick={this.setBuilderMode}>Beginner</button>
              {/* </Link> */}
              {/* <Link to="/app"> */}
              <button onClick={this.setSketcherMode}>Advanced</button>
              {/* </Link> */}
              <Link to="/app">
              <button>Start</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    r_groups: state.r_groups,
    selected_r_groups: state.selected_r_groups
  };
}

export default connect(mapStateToProps)(Home);
