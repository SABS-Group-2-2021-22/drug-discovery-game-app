import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import pymolpic from "../../assets/pymolMMP12.png";
import { connect } from "react-redux";
import { initActions, selectorActions, gameActions } from "../../actions";
import { LogoBanner } from  '../body';


class Progressloader extends React.Component {
  constructor(props) {
    super(props);
  }

  // fetches the r groups from the BE and selects the first r groups at each position
  // ... for rapid rendering of the builder and sketcher pages
//   componentWillMount() {
//     this.props.num == 0 && this.props.fetchRGroup(this.props.countRGroup,"300,300");
//     this.props.selectRGroup(
//       this.props.selected_r_groups["A"],
//       this.props.selected_r_groups["B"],
//       "500,500"
//     );
//     this.props.fetchHelp();
//   }

//   setBuilderMode = () => {
//     console.log("Builder mode set");
//     this.props.setGamemode("builder");
//   };

//   setSketcherMode = () => {
//     console.log("Sketcher mode set");
//     this.props.setGamemode("sketcher");
//   };

  render() {
    return (
    <h3> Hello this is the progress loader page</h3>);

// function mapStateToProps(state) {
//   return {
//     loggedIn: state.login.login,
//     r_groups: state.init.r_groups,
//     num: state.init.num,
//     selected_r_groups: state.selector.selected_r_groups,
//   };
}

// const actionCreators = {
//   fetchHelp: initActions.fetchHelp,
//   fetchRGroup: initActions.fetchRGroup,
//   countRGroup: initActions.countRGroup,
//   selectRGroup: selectorActions.selectRGroup,
//   setGamemode: gameActions.setGamemodeAction,
// };

// export default connect(mapStateToProps, actionCreators)(Progressloader);
