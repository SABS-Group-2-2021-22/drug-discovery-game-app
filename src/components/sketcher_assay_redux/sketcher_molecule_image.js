import React from "react";
import "../assay.css";
import { connect } from "react-redux";
import { selectMolecule } from "../../actions";

class SketcherMoleculeImage extends React.Component {
  constructor(props) {
    super(props);
  }

  selectMolecule = () => {
    this.props.dispatch(selectMolecule(this.props.mol_id));
  };

  render() {
    return (
      <div class="molecule">
        <img
          src={this.props.saved_mols[this.props.mol_id].data.img_html}
          alt="Drug"
          onClick={this.selectMolecule}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.saved_sketched_mols,
  };
}

export default connect(mapStateToProps)(SketcherMoleculeImage);
