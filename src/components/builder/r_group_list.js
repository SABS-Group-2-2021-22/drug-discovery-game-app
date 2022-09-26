import React from "react";
import "./builder.css";
import RGroupWidget from "./r_group_widget.js";

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

  render() {
    return (
      <div className="r-group-list">
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

export default RGroupList;
