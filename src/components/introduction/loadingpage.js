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
  
/*  
mount the function  before and after render, once the rgroup in store is 100, the lets go button appear
  */
  // componentMount() {
  //   console.log('willmot')
  //   this.props.countRGroup(Object.keys(this.props.all_r_groups).length);
  //   console.log(this.props.num)
  // }
  // componentDidUpdate() {
  //   if(this.state.gnum != this.props.num && this.props.num < 100){
  //     console.log(this.state.gnum,this.props.num)
  //     this.props.countRGroup(Object.keys(this.props.all_r_groups).length);
  //     console.log('didupd');
  //     // console.log(this.props.num);
  //     this.setState({gnum:this.props.num+1})
  //   }
  //   else{console.log('equal')}
  //   }
  // componentDidUpdate() {
  //     this.props.countRGroup(Object.keys(this.props.all_r_groups).length);
  //     console.log('didupd');
  //     // console.log(this.props.num);
  // }



  render() {
    return (
      <div className="wrapper">
        {(this.props.num == 100)? (
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
      num: state.init.num,
      all_r_groups: state.init.all_r_groups
    };
  }

const actionCreators = {
    countRGroup: initActions.countRGroup,
  };
  
export default connect(mapStateToProps, actionCreators)(Loadingpage);
