import React from "react";
import "./home.css";
import { LogoBanner } from  '../body';
import { connect } from "react-redux";

import { userActions } from "../../actions";


class Progressloader extends React.Component {
  completeNewLogin = () => {
    this.props.new_login(this.props.username)
  }

  completeLoadedLogin = () => {
    this.props.loaded_login(this.props.username)
  }

  render(){
      return (
        <div className="wrapper">
        <div className="home">
          <div className="hometitle">Welcome back to the game </div>
          <div className="pic-and-text">

            <div className="text-and-button">
              <h5>
                Would you like to pick up from where you left off (the time and money you had left and the molecules you had designed)
                the last time or start a new game?
              </h5>
              {
                  <div className="control-panel">
                    <div className="beginner-button">
                        <button onClick={this.completeNewLogin}>Start a new game</button>
                    </div>
                      <div className="beginner-button">
                          <button onClick={this.completeLoadedLogin}>Continue previous game</button>
                      </div>
                  </div>
                }
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
    username: state.login.user.username,
  };
}

const actionCreators = {
  new_login: userActions.new_login,
  loaded_login: userActions.loaded_login
};

export default connect(mapStateToProps,actionCreators)(Progressloader);