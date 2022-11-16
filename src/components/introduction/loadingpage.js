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

  render() {
    return (
      <div className="wrapper">
        {this.props.allfetched ? (
                <div className="loadingpage">       
                    
                <Link to="/build">
                    <button className="loadingbutton">ALL drugs loaded! Let's start!</button>
                </Link> 

                </div>):(<div className="loadingpage"> <p>Please wait for drug loading, a button will appear!</p> </div>)
        }
      </div>
    );
  }
}
function mapStateToProps(state) {
    return {

      allfetched: state.init.allfetched
    };
  }

  
  export default connect(mapStateToProps)(Loadingpage);
