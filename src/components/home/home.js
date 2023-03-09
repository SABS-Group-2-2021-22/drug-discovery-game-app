import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import pymolpic from "../../assets/pymolMMP12.png";
import { connect } from "react-redux";
import { initActions, selectorActions, gameActions } from "../../actions";
import { LogoBanner } from  '../body';


class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  // fetches the r groups from the BE and selects the first r groups at each position
  // ... for rapid rendering of the builder and sketcher pages
  componentWillMount() {
    this.props.num == 0 && this.props.fetchRGroup(this.props.countRGroup,"300,300");
    this.props.selectRGroup(
      this.props.selected_r_groups["A"],
      this.props.selected_r_groups["B"],
      "500,500"
    );
    this.props.fetchHelp();
  }

  setBuilderMode = () => {
    console.log("Builder mode set");
    this.props.setGamemode("builder");
  };

  setSketcherMode = () => {
    console.log("Sketcher mode set");
    this.props.setGamemode("sketcher");
  };

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
              {this.props.loggedIn ? (
                <div className="control-panel">
                  <div className="beginner-button">
                    <Link to="/introduction">
                      <button onClick={this.setBuilderMode}>Beginner</button>
                    </Link>
                  </div>
                  <div className="advanced-button">
                    <Link to="/introduction">
                      <button onClick={this.setSketcherMode}>Advanced</button>
                    </Link>
                  </div>
                </div>
                ) : (
                  <div className="control-panel">
                    <div className="beginner-button">
                      <Link to="/login">
                        <button onClick={this.setBuilderMode}>Start</button>
                      </Link>
                    </div>
                    {/* <div className="advanced-button-wrapper">
                      <div className="advanced-button">
                        <Link to="/login">
                          <button onClick={this.setSketcherMode}>Advanced</button>
                        </Link>
                      </div>
                    </div> */}
                  </div>
                )}
            </div>
          </div>
          <LogoBanner/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.login.login,
    r_groups: state.init.r_groups,
    num: state.init.num,
    selected_r_groups: state.selector.selected_r_groups,
  };
}

const actionCreators = {
  fetchHelp: initActions.fetchHelp,
  fetchRGroup: initActions.fetchRGroup,
  countRGroup: initActions.countRGroup,
  selectRGroup: selectorActions.selectRGroup,
  setGamemode: gameActions.setGamemodeAction,
};

export default connect(mapStateToProps, actionCreators)(Home);
