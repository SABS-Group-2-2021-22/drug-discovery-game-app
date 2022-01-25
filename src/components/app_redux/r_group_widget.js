import React from "react";
import "../app.css"
import { connect } from "react-redux"

class RGroupWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="r-group-container">
        <div className="r-group-card">
          <img
            className="r-group-img"
            src={this.props.r_groups[this.props.r_group_id].data.img_html}
            alt="R Group"
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    r_groups: state.r_groups,
  };
}

export default connect(mapStateToProps)(RGroupWidget);


