import React from "react";
import "./introduction.css";
import { Link } from "react-router-dom";
import pymolpic from "../../assets/pymolMMP12.png";
import { connect } from "react-redux";
import { initActions, selectorActions } from "../../actions";
import { LogoBanner } from "../body";
import IntroText from "./introtext";

class Introduction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0    }
  }


  onNext = () => {
    this.setState({count: this.state.count + 1})
  }

  onBack = () => {
    this.setState({count: this.state.count - 1})

  }
  
  componentWillMount() {
    this.props.num < 100 && this.props.fetchRGroup(this.props.countRGroup,"300,300");
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
                
              <IntroText id={this.state.count} />
              </div>
              <div className="control-panel">
              
                {this.state.count < 2 &&
                  <div>
                  <button className='next-button' onClick={this.onNext}>Next</button>
                  <Link to="/loadingpage">
                  <button>Skip</button>
                </Link>
                </div>
                }
                {this.state.count > 0 &&
                  <div>
                  <button className='back-button' onClick={this.onBack}>Back</button>
                </div>
                }
                {this.state.count === 2 &&
                  <Link to="/loadingpage">
                            <button className='start-button'>Start game</button>
                </Link>}

              </div>
            </div>
            <div className="picture">
              {" "}
              <img src={pymolpic} />{" "}
              <div className="text">MMP-12</div>
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
