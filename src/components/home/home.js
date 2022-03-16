import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import pymolpic from "../../assets/pymolMMP12.png";
import { connect } from "react-redux";
import { initActions, selectorActions, gameActions  } from "../../actions";
import sabs from "../../assets/sabs-logo-tight.png";
import oxuni from "../../assets/oxlogo-sq-border.png";
import roche from "../../assets/Roche.png";
import epsrc from "../../assets/EPSRC_logo.png";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchRGroup();
    this.props.selectRGroup(
      this.props.selected_r_groups["A"],
      this.props.selected_r_groups["B"],
      "800,800"
    );
  }

  setBuilderMode = () => {
    console.log('Builder mode set')
    this.props.setGamemode('builder')

  }

  setSketcherMode = () => {
    console.log('Sketcher mode set')
    this.props.setGamemode('sketcher')
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
            <div className="text-and-button">
              <div className="text">
                MMP-12 is an 18 kDa, monomeric enzyme implicated in emphysema
                and asthma, and has been identified as a target with therapeutic
                potential. Your job is to design a potent inhibitor of MMP12
                with good lipophilicity, medium to high permeability, and good
                metabolic stability. You have 30 weeks and £100,000 to design,
                assay, and screen your molecules. At the end you will have to
                pick a final molecule to take forward.
              </div>
              <div className="control-panel">
                {this.props.loggedIn ?
                   (
                     <div>
                    <Link to="/build">
                      <button onClick={this.setBuilderMode} >Beginner</button>
                      </Link>
                      <Link to="/build">
                      <button onClick={this.setSketcherMode} >Advanced</button>
                    </Link>
                    </div>
                  ) : (
                    <div>
                    <Link to="/login">
                      <button onClick={this.setBuilderMode}>Beginner</button>
                      </Link>
                      <Link to="/login">
                      <button onClick={this.setSketcherMode}>Advanced</button>
                    </Link>
                    </div>
                  )}
                  
              </div>
            </div>
          </div>

          <div className="button-and-logo-area">
            {" "}
            {/*actually no longer contains the start button */}
            <div className="logos-area">
              <div className="logo">
                {" "}
                <img src={sabs} height="120px" />{" "}
              </div>
              <div className="logo">
                {" "}
                <img src={epsrc} height="100px" />{" "}
              </div>
              <div className="logo">
                {" "}
                <img src={oxuni} height="100px" />{" "}
              </div>
              <div className="logo">
                {" "}
                <img src={roche} height="100px" />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.login.login,
    r_groups: state.init.r_groups,
    selected_r_groups: state.selector.selected_r_groups,
  };
}

const actionCreators = {
  fetchRGroup: initActions.fetchRGroup,
  selectRGroup: selectorActions.selectRGroup,
  setGamemode: gameActions.setGamemodeAction
};

export default connect(mapStateToProps, actionCreators)(Home);
