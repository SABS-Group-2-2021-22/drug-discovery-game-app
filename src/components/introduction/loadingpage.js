import React from "react";
import "./introduction.css";
import { Link } from "react-router-dom";
import pymolpic from "../../assets/pymolMMP12.png";
import { connect } from "react-redux";
import { initActions, selectorActions } from "../../actions";
import {ProgressBar} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import sabs from "../../assets/sabs-logo-tight.png";
import oxuni from "../../assets/oxlogo-sq-border.png";
import epsrc from "../../assets/EPSRC_logo.png";

class Loadingpage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrapper">
        {(this.props.num == 100)? (
                <div className="loadingpage">       
                    
                <Link to="/build">
                    <button className="loadingbutton">Let's Start!</button>
                </Link> 
                </div>
                ):
                (<div className="loadingpage">  
                <p>Loading...</p>
                        <div style={{ display: 'block',
                  width: 400, padding: 10}}>
                <ProgressBar animated variant="dark" now={this.props.num} label={`${this.props.num}%`} />
                </div> 
                </div>)
        }
      </div>
    );
  }
}
function mapStateToProps(state) {
    return {
      rgfetched: state.init.rgfetched,
      helpfetched: state.init.helpfetched,
      num: state.init.num,
      all_r_groups: state.init.all_r_groups
    };
  }

const actionCreators = {
    countRGroup: initActions.countRGroup,
  };
  
export default connect(mapStateToProps, actionCreators)(Loadingpage);
