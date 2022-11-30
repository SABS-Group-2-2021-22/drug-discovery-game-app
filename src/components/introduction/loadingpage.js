import React from "react";
import "./loadingpage.css";
import { Link } from "react-router-dom";
import pymolpic from "../../assets/pymolMMP12.png";
import { connect } from "react-redux";
import { initActions, selectorActions } from "../../actions";
import sabs from "../../assets/sabs-logo-tight.png";
import oxuni from "../../assets/oxlogo-sq-border.png";
import epsrc from "../../assets/EPSRC_logo.png";

class Loadingpage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate () {
    this.props.countRGroup(Object.keys(this.props.all_r_groups).length);
  }
  
  render() {
    return (
      <div className="wrapper">
        {(this.props.rgfetched && this.props.helpfetched && this.props.countreached)? (
                <div className="loadingpage">       
                    
                <Link to="/build">
                    <button className="loadingbutton">Let's Start!</button>
                </Link> 

                </div>):(<div className="loadingpage"> <p>Loading....</p> </div>)
        }
      </div>
    );
  }
}
function mapStateToProps(state) {
    return {
      rgfetched: state.init.rgfetched,
      helpfetched: state.init.helpfetched,
      countreached: state.init.countreached,
      all_r_groups: state.init.all_r_groups
    };
  }

const actionCreators = {
    countRGroup: initActions.countRGroup,
  };
  
export default connect(mapStateToProps, actionCreators)(Loadingpage);
