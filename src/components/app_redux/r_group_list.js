import React from "react";
import "../app.css";
import RGroupWidget from "./r_group_widget.js";
import { connect } from "react-redux";

class RGroupList extends React.Component {
  constructor(props) {
    super(props);
  }
  

  createRGroupID = (pos, nr) => {
    if (nr < 10) {
      return String(pos + "0" + nr);
    } else {
      return String(pos + nr);
    }
  };

  // createList = (this.props.filter_selection) => {
  //   switch this.props.filter_selection:
  //   case MW: 
  //   this.setState(list, this.MWList)
  //   case TPSA: 
  //   this.setState(list, this.TPSAList)
  //   }

  //   MWList = () => {
  //   var list = []
  //   list_of_MW = Array.from({ length: 50}, (_, i) => (
  //   this.props.r_groups[this.createRGroupID(this.props.r_group_pos, i + 1))].data.stats.MW
  //   // ORDER LIST OF MW
  //   ordered_list_of_MW = reorder(listof_MW)


  //   return ordered_list
  //   }

  createList = () => {
    var list = []
    switch (this.props.filter_selection) {
      case "MW":
        this.setState(list, this.MWList)
      case "logP":
        this.setState(list, this.logPList)
      case "TPSA":
        this.setState(list, this.TPSAList)
      case "HA":
        this.setState(list, this.HAList)
      case "h_acc":
        this.setState(list, this.h_accList)
      case "h_don":
        this.setState(list, this.h_donList)
      case "rings":
        this.setState(list, this.ringsList)
      default:
        return null
  }
};

// SortNumbers = (a, b) => {
//   return a - b
// }

MWList = () => {
  // var list = []
  // var list_of_MW = this.createList()
  var list_of_MW = Array.from({ length: 50 }, (_, i) => (
    this.props.r_groups[this.createRGroupID(this.props.r_group_pos, i + 1)].data.stats.MW))
    // ORDER LIST OF MW
  var MWList =  list_of_MW.sort


    return MWList
}



render() {
  return (
    <div className="r-group-list">
      {/* <div className="Selection"> */}
      <select onChange = {(e) => this.createList(e.target.value)}>
        <option value="MW">MW</option>
        <option value="logP">logP</option>
        <option value="TPSA">TPSA</option>
        <option value="HA">HA</option>
        <option value="h_acc">h_acc</option>
        <option value="h_don">h_don</option>
        <option value="rings">rings</option>
      </select>
      {/* </div> */}
      {Array.from({ length: 50 }, (_, i) => (
        <RGroupWidget
          key={this.createRGroupID(this.props.r_group_pos, i + 1)}
          r_group_id={this.createRGroupID(this.props.r_group_pos, i + 1)}
          size="800,800"
        />
      ))}
    </div>
  );
}
}



function mapStateToProps(state) {
  return {
  r_groups: state.all_r_groups,
  };
  }
  export default connect(mapStateToProps)(RGroupList);

// export default RGroupList

