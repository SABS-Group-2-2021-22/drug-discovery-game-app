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

  // componentWillMount() {
  //   this.props.fetchRGroup();
  //   this.props.selectRGroup(
  //     this.props.selected_r_groups["A"],
  //     this.props.selected_r_groups["B"],
  //     "800,800"
  //   );
  // }

  render() {
    return (
      <div className="wrapper">
        <div className="introduction">
          <div className="introductiontitle">What are we designing our drug for? </div>
          <div className="pic-and-text">
            <div className="text-and-button">
              <div className="text">
                <p>Matrix metalloproteinase 12 (MMP-12) is an enzyme implicated in emphysema and asthma. It has been identified as a possible drug target.
                  {"\n"}  {"\n"}  MMP-12 is made by immune cells in the lungs, and it is thought that it can cause damage and inflammation in the lungs.
                  {"\n"}  {"\n"} You are going to try to design a drug which stops MMP-12 from acting in the lungs.
                </p>
              </div>
              <div className="control-panel">
                <Link to="/builder">
                  <button>Next</button>
                </Link>
              </div>
            </div>
            <div className="picture">
              {" "}
              <img src={pymolpic} />{" "}
              <div className="text">MMP-12</div>
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

// function mapStateToProps(state) {
//   return {
//     loggedIn: state.login.login,
//     r_groups: state.init.r_groups,
//     selected_r_groups: state.selector.selected_r_groups,
//   };
// }

// const actionCreators = {
//   fetchRGroup: initActions.fetchRGroup,
//   selectRGroup: selectorActions.selectRGroup,
// };

// export default connect(mapStateToProps, actionCreators)(Introduction);
export default (Introduction);
