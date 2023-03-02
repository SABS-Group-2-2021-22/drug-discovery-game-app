import React from "react";
import "./introduction.css";
import { Link } from "react-router-dom";
import pymolpic from "../../assets/pymolMMP12.png";
import { connect } from "react-redux";
import { initActions, selectorActions } from "../../actions";
import sabs from "../../assets/sabs-logo-tight.png";
import oxuni from "../../assets/oxlogo-sq-border.png";
import epsrc from "../../assets/EPSRC_logo.png";
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default (Introduction);
