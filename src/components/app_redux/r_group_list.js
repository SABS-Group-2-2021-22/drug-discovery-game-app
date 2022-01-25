import React from "react";
import "../app.css";
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
      <div className="r-group_list">
        {Array.from({ length: 50 }, (_, i) => (
          <RGroupWidget
            r_group_id={this.createRGroupID(this.props.r_group_pos, i+1)}
          />
        ))}
      </div>
    );
  }
}

export default RGroupList

