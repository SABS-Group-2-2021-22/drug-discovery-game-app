import React from "react";
import "./introduction.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { initActions } from "../../actions";
import {ProgressBar} from 'react-bootstrap';


class Loadingpage extends React.Component {
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
