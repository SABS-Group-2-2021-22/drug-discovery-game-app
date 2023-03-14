import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import pymolpic from "../../assets/pymolMMP12.png";
import { connect } from "react-redux";
import { initActions, selectorActions, gameActions } from "../../actions";
import { LogoBanner } from  '../body';


class Progressloader extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
      return (
        <div className="wrapper">
        <div className="home">
          <div className="hometitle">Welcome back to the game </div>
          <div className="pic-and-text">

            <div className="text-and-button">
              <div className="text">
                Would you like to pick up from where you left off (the time and money you had left and the molecules you had designed)
                the last time or start a new game?
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
                      <Link to="/introduction">
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

export default connect(mapStateToProps, actionCreators)(Progressloader);

// export default (Progressloader);