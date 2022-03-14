import React from "react";
import "./introduction.css";
import { Link } from "react-router-dom";
import pymolpic from "../../assets/pymolMMP12.png";
import { connect } from "react-redux";
import { initActions, selectorActions } from "../../actions";
import sabs from "../../assets/sabs-logo-tight.png";
import oxuni from "../../assets/oxlogo-sq-border.png";
import roche from "../../assets/Roche.png";
import epsrc from "../../assets/EPSRC_logo.png";

class Introduction extends React.Component {
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

  render() {
    return (
      <div className="wrapper">
        <div className="introduction">
          <div className="introductiontitle">Welcome to the Drug Discovery Game </div>
          <div className="pic-and-text">
            <div className="picture">
              {" "}
              <img src={pymolpic} />{" "}
            </div>
            <div className="text-and-button">
              <div className="text">
                Hello
              </div>
              <div className="control-panel">
                {this.props.loggedIn ? (
                  <Link to="/builder">
                    <button>Start</button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <button>Start</button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="button-and-logo-area">
            {" "}
            {/*actually no longer conatins the start button */}
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
};

export default connect(mapStateToProps, actionCreators)(Introduction);
