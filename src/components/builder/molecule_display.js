import React from "react";
import "./builder.css";
import { connect } from "react-redux"

class MoleculeImage extends React.Component {
  render() {
    return (
      <div className="molecule">
        <img
          src={this.props.selected_r_groups.molecule.data.img_html}
          alt="Drug"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selected_r_groups: state.selector.selected_r_groups,
  };
}

export default connect(mapStateToProps)(MoleculeImage);
