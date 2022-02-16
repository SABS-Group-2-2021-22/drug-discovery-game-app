import React from "react";
import "../app.css";
import { connect } from "react-redux"

class MoleculeImage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="molecule">
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
    selected_r_groups: state.selected_r_groups,
  };
}

export default connect(mapStateToProps)(MoleculeImage);
