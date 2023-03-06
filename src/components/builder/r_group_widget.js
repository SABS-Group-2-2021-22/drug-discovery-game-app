import React from "react";
import RGroupStats from "./r_group_stats.js";
import "./builder.css";
import { connect } from "react-redux";
import { selectorActions } from "../../actions";

class RGroupWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  // store the r group id and positions when selected
  selectRGroups = () => {
    if (this.props.r_group_id.charAt(0) === "A") {
      this.props.selectRGroup(
        this.props.r_group_id,
        this.props.selected_r_groups["B"],
        this.props.size
      );
    } else {
      this.props.selectRGroup(
        this.props.selected_r_groups["A"],
        this.props.r_group_id,
        this.props.size
      );
    }
  };

  render() {
    const selected_r_group_style = {
      borderWidth:  (this.props.selected_r_groups["A"] == this.props.r_group_id || this.props.selected_r_groups["B"] == this.props.r_group_id ? "8px" : "1px")
    };
    return (
      <div className="r-group-container">
        <div className="r-group-card" style={selected_r_group_style}>
          <img
            className="r-group-img"
            src={this.props.r_groups[[this.props.r_group_id]].data.img_html}
            alt="R Group"
            onClick={this.selectRGroups}
          />
          {this.props.r_group_id}
          <RGroupStats
            stats={this.props.r_groups[[this.props.r_group_id]].data.stats}
            func = {this.selectRGroups}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    r_groups: state.init.all_r_groups,
    selected_r_groups: state.selector.selected_r_groups,
  };
}

const actionCreators = {
  selectRGroup: selectorActions.selectRGroup,
};

export default connect(mapStateToProps, actionCreators)(RGroupWidget);
