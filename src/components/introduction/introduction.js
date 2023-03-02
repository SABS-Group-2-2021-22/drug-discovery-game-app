import React from "react";
import "./introduction.css";
import { Link } from "react-router-dom";
import pymolpic from "../../assets/pymolMMP12.png";
import { connect } from "react-redux";
import { initActions, selectorActions } from "../../actions";
import sabs from "../../assets/sabs-logo-tight.png";
import oxuni from "../../assets/oxlogo-sq-border.png";
import epsrc from "../../assets/EPSRC_logo.png";

class Introduction extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    this.props.num < 100 && this.props.fetchRGroup(this.props.countRGroup);
    this.props.selectRGroup(
      this.props.selected_r_groups["A"],
      this.props.selected_r_groups["B"],
      "500,500"
    );
    this.props.fetchHelp();
  }

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
                  {"\n"}  {"\n"} You are going to try to design a compound with desired properties that inhibits MMP-12 in the body (including the lungs).
                </p>
              </div>
              <div className="control-panel">
                <Link to="/introduction2">
                  <button>Next</button>
                </Link>
                <Link to="/loadingpage">
                  <button>Skip Introduction</button>
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
            {""}
            {/*actually no longer conatins the start button */}
            <div className="logos-area">
              <div className="logo">
                {""} 
                <img src={sabs} height="120px" />{""}
                <div class="logo-text">
                  <span>EPSRC SABS R³ CDT: Sustainable Approaches to Biomedical Science Responsible & Reproducible Research</span>
              </div>
              </div>
              
              <div className="logo">
                {" "}
                <img src={epsrc} height="100px" />{" "}
              </div>
              <div className="logo">
                {" "}
                <img src={oxuni} height="10px" />{""}
                <div class="logo-text">
                  <span>University of Oxford</span>
              </div>
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
    num: state.init.num,
    selected_r_groups: state.selector.selected_r_groups,
  };
}

const actionCreators = {
  fetchHelp: initActions.fetchHelp,
  fetchRGroup: initActions.fetchRGroup,
  countRGroup: initActions.countRGroup,
  selectRGroup: selectorActions.selectRGroup,
};

export default connect(mapStateToProps, actionCreators)(Introduction);
